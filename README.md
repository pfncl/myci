# Myci.CZ -- Astro 5 + Svelte 5 (Cloudflare Workers)

Web profesionalnich mycich sluzeb firmy Alabastr Clean, s.r.o. Konverze z WordPress (Rexcoin theme + Visual Composer) na moderni Astro 5 se Svelte 5 komponentami (runes). Deployuje se na **Cloudflare Workers** s custom domenou `myci.cz`.

## Pozadavky

- Node.js 22+
- pnpm

## Instalace

```bash
pnpm install
```

## Vyvoj

```bash
pnpm dev
```

Dev server bezi na `http://localhost:4321`.

## Build

```bash
pnpm build
pnpm preview   # nahled produkniho buildu
```

Vystup se generuje do `dist/`. Staticke stranky jsou prerendrovane (vychozi chovani Astro 5), objednavkovy formular funguje pres **Astro Actions** (SSR na Cloudflare Workers).

## Deploy (Cloudflare Workers)

```bash
pnpm build && pnpm wrangler deploy
```

Konfigurace workeru je v `wrangler.jsonc`. Custom domena `myci.cz` je nastavena v sekci `routes`.

### Env promenne

Env promenne jsou definovane pomoci **`astro:env`** modulu (typove bezpecne schema v `astro.config.mjs`). Na produkci se nastavuji pres Cloudflare CLI:

```bash
pnpm wrangler secret put RESEND_API_KEY
pnpm wrangler secret put ORDER_EMAIL
```

| Promenna | Popis |
|---|---|
| `RESEND_API_KEY` | API klic z [resend.com](https://resend.com) pro odesilani emailu |
| `ORDER_EMAIL` | Cilova adresa pro objednavky (default: info@myci.cz) |

Pro lokalni vyvoj vytvorte `.env` soubor dle `.env.example`.

## Struktura projektu

```
src/
├── actions/
│   └── index.ts                # Astro Action -- odeslani objednavky (Resend batch API)
├── components/
│   ├── Header.astro            # Logo, objednavka tlacitko, telefony
│   ├── Footer.astro            # Paticka s logem a weather widgetem
│   ├── WeatherWidget.astro     # Widget pocasi (Elfsight)
│   ├── HeroSection.astro       # Hero banner + 5 krokovych karet
│   ├── ServicesSection.astro   # 4 sluzby s cenami
│   ├── ReferencesGrid.astro    # Grid 12 referencnich log
│   ├── Modal.svelte            # Znovupouzitelny modal (nativni <dialog>)
│   ├── StepCard.svelte         # Karta kroku s info popupem
│   ├── ServiceCard.svelte      # Karta sluzby s info popupem
│   ├── OrderForm.svelte        # Objednavkovy formular s validaci
│   ├── OrderFormModal.svelte   # Modal wrapper pro formular
│   ├── CookieConsent.svelte    # GDPR cookie banner
│   └── MobileMenu.svelte       # Hamburger menu pro mobily
├── data/
│   ├── popups.ts               # Texty 8 info popupu
│   ├── references.ts           # 12 referencnich log
│   ├── services.ts             # 4 sluzby (nazev, cena, popup ID)
│   └── steps.ts                # 5 kroku (nazev, popis, obrazek, popup ID)
├── layouts/
│   └── BaseLayout.astro        # HTML shell, SEO meta tagy (astro-seo), fonty
├── pages/
│   ├── index.astro             # Hlavni stranka
│   └── zasady-ochrany-osobnich-udaju.astro  # GDPR stranka
├── styles/
│   ├── fonts.css               # @font-face (Alabastr, SpartanMB, Fontello, Weather Icons)
│   └── global.css              # CSS custom properties, reset, zakladni styly
└── public/
    ├── fonts/                  # Lokalni fonty (woff, woff2)
    └── images/                 # Obrazky (loga, galerie, reference, ikony)
```

## Technologie

| Technologie | Pouziti |
|---|---|
| **Astro 5** | Framework, staticke prerendrovani + Astro Actions (SSR) |
| **Svelte 5** | Interaktivni komponenty (runes: `$state`, `$derived`, `$effect`, `$bindable`) |
| **Cloudflare Workers** | Hosting + SSR runtime |
| **Resend API** | Odesilani emailu (`batch.send` -- notifikace + potvrzeni zakaznikovi) |
| **astro:env** | Typove bezpecne env promenne se schema validaci |
| **astro-seo** | SEO meta tagy a OpenGraph |
| **CSS Custom Properties** | Design tokeny (barvy, typografie, rozestupy) |
| **Nativni `<dialog>`** | Modalni okna (nahrazuje jQuery Popup Maker) |

## Objednavkovy formular

Formular pouziva **Astro Actions** (`src/actions/index.ts`):

- Validace vstupu pres Zod schema (`astro:schema`)
- Honeypot anti-spam pole
- Odeslani dvou emailu najednou pres `resend.batch.send()`:
  1. **Notifikace** na `ORDER_EMAIL` s detaily objednavky
  2. **Potvrzeni** zakaznikovi na jeho email
- Odesilatel: `formular@myci.cz` (domena overena v Resend)

## Hydracni strategie

Svelte komponenty pouzivaji ruzne hydracni direktivy podle priority:

- `client:idle` -- OrderFormModal, MobileMenu, CookieConsent (hydrace po nacteni stranky)
- `client:visible` -- StepCard, ServiceCard (hydrace pri scrollu)

## Komunikace Astro <-> Svelte

Header (Astro) nemuze primo otevrit modal (Svelte). Reseni pres event delegaci:

1. Header: `<button data-open-modal="order-form">`
2. OrderFormModal: `document.addEventListener('click', ...)` filtruje `[data-open-modal]`

## Porovnani s WordPress originalem

| Metrika | WordPress | Astro 5 |
|---|---|---|
| CSS | ~700 KB | 7 KB |
| JS soubory | 1400+ | 17 chunku (~62 KB) |
| Build cas | -- | ~2s |
| Zavislosti | jQuery, Visual Composer, Popup Maker, Gravity Forms, Complianz, TRX Addons | Astro, Svelte |

## Prikazy

| Prikaz | Akce |
|---|---|
| `pnpm install` | Instalace zavislosti |
| `pnpm dev` | Spusti dev server na `localhost:4321` |
| `pnpm build` | Produkni build do `./dist/` |
| `pnpm preview` | Nahled produkniho buildu |
| `pnpm wrangler deploy` | Deploy na Cloudflare Workers |
