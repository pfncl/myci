# Myci.CZ -- Astro 5 + Svelte 5

Web profesionalnich mycich sluzeb firmy Alabastr Clean, s.r.o. Konverze z WordPress (Rexcoin theme + Visual Composer) na moderni Astro 5 se Svelte 5 komponentami (runes).

## Pozadavky

- Node.js 18+
- npm

## Instalace

```bash
npm install
```

## Vyvoj

```bash
npm run dev
```

Dev server bezi na `http://localhost:4321`.

## Build

```bash
npm run build
npm run preview   # nahled produkniho buildu
```

Vystup se generuje do `dist/`. Staticke stranky jsou prerendrovane, API endpoint (`/api/order`) bezi na serveru (Node adapter).

## Nasazeni

Projekt pouziva `@astrojs/node` adapter v standalone rezimu. Po buildu:

```bash
node dist/server/entry.mjs
```

Pro odesilani emailu z objednavkoveho formulare vytvorte `.env` soubor podle `.env.example`:

```
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=user@example.com
SMTP_PASS=password
SMTP_FROM="Myci.CZ Web" <web@myci.cz>
ORDER_EMAIL=info@myci.cz
```

## Struktura projektu

```
src/
├── components/
│   ├── Header.astro            # Logo, objednavka tlacitko, telefony
│   ├── Footer.astro            # Paticka s logem a weather widgetem
│   ├── WeatherWidget.astro     # Staticka predpoved pocasi (dekorativni)
│   ├── HeroSection.astro       # Hero banner + 5 krokovych karet
│   ├── ServicesSection.astro   # 4 sluzby s cenami
│   ├── ReferencesGrid.astro    # Grid 12 referencnich log
│   ├── Modal.svelte            # Znovupouzitelny modal (nativni <dialog>)
│   ├── StepCard.svelte         # Karta kroku s info popupem
│   ├── ServiceCard.svelte      # Karta sluzby s info popupem
│   ├── GalleryModal.svelte     # Fotogalerie (9 fotek, 3-sloupcovy grid)
│   ├── OrderForm.svelte        # Objednavkovy formular s validaci
│   ├── OrderFormModal.svelte   # Modal wrapper pro formular
│   ├── CookieConsent.svelte    # GDPR cookie banner
│   └── MobileMenu.svelte       # Hamburger menu pro mobily
├── data/
│   ├── gallery.ts              # 9 fotek galerie
│   ├── popups.ts               # Texty 8 info popupu
│   ├── references.ts           # 12 referencnich log
│   ├── services.ts             # 4 sluzby (nazev, cena, popup ID)
│   └── steps.ts                # 5 kroku (nazev, popis, obrazek, popup ID)
├── layouts/
│   └── BaseLayout.astro        # HTML shell, meta tagy, fonty
├── pages/
│   ├── api/
│   │   └── order.ts            # SSR endpoint - odeslani emailu (Nodemailer)
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
| **Astro 5** | Framework, staticke prerendrovani + SSR endpoint |
| **Svelte 5** | Interaktivni komponenty (runes: `$state`, `$derived`, `$effect`, `$bindable`) |
| **Node adapter** | Server-side rendering pro API endpoint |
| **Nodemailer** | Odesilani objednavkovych emailu pres SMTP |
| **CSS Custom Properties** | Design tokeny (barvy, typografie, rozestupy) |
| **Nativni `<dialog>`** | Modalni okna (nahrazuje jQuery Popup Maker) |

## Hydracni strategie

Svelte komponenty pouzivaji ruzne hydracni direktivy podle priority:

- `client:load` -- OrderFormModal (musi byt interaktivni ihned)
- `client:visible` -- GalleryModal, StepCard, ServiceCard (hydrace pri scrollu)
- `client:idle` -- CookieConsent (muze pockat)

## Komunikace Astro <-> Svelte

Header (Astro) nemuze primo otevrit modal (Svelte). Reseni pres event delegaci:

1. Header: `<button data-open-modal="order-form">`
2. OrderFormModal: `document.addEventListener('click', ...)` filtruje `[data-open-modal]`

Stejny pattern pouziva GalleryModal.

## Porovnani s WordPress originalem

| Metrika | WordPress | Astro 5 |
|---|---|---|
| CSS | ~700 KB | 7 KB |
| JS soubory | 1400+ | 17 chunku (~62 KB) |
| Build cas | -- | 1.88s |
| Zavislosti | jQuery, Visual Composer, Popup Maker, Gravity Forms, Complianz, TRX Addons | Astro, Svelte, Nodemailer |

## Prikazy

| Prikaz | Akce |
|---|---|
| `npm install` | Instalace zavislosti |
| `npm run dev` | Spusti dev server na `localhost:4321` |
| `npm run build` | Produkni build do `./dist/` |
| `npm run preview` | Nahled produkniho buildu |
