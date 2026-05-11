# TODO — True Star Contracting Website

## Client Assets Needed

These are blocking or near-blocking items that require client-supplied content:

### Video (HIGH PRIORITY)
- [ ] Hero video — place at `/public/videos/hero.mp4`. H.264 MP4, 1920×1080, ≤20 MB, autoplay-safe (no audio needed). Drone job-site footage works best. Until this file exists the gradient fallback shows.

### Photos (HIGH PRIORITY)
- [ ] Hero image: real job-site photo for homepage hero (full-bleed, preferably landscape orientation)
  - Place in: `/public/images/hero/hero.jpg`
- [ ] Service hero photos (one per service):
  - `/public/images/services/demolition/hero.jpg`
  - `/public/images/services/asbestos-removal/hero.jpg`
  - `/public/images/services/mold-remediation/hero.jpg`
- [ ] Sub-service hero photos — currently all using demolition hero as placeholder. Replace each with a real job-site photo specific to that service:
  - `/public/images/services/demolition/garage-demolition-hero.jpg`
  - `/public/images/services/demolition/kitchen-demolition-hero.jpg`
  - `/public/images/services/demolition/bathroom-demolition-hero.jpg`
  - `/public/images/services/demolition/house-teardown-hero.jpg`
  - `/public/images/services/demolition/concrete-cutting-hero.jpg`
  - Update `heroImage` path in each entry of `subServices` array in `src/data/services.ts` once photos are available.
- [ ] Gallery photos: minimum 12–20 real before/after job photos
  - Place in: `/public/images/gallery/`
  - Naming: `demolition-kearny-001.jpg`, `asbestos-north-arlington-001.jpg`, etc.
- [ ] Logo file (the red star TC monogram + wordmark)
  - Place in: `/public/images/logo/logo.png` (PNG with transparent background preferred) or `.svg`

### Credentials (HIGH PRIORITY — do not invent these)
- [ ] NJ Contractor License number → update `src/data/siteConfig.ts` → `licenses.njLicense`
- [ ] NY License number → update `src/data/siteConfig.ts` → `licenses.nyLicense`
- [x] NJ DOL Asbestos Certification number → `licenses.njDep` (**02047** — done)
- [ ] EPA AHERA Certification number → `licenses.epaAhera`

### Content
- [ ] Owner name and bio for About page (`src/app/about/page.tsx` — marked `{{TODO}}`)
- [ ] Chat bubble avatar photo — place at `/client-assets/avatar.jpg`, then update `src/components/ChatBubbleWidget.tsx` header `div` to use `next/image`. Currently shows "TC" monogram.
- [x] Google Business Profile URL → `src/data/siteConfig.ts` → `social.google` (done)
- [ ] Facebook URL (if applicable) → `src/data/siteConfig.ts` → `social.facebook`

### Env Vars (before deploying)
- [ ] Copy `.env.local.example` to `.env.local`
- [ ] Set `RESEND_API_KEY` — get at resend.com, verify `truestarcontracting.com` domain
- [ ] Set `CONTACT_FROM_EMAIL` and `CONTACT_TO_EMAIL`

## Code TODOs
- [ ] Replace placeholder `<div>` logo in Header and Footer with `next/image` once logo file is available
- [ ] Replace placeholder service card images with `next/image` components pointing to real photos
- [ ] Replace hero `<div>` background with `next/image` priority hero photo
- [ ] Populate gallery with real images and update `galleryImages` array in `src/app/gallery/page.tsx`
- [ ] Add before/after slider data with real photos to homepage `BeforeAfterSlider` section (section stub exists in design, implementation pending real photos)
- [ ] Add GA4 or Plausible tracking snippet in `src/app/layout.tsx` (marked with comment)
- [ ] Verify Google Maps embed URLs render correctly for all 60 towns
- [ ] Review `localContext` for any towns marked with `{{TODO}}` and fill in real local detail

## Deployment Checklist
1. Add env vars in Vercel project settings
2. Run `pnpm build` locally to confirm all ~250 pages generate without errors
3. Deploy to Vercel
4. Submit sitemap.xml to Google Search Console
5. Verify GBP NAP matches website exactly (character by character)
6. Test contact form end-to-end (submit → email arrives)
7. Run Lighthouse on: homepage, 1 service page, 1 Tier 1 town×service page, 1 Tier 3 town×service page
