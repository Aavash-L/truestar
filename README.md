# True Star Contracting

Full website rebuild and local SEO infrastructure for a New Jersey contracting business. Built with Next.js 15 and designed around programmatic landing pages to dominate local search.

🌐 **Live:** [truestarcontracting.com](https://truestarcontracting.com)

---

## What it is

A production marketing site and lead-generation system for True Star Contracting LLC, a roofing and exterior contractor serving central and northern New Jersey. The goal of the build wasn't just a redesigned website — it was an SEO-first architecture that captures local search intent across ~60 NJ towns.

---

## The strategy

Most contractor sites have one "Services" page and one "Areas We Serve" page. Google can't rank them for specific town + service queries, and they lose business to better-optimized competitors.

True Star's site is structured differently:

- **Programmatic location pages** — Each NJ town has its own indexed page (e.g., `/roofing/edison-nj`, `/siding/woodbridge-nj`) with localized copy, schema markup, and service-specific content.
- **Service hub pages** — Each service (roofing, siding, gutters, etc.) has a dedicated funnel optimized for both informational and transactional queries.
- **Local schema + structured data** — Every page ships JSON-LD for LocalBusiness, Service, and FAQ schemas so Google can surface them in map packs and rich results.
- **Performance-first** — Static generation, image optimization, sub-1s LCP. Local SEO weights Core Web Vitals heavily.

---

## Tech stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Content:** Programmatic page generation from structured data (town list + service matrix)
- **SEO:** JSON-LD schema, dynamic sitemap.xml, meta tag generation per page
- **Deployment:** Vercel
- **Forms:** Lead capture with email/SMS routing to the client

---

## What I built

- ~60 programmatic landing pages generated from a clean data model
- Custom design system aligned with the contractor's brand (no off-the-shelf templates)
- Service-area logic that handles overlap between towns and service offerings
- Lead-capture forms with validation and routing
- Full on-page SEO baseline (meta, schema, internal linking, sitemap)
- Mobile-first responsive layout

---

## Why it matters

This wasn't a portfolio project — it's a live business asset. The site replaced a static template-based site that wasn't ranking, and it's structured to grow as True Star expands service areas.

For me, it was an exercise in delivering production-quality work for a real client with real revenue at stake: scoping, SEO strategy, design, build, and handoff with a copy-paste-ready local SEO playbook.

---

## Other client work

- [Wings Citi Cafe](https://wingciticafe.com)
- [Urmi Threading Salon](https://urmithreadingsalon.com)
- [Dominus Capital](https://dominuscapitalofficial.com)

📫 alamichhane158@gmail.com
🌐 [aavashlamichhane.com](https://aavashlamichhane.com)
