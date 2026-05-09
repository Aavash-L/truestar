# True Star Contracting LLC — Website

Next.js 15 (App Router) website for True Star Contracting LLC, a licensed demolition, asbestos removal, and mold remediation contractor in North Arlington, NJ.

## Tech Stack

- **Next.js 16** (App Router, TypeScript, Server Components)
- **Tailwind CSS v4** with custom brand tokens
- **Resend** for contact form email delivery
- **react-hook-form + zod** for form validation
- **Lucide React** for icons
- **next-sitemap** for sitemap.xml generation
- **pnpm** for package management

## Getting Started

### 1. Install dependencies

```bash
pnpm install
```

### 2. Set up environment variables

```bash
cp .env.local.example .env.local
```

Edit `.env.local` with your values:

```env
RESEND_API_KEY=re_xxxxxxxx           # from resend.com
CONTACT_FROM_EMAIL=noreply@truestarcontracting.com
CONTACT_TO_EMAIL=info@truestarcontracting.com
```

**Note:** The `CONTACT_FROM_EMAIL` domain must be verified in Resend. Domain verification typically takes <5 minutes.

### 3. Add client assets

Place real photos in `/public/images/`:

```
public/images/
  hero/              → hero.jpg (full-bleed hero photo)
  logo/              → logo.png or logo.svg
  gallery/           → job photos (filename format: service-town-NNN.jpg)
  services/
    demolition/      → hero.jpg + gallery-1.jpg, gallery-2.jpg...
    asbestos-removal/
    mold-remediation/
```

See `TODO.md` for the full list of missing assets.

### 4. Run development server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

### 5. Build for production

```bash
pnpm build
```

This builds Next.js and generates `sitemap.xml` + `robots.txt` automatically via `next-sitemap`.

---

## Site Architecture

```
/                          Homepage
/about                     About the company
/services/[service]        3 service detail pages
/service-areas             60-town hub page
/service-areas/[town]      60 town landing pages
/service-areas/[town]/[service]  180 town×service pages
/gallery                   Project gallery with lightbox
/reviews                   All 42 Google reviews
/contact                   Contact page with map + form
/estimate                  Dedicated estimate form
/admin/seo-checklist       Private SEO dashboard (noindex)
```

**Total pages generated: 255** (all statically rendered at build time)

---

## How to Update Content

### Add a new review

Edit `/src/data/reviews.ts` and add a new object to the `reviews` array:

```ts
{
  id: "r43",
  author: "First L.",
  rating: 5,
  date: "2025-01-15",   // YYYY-MM-DD
  body: "Excellent work...",
  source: "google",
}
```

Run `pnpm build` to regenerate.

### Add a new town

Edit `/src/data/towns.ts` and add a new `Town` object to the `towns` array. Required fields:

```ts
{
  slug: "your-town",           // URL-safe, kebab-case
  name: "Your Town",
  county: "Bergen",            // Bergen | Hudson | Essex | Passaic | Middlesex | Morris | Union
  tier: 1,                     // 1 | 2 | 3
  lat: 40.XXXX,
  lng: -74.XXXX,
  zipCodes: ["07XXX"],
  neighborhoods: ["Neighborhood 1"],
  landmarks: ["A real landmark"],
  nearbyTowns: ["north-arlington", "kearny"],  // slugs of neighbors
  localContext: "One or two sentences about the town's building stock.",
}
```

The town will automatically get a landing page at `/service-areas/your-town` and 3 service pages at `/service-areas/your-town/[service]`. Also add it to the sitemap config in `next-sitemap.config.js` tier lists.

### Add a new service

Edit `/src/data/services.ts` and add a new `Service` object. Then add the corresponding route in `src/app/services/[service]/page.tsx` (already dynamic — just adding to the array is sufficient). Rebuild.

### Update photos

Replace any file in `/public/images/` with a new file of the same name. For new photos, update the corresponding component's `src` prop. Run `pnpm build`.

### Update license numbers / credentials

Edit `/src/data/siteConfig.ts` → `licenses` object. These are used in the footer, trust strip, and About page.

---

## SEO Notes

- **Schema markup**: LocalBusiness schema is injected in the root layout on every page. Service schema and FAQPage schema are on service pages and town×service pages.
- **Sitemap**: Auto-generated at build time. Tier 1 town×service pages get priority 0.9, Tier 2 = 0.8, Tier 3 = 0.7.
- **NAP consistency**: The name, address, and phone in `/src/data/siteConfig.ts` are the canonical source. The footer, Contact page, and LocalBusiness schema all pull from the same object. Keep this in sync with the Google Business Profile exactly.
- **Copy variation**: Town×service pages use a deterministic copy generator (`/src/lib/copy-generator.ts`) that produces varied intro paragraphs, "why us" blocks, and mini-FAQs. The variation is stable across builds (keyed by `townSlug-serviceSlug` hash).

---

## Accessing the Admin SEO Checklist

Navigate to:
```
/admin/seo-checklist?key=truestar2026
```

This sets a cookie that grants access for 24 hours. The page is `noindex` and excluded from the sitemap. Share this URL only with the client.

---

## Deployment (Vercel)

1. Push to GitHub (or import directly from local)
2. In Vercel project settings → Environment Variables, add:
   - `RESEND_API_KEY`
   - `CONTACT_FROM_EMAIL`
   - `CONTACT_TO_EMAIL`
3. Deploy. Vercel auto-detects Next.js.
4. After first deploy: submit `https://truestarcontracting.com/sitemap.xml` to Google Search Console.

---

## Brand Tokens

Defined in `src/app/globals.css` as CSS custom properties:

| Token | Value | Usage |
|-------|-------|-------|
| `--brand-red` | `#DC2626` | Primary CTAs, accents |
| `--ink` | `#0A0A0A` | Primary text, dark sections |
| `--ink-2` | `#171717` | Slightly lifted dark |
| `--paper` | `#FAFAFA` | Light backgrounds |
| `--paper-2` | `#F4F4F5` | Card backgrounds |
| `--line` | `#E4E4E7` | Borders, dividers |
| `--muted` | `#71717A` | Secondary text |

---

## Contact

**True Star Contracting LLC**  
54 Hedden Terrace, North Arlington, NJ 07031  
(201) 790-4530  
Mon–Sat 8:00 AM – 5:00 PM
