export const prerender = false;

import type { APIRoute } from 'astro';

interface OrderPayload {
  services: string[];
  companyName: string;
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    zip: string;
  };
  serviceDate: string;
  notes: string;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const data: OrderPayload = await request.json();

    // Server-side validation
    if (!data.services?.length || !data.companyName?.trim() || !data.email?.trim() || !data.phone?.trim()) {
      return new Response(JSON.stringify({ error: 'Chybí povinné údaje.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      return new Response(JSON.stringify({ error: 'Neplatný e-mail.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const htmlBody = `
      <h2>Nová objednávka z webu Myči.CZ</h2>
      <table style="border-collapse:collapse;width:100%;max-width:600px;">
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Služby</td>
            <td style="padding:8px;border:1px solid #ddd;">${data.services.map(escapeHtml).join(', ')}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Společnost/Kontakt</td>
            <td style="padding:8px;border:1px solid #ddd;">${escapeHtml(data.companyName)}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">E-mail</td>
            <td style="padding:8px;border:1px solid #ddd;">${escapeHtml(data.email)}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Telefon</td>
            <td style="padding:8px;border:1px solid #ddd;">${escapeHtml(data.phone)}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Adresa</td>
            <td style="padding:8px;border:1px solid #ddd;">${escapeHtml(data.address?.street || '')}, ${escapeHtml(data.address?.city || '')} ${escapeHtml(data.address?.zip || '')}</td></tr>
        ${data.serviceDate ? `<tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Datum</td>
            <td style="padding:8px;border:1px solid #ddd;">${escapeHtml(data.serviceDate)}</td></tr>` : ''}
        ${data.notes ? `<tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Poznámky</td>
            <td style="padding:8px;border:1px solid #ddd;">${escapeHtml(data.notes)}</td></tr>` : ''}
      </table>
    `;

    // Send via Resend API (https://resend.com)
    // Set RESEND_API_KEY and ORDER_EMAIL as env vars in wrangler / CF dashboard
    const apiKey = import.meta.env.RESEND_API_KEY;
    const orderEmail = import.meta.env.ORDER_EMAIL || 'info@myci.cz';

    if (!apiKey) {
      console.error('RESEND_API_KEY is not configured');
      return new Response(JSON.stringify({ error: 'Server není nakonfigurován pro odesílání emailů.' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Myči.CZ Web <web@myci.cz>',
        to: [orderEmail],
        reply_to: data.email,
        subject: `Objednávka: ${data.services.join(', ')} - ${data.companyName}`,
        html: htmlBody,
      }),
    });

    if (!res.ok) {
      const errBody = await res.text();
      console.error('Resend API error:', res.status, errBody);
      return new Response(JSON.stringify({ error: 'Nepodařilo se odeslat objednávku.' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Order form error:', error);
    return new Response(JSON.stringify({ error: 'Interní chyba serveru.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
