import type { Town } from "@/data/towns";
import type { Service } from "@/data/services";

// Deterministic hash for stable variation across builds
function stableHash(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // 32-bit
  }
  return Math.abs(hash);
}

function pick<T>(arr: T[], key: string, salt = 0): T {
  return arr[(stableHash(key + salt) + salt) % arr.length];
}

// ── Opening sentence structures ───────────────────────────────────────────

const openingsByService = {
  demolition: [
    (town: Town) =>
      `When a ${town.name} property needs selective demolition done right, True Star Contracting is the crew that shows up prepared — permits in hand and a plan that won't blow up your timeline.`,
    (town: Town) =>
      `Demolition work in ${town.name} requires more than a wrecking crew. Between local permit requirements, asbestos pre-screening, and protecting neighboring structures, experience is the difference between a clean job and an expensive mess.`,
    (town: Town) =>
      `${town.name} property owners trust True Star Contracting for demolition because we treat the pre-work as seriously as the work itself — permits, asbestos screening, site protection, and a crew that knows the local inspection process.`,
    (town: Town) =>
      `True Star has handled demolition projects across ${town.county} County for over 25 years. In ${town.name}, that means we know the permit office, we know the building stock, and we know what surprises to look for before the first swing.`,
    (town: Town) =>
      `A demolition job in ${town.name} is straightforward when you hire a contractor who's done it hundreds of times before. True Star pulls the permits, coordinates with your GC or architect, and leaves the site ready for the next phase.`,
    (town: Town) =>
      `For interior or selective demolition in ${town.name}, True Star Contracting handles the project from permit to cleanup — so you don't have to coordinate between multiple contractors for what should be a single scope of work.`,
  ],
  "asbestos-removal": [
    (town: Town) =>
      `Asbestos abatement in ${town.name} isn't a job for an unlicensed crew. True Star is NJ DEP licensed, EPA AHERA certified, and has been removing asbestos-containing materials from ${town.county} County buildings for over 25 years.`,
    (town: Town) =>
      `If your ${town.name} property was built before 1980, asbestos is a realistic possibility — in floor tiles, pipe insulation, ceiling tiles, or siding. True Star conducts testing, handles the NJ DEP notification, and removes it properly so your project doesn't stall.`,
    (town: Town) =>
      `True Star Contracting has been the go-to for asbestos removal in ${town.name} and throughout ${town.county} County for more than two decades. We handle bulk sampling, NJ DEP filings, removal, and air clearance — all in-house, no subcontractors.`,
    (town: Town) =>
      `Discovering asbestos during a renovation in ${town.name} doesn't have to derail the project. True Star mobilizes quickly, contains the work area, and completes abatement with the documentation your GC, lender, or insurance company needs to move forward.`,
    (town: Town) =>
      `${town.name}'s pre-1980 building stock — ${town.localContext.split(".")[0].toLowerCase()} — means asbestos is a real risk before any renovation or demolition. True Star handles testing, abatement, and clearance so your project stays on track.`,
    (town: Town) =>
      `For asbestos removal in ${town.name}, True Star provides everything from initial bulk sampling through NJ DEP-compliant removal and written air clearance. We've been doing this work in ${town.county} County since before most contractors knew the DEP had regulations.`,
  ],
  "mold-remediation": [
    (town: Town) =>
      `Mold behind the walls of a ${town.name} home or commercial building doesn't go away on its own — and painting over it isn't remediation. True Star removes it properly, identifies the moisture source, and provides air clearance documentation.`,
    (town: Town) =>
      `${town.name} property owners dealing with mold need two things: removal done right and documentation to satisfy insurance, buyers, or lenders. True Star provides both, with IICRC-standard remediation and a written clearance report on every job.`,
    (town: Town) =>
      `True Star Contracting has handled mold remediation across ${town.county} County for over 25 years. In ${town.name}, that means we understand the local building stock, common moisture sources, and what it takes to get a clearance that holds up.`,
    (town: Town) =>
      `Mold discovered during a ${town.name} renovation doesn't have to stop the project. True Star contains it, removes all affected materials, treats the structure, and provides air clearance — so your contractor can pick up where they left off.`,
    (town: Town) =>
      `For mold remediation in ${town.name}, True Star follows IICRC S520 standards — proper containment, physical removal of all affected porous material, anti-microbial treatment, and post-clearance testing. No shortcuts, no cutting costs on air quality.`,
    (town: Town) =>
      `${town.name} properties affected by mold need more than a spray-and-wipe approach. True Star conducts full remediation: containment, HEPA vacuuming, material removal, structural treatment, and written clearance. The job is done when the air tests clean.`,
  ],
};

// ── Second paragraph structures ──────────────────────────────────────────

const secondParaByTier = {
  1: (town: Town, service: Service) =>
    `As a ${town.name}-area contractor operating out of North Arlington, True Star is typically on-site for estimates within 24 hours and can schedule projects within days — not weeks. ${town.landmarks.length > 0 ? `We've worked on properties across ${town.name} — near ${town.landmarks[0]} and throughout the surrounding neighborhoods.` : `We've worked throughout ${town.name}'s neighborhoods and know what the local building stock requires.`} Same-day emergency response is available for active water damage or mold situations.`,

  2: (town: Town, service: Service) =>
    `From our base in North Arlington, True Star reaches ${town.name} quickly — typically within 24 hours for an estimate and within the week for project scheduling. ${town.neighborhoods.length > 1 ? `We've worked in ${town.neighborhoods.slice(0, 2).join(", ")}, and across ${town.name}'s residential and commercial inventory.` : `We've handled projects across ${town.name}'s residential and commercial properties.`} Our team is familiar with ${town.county} County permit offices and inspection requirements, which keeps your project moving.`,

  3: (town: Town, service: Service) =>
    `${town.name} is within True Star's extended service area, and we travel there regularly for jobs that demand the experience our team brings. We know the building stock in ${town.county} County and the compliance requirements that apply. ${town.landmarks.length > 0 ? `Projects near ${town.landmarks[0]} and throughout ${town.name} are part of our regular work.` : `Our crew handles the full scope — permits, removal, documentation — with the same standard we apply to every job.`}`,
};

// ── "Why choose us" framings ──────────────────────────────────────────────

const whyUsFramings = [
  (town: Town, service: Service) => [
    {
      heading: "Licensed for this exact work",
      body: `True Star is NJ DEP certified and EPA AHERA licensed for ${service.name.toLowerCase()} — not a general contractor doing it on the side. In ${town.name}, you can verify our credentials before we start.`,
    },
    {
      heading: "Permits handled, period",
      body: `We pull every required permit and file every required NJ DEP notification. You don't need to know the process — that's what you're hiring us for.`,
    },
    {
      heading: "Same crew, same standard",
      body: `No subcontractors. The crew that shows up is our crew, trained to our standard. That's how we've maintained a 5.0 rating across 42 Google reviews.`,
    },
    {
      heading: "Written documentation on every job",
      body: `Air clearance reports, project completion records, DEP filings — all provided in writing. Required by insurance, banks, and buyers; provided by us as a matter of course.`,
    },
  ],
  (town: Town, service: Service) => [
    {
      heading: "25+ years in North Jersey",
      body: `We've been doing ${service.shortName.toLowerCase()} work in ${town.county} County for over 25 years. That's not a marketing line — it means we've seen every situation, know every wrinkle in the local permit process, and have 42 five-star reviews to show for it.`,
    },
    {
      heading: "Free on-site estimates",
      body: `We visit every property before quoting. No phone guesses, no online calculators. We see the scope, we give you a real number in writing.`,
    },
    {
      heading: "No sub-contractor finger-pointing",
      body: `True Star handles ${service.shortName.toLowerCase()} in-house. One point of contact, one invoice, one crew responsible for the result.`,
    },
    {
      heading: "Clean job sites, documented closures",
      body: `We leave every ${town.name} job site broom-clean with full documentation. Your GC, lender, or next contractor can walk in and start immediately.`,
    },
  ],
  (town: Town, service: Service) => [
    {
      heading: "Fast response across ${town.county} County",
      body: `Estimates are typically scheduled within 24 hours for ${town.name} and surrounding towns. For active water damage or mold situations, we prioritize same-day response.`,
    },
    {
      heading: "Fully insured, certificates on request",
      body: `We carry general liability and workers' comp. Certificates of insurance are provided to property managers, GCs, and building owners on request — no delays, no runaround.`,
    },
    {
      heading: "Fair, specific pricing",
      body: `We quote what we find, not what we hope to find. If scope changes during the job, we tell you immediately and agree on the additional cost before proceeding.`,
    },
    {
      heading: "Family-owned, locally accountable",
      body: `True Star is a family-owned business based in North Arlington. We live in this community and we stand behind our work long after the job is done.`,
    },
  ],
  (town: Town, service: Service) => [
    {
      heading: "NJ DEP compliance, no guessing",
      body: `NJ has strict regulations for ${service.shortName.toLowerCase()} — and the DEP enforces them. True Star knows the requirements cold and handles every notification, permit, and inspection sign-off.`,
    },
    {
      heading: "Air clearance and closeout documentation",
      body: `Every ${service.shortName.toLowerCase()} project in ${town.name} ends with written clearance documentation — not just a verbal okay. That paper trail matters for insurance, property sales, and future renovations.`,
    },
    {
      heading: "On-time, on-budget track record",
      body: `42 five-star Google reviews across 25+ years of operation. Read them and notice what customers consistently say: on time, on budget, no surprises on the invoice.`,
    },
    {
      heading: "Local to ${town.name}",
      body: `We're not a national franchise or a call center. We're a North Arlington crew that's been working in ${town.county} County for over two decades.`,
    },
  ],
];

// ── Mini FAQ (town × service) ────────────────────────────────────────────

const miniFaqVariants = {
  demolition: [
    (town: Town) => [
      {
        question: `Do you handle demolition permits in ${town.name}?`,
        answer: `Yes. We file all required demolition permits with the ${town.name} building department as part of our scope. You don't need to interact with the permit office.`,
      },
      {
        question: `How quickly can you start a demolition job in ${town.name}?`,
        answer: `For most jobs, we can schedule within 1–2 weeks of the estimate. Permit timing varies by municipality — ${town.name} typically processes in [varies]. We'll give you a real timeline at estimate.`,
      },
      {
        question: `Do you test for asbestos before demolition in ${town.name}?`,
        answer: `Yes — always. Pre-demolition asbestos surveys are required in NJ for many project types, and we conduct bulk sampling on every job before demo begins. If ACM is found, we abate it in-house before demolition proceeds.`,
      },
    ],
    (town: Town) => [
      {
        question: `What types of demolition do you do in ${town.name}?`,
        answer: `We handle selective interior demo (walls, ceilings, kitchens, bathrooms), full gut demolition, basement demo, and commercial tenant improvement demolition. We don't do exterior structural teardown of entire buildings.`,
      },
      {
        question: `Will you coordinate with our general contractor in ${town.name}?`,
        answer: `Yes. We work with GCs regularly and can coordinate directly on scheduling, permit timing, and site handoff. Give us the GC's contact and we'll handle the coordination.`,
      },
      {
        question: `How do you handle debris from a ${town.name} demolition job?`,
        answer: `All demolition debris is hauled off-site to licensed disposal facilities. The site is left broom-clean. Debris removal is included in our estimate — no surprise dump fees.`,
      },
    ],
  ],
  "asbestos-removal": [
    (town: Town) => [
      {
        question: `Is asbestos common in ${town.name} homes and buildings?`,
        answer: `Yes. ${town.name}'s pre-1980 building stock commonly contains asbestos in floor tiles, pipe insulation, ceiling tiles, and textured ceilings. Testing is the only way to know for certain.`,
      },
      {
        question: `How long does asbestos removal take in ${town.name}?`,
        answer: `A single-material, single-room job typically takes 1–3 days including air clearance. Multi-room or multi-material projects take longer. We'll give you a specific timeline at the estimate visit.`,
      },
      {
        question: `Does True Star file the NJ DEP notification for ${town.name} projects?`,
        answer: `Yes. NJ DEP notification is required for most asbestos abatement projects, and we handle the filing as part of our scope. You don't interact with the DEP.`,
      },
    ],
    (town: Town) => [
      {
        question: `What materials do you test for asbestos in ${town.name}?`,
        answer: `We test any suspected ACM: floor tile and mastic, pipe and boiler insulation, ceiling tile, textured ceilings, siding, roofing materials, and transite board. We collect bulk samples and send them to an accredited lab.`,
      },
      {
        question: `Do you provide air clearance documentation for ${town.name} projects?`,
        answer: `Yes. Every asbestos abatement project ends with a third-party air clearance test and a written clearance certificate. This is required by NJ DEP and necessary for insurance, sale, and re-occupancy.`,
      },
      {
        question: `Can asbestos removal be done while tenants are in the building in ${town.name}?`,
        answer: `No occupants may be in the work area during abatement — NJ DEP regulations require this. For multi-unit buildings, we work unit by unit and can sometimes allow occupancy in unaffected units with proper containment.`,
      },
    ],
  ],
  "mold-remediation": [
    (town: Town) => [
      {
        question: `How do I know if I need mold remediation in my ${town.name} property?`,
        answer: `Visible mold growth, a persistent musty smell, unexplained respiratory symptoms, or a history of water intrusion are all indicators. True Star offers standalone mold inspections to assess the situation before you commit to remediation.`,
      },
      {
        question: `How long does mold remediation take in ${town.name}?`,
        answer: `A contained, single-room remediation typically takes 2–4 days including air clearance. Larger or more complex situations take longer. We'll give you a specific timeline after the inspection.`,
      },
      {
        question: `Do you provide a clearance report for ${town.name} mold remediation?`,
        answer: `Yes. Every remediation ends with post-remediation air testing and a written clearance report. This report is accepted by insurance adjusters, real estate attorneys, and lenders.`,
      },
    ],
    (town: Town) => [
      {
        question: `What causes mold in ${town.name} buildings?`,
        answer: `Moisture — from roof leaks, plumbing failures, foundation seepage, HVAC condensation, or flooding. ${town.name}'s older building stock often has less effective vapor barriers, making mold more likely after any water event.`,
      },
      {
        question: `Is it safe to stay in my ${town.name} home during mold remediation?`,
        answer: `For small, well-contained jobs, sometimes yes. For anything involving black mold (Stachybotrys) or large areas, we recommend vacating during remediation. We'll give you a specific recommendation after the inspection.`,
      },
      {
        question: `Does homeowners insurance cover mold remediation in ${town.name}?`,
        answer: `Coverage depends on the cause. Sudden water damage events are often covered; long-term moisture or flooding typically is not. We provide full documentation to support your claim — call us and we'll walk you through what we've seen insurers accept.`,
      },
    ],
  ],
};

// ── Main export functions ─────────────────────────────────────────────────

export function generateTownServiceIntro(
  town: Town,
  service: Service
): { opening: string; secondPara: string } {
  const key = `${town.slug}-${service.slug}`;
  const hash = stableHash(key);

  const serviceOpenings =
    openingsByService[service.slug as keyof typeof openingsByService] ||
    openingsByService.demolition;
  const openingFn = serviceOpenings[hash % serviceOpenings.length];
  const opening = openingFn(town);

  const tierFn = secondParaByTier[town.tier as keyof typeof secondParaByTier];
  const secondPara = tierFn(town, service);

  return { opening, secondPara };
}

export function generateWhyChooseUs(
  town: Town,
  service: Service
): { heading: string; body: string }[] {
  const key = `${town.slug}-${service.slug}-why`;
  const hash = stableHash(key);
  const framingFn = whyUsFramings[hash % whyUsFramings.length];
  return framingFn(town, service);
}

export function generateMiniFaq(
  town: Town,
  service: Service
): { question: string; answer: string }[] {
  const key = `${town.slug}-${service.slug}-faq`;
  const hash = stableHash(key);
  const serviceVariants =
    miniFaqVariants[service.slug as keyof typeof miniFaqVariants] ||
    miniFaqVariants.demolition;
  const variantFn = serviceVariants[hash % serviceVariants.length];
  return variantFn(town);
}

export function generateTownIntro(town: Town): string {
  const openings = [
    `${town.name}, ${town.county} County — ${town.localContext}`,
    `True Star Contracting has been serving ${town.name} property owners for over 25 years. ${town.localContext}`,
    `For homeowners and property managers in ${town.name}, True Star Contracting is the licensed demolition, asbestos, and mold contractor that serves this area. ${town.localContext}`,
    `${town.localContext} True Star Contracting handles demolition, asbestos removal, and mold remediation for ${town.name} properties of all types.`,
  ];
  const hash = stableHash(town.slug);
  return openings[hash % openings.length];
}
