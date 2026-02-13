export const prerender = false;

import type { APIRoute } from 'astro';
import nodemailer from 'nodemailer';

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

    const transporter = nodemailer.createTransport({
      host: import.meta.env.SMTP_HOST,
      port: Number(import.meta.env.SMTP_PORT) || 587,
      secure: import.meta.env.SMTP_SECURE === 'true',
      auth: {
        user: import.meta.env.SMTP_USER,
        pass: import.meta.env.SMTP_PASS,
      },
    });

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

    await transporter.sendMail({
      from: import.meta.env.SMTP_FROM || '"Myči.CZ Web" <web@myci.cz>',
      to: import.meta.env.ORDER_EMAIL || 'info@myci.cz',
      replyTo: data.email,
      subject: `Objednávka: ${data.services.join(', ')} - ${data.companyName}`,
      html: htmlBody,
    });

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
