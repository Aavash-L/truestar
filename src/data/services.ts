export type ProcessStep = {
  step: number;
  title: string;
  description: string;
};

export type FAQ = {
  question: string;
  answer: string;
};

export type Service = {
  slug: string;
  name: string;
  shortName: string;
  shortDescription: string;
  longDescription: string;
  heroImage: string;
  galleryImages: string[];
  whatIncluded: string[];
  processSteps: ProcessStep[];
  whyItMatters: string;
  faq: FAQ[];
};

export const services: Service[] = [
  {
    slug: "demolition",
    name: "Demolition",
    shortName: "Demolition",
    shortDescription:
      "Interior and selective demolition for residential and commercial projects. Full site prep, debris removal, and permits handled.",
    longDescription:
      "True Star Contracting has been handling demolition work across North Jersey for over 25 years. Whether you need a single room stripped to the studs or a full commercial gut job, we plan it right, pull the permits, and leave the site clean. No shortcuts. We work around your schedule and coordinate with general contractors, architects, and property managers.",
    heroImage: "/images/services/demolition/hero.jpg",
    galleryImages: [
      "/images/services/demolition/gallery-1.jpg",
      "/images/services/demolition/gallery-2.jpg",
      "/images/services/demolition/gallery-3.jpg",
    ],
    whatIncluded: [
      "Interior selective demolition (walls, ceilings, floors, fixtures)",
      "Full gut renovation demo for kitchens, bathrooms, and basements",
      "Commercial tenant improvement demolition",
      "Structural element removal (load-bearing walls with engineering sign-off)",
      "Concrete breaking and removal",
      "Debris hauling and disposal — fully licensed and insured",
      "Permit filing and inspection coordination",
      "Site protection and dust containment",
      "Coordination with GC, architect, and subcontractors",
    ],
    processSteps: [
      {
        step: 1,
        title: "Site walkthrough & estimate",
        description:
          "We visit the property, assess scope, flag any hazardous material concerns (asbestos, mold), and provide a written estimate within 24 hours.",
      },
      {
        step: 2,
        title: "Permits & planning",
        description:
          "We pull the required demolition permits from the local municipality and schedule the job to minimize disruption to your timeline.",
      },
      {
        step: 3,
        title: "Hazmat pre-clearance",
        description:
          "If asbestos or mold is present, we handle remediation first — before demo begins. No double-billing, no excuses.",
      },
      {
        step: 4,
        title: "Demolition",
        description:
          "Crew shows up on time with the right equipment. We demo what's specified and nothing else. Neighbors are notified when required.",
      },
      {
        step: 5,
        title: "Debris removal & site clean",
        description:
          "All debris is hauled off-site to licensed facilities. We leave the space broom-clean and ready for the next phase.",
      },
    ],
    whyItMatters:
      "Demolition done wrong causes delays, unexpected costs, and failed inspections. Hidden asbestos or mold found mid-demo can shut a job down for weeks. We pre-screen every site and handle hazmat in-house — no sub-contractors, no finger-pointing. Your GC's schedule stays intact.",
    faq: [
      {
        question: "Do I need a permit for interior demolition in NJ?",
        answer:
          "In most NJ municipalities, yes — especially if you're removing walls or working on a multi-family or commercial property. We pull the permits as part of every job, so you don't have to navigate municipal offices yourself.",
      },
      {
        question: "How long does a typical demolition job take?",
        answer:
          "A single-room gut takes 1–2 days. A full floor of a residential home typically runs 3–5 days. Large commercial jobs vary — we'll give you a realistic timeline during the estimate visit.",
      },
      {
        question: "What do you do with the debris?",
        answer:
          "All demolition debris is removed and disposed of at licensed facilities. We're fully bonded and insured for waste transport.",
      },
      {
        question: "Can you work around a tenant or occupied building?",
        answer:
          "Yes. We've done occupied-building work in Hudson County apartment buildings for years. We stage the work, contain dust, and coordinate hours with tenants.",
      },
      {
        question: "Will you find asbestos during demolition?",
        answer:
          "We pre-screen every site before demo begins. If materials test positive, we handle abatement first — we're licensed for both. You won't get hit with a surprise shutdown.",
      },
    ],
  },
  {
    slug: "asbestos-removal",
    name: "Asbestos Removal & Abatement",
    shortName: "Asbestos Removal",
    shortDescription:
      "Licensed NJ asbestos abatement for homes and commercial buildings. Testing, removal, air clearance, and disposal — fully certified.",
    longDescription:
      "Asbestos in your building is a legal and health liability. True Star is licensed by the NJ DEP and EPA AHERA-certified to handle asbestos removal on any residential or commercial property in New Jersey. We test, remove, air-clear, and dispose of all asbestos-containing materials — and we do it without stopping your project in its tracks.",
    heroImage: "/images/services/asbestos-removal/hero.jpg",
    galleryImages: [
      "/images/services/asbestos-removal/gallery-1.jpg",
      "/images/services/asbestos-removal/gallery-2.jpg",
      "/images/services/asbestos-removal/gallery-3.jpg",
    ],
    whatIncluded: [
      "Asbestos testing and bulk sampling",
      "Pipe insulation and elbow abatement",
      "Floor tile and mastic removal (VAT/VCT)",
      "Ceiling tile and textured ceiling (popcorn) removal",
      "Siding and roofing material abatement",
      "Spray-applied fireproofing removal",
      "Transite pipe and board abatement",
      "Air monitoring during and after removal",
      "Air clearance certification",
      "Certified disposal at licensed NJ facilities",
      "NJ DEP compliance documentation and project closeout",
    ],
    processSteps: [
      {
        step: 1,
        title: "Inspection & bulk sampling",
        description:
          "A certified inspector collects bulk samples of suspected ACM (asbestos-containing materials) and sends them to an accredited lab. Results typically in 24–48 hours.",
      },
      {
        step: 2,
        title: "Abatement plan & permits",
        description:
          "We file the required NJ DEP notification and obtain any municipal permits before work begins — legally required and strictly enforced.",
      },
      {
        step: 3,
        title: "Containment setup",
        description:
          "We seal the work area with polyethylene sheeting and establish negative air pressure using HEPA-filtered air scrubbers. No fibers leave the work area.",
      },
      {
        step: 4,
        title: "Removal & bagging",
        description:
          "Licensed technicians remove all ACM, wet it to prevent fiber release, and double-bag it in labeled, sealed containers per NJ DEP and EPA regulations.",
      },
      {
        step: 5,
        title: "Air clearance & sign-off",
        description:
          "A third-party air monitoring specialist performs final air clearance testing. You get a written clearance certificate before we leave. Project documentation is filed with the DEP.",
      },
    ],
    whyItMatters:
      "Asbestos is regulated under NJ law — unlicensed removal is illegal and can result in six-figure fines for property owners. Beyond the legal risk, disturbed asbestos fibers cause mesothelioma and lung disease. If your building was constructed before 1980, assume it contains asbestos until tested. Don't let a remodeling contractor disturb it without testing first.",
    faq: [
      {
        question: "How do I know if my building has asbestos?",
        answer:
          "Buildings constructed before 1980 commonly contain asbestos in insulation, floor tiles, ceiling tiles, roofing, and siding. You cannot identify asbestos by looking — it requires bulk sampling and lab analysis. We can do this as a standalone service.",
      },
      {
        question: "Is asbestos removal safe for my family?",
        answer:
          "When performed by a licensed contractor like True Star, yes. We set up negative air containment, use HEPA filtration, and perform air clearance testing before anyone re-enters. Legally, no occupants may be in the work area during abatement.",
      },
      {
        question: "Does NJ require a permit for asbestos removal?",
        answer:
          "Yes. NJ DEP requires notification (and in most cases permits) for any asbestos abatement project. We handle all required filings — you don't need to interact with the DEP.",
      },
      {
        question: "How long does asbestos removal take?",
        answer:
          "A single-room project (e.g., floor tile removal) typically takes 1–3 days including air clearance. Larger projects with multiple materials or areas take longer. We'll give you a specific timeline at estimate.",
      },
      {
        question: "Can you remove asbestos siding without replacing it?",
        answer:
          "Yes, encapsulation is sometimes permitted by NJ DEP as an alternative to removal for siding in good condition. We'll advise you on which approach makes sense for your situation, timeline, and budget.",
      },
      {
        question: "What's the cost of asbestos removal?",
        answer:
          "Cost depends on the material type, square footage, accessibility, and disposal requirements. A single-bathroom floor tile job might run $1,500–$3,000. Whole-house pipe insulation abatement can be significantly more. Call us for a free estimate — we visit every site before quoting.",
      },
    ],
  },
  {
    slug: "mold-remediation",
    name: "Mold Remediation",
    shortName: "Mold Remediation",
    shortDescription:
      "Professional mold testing, removal, and remediation for residential and commercial properties across North Jersey.",
    longDescription:
      "Mold in a building is not just an aesthetic problem — it's a health hazard and a liability. True Star's mold remediation team finds the source, removes the mold properly, treats the affected materials, and provides clearance documentation. We work fast, document everything, and address the moisture source so it doesn't come back.",
    heroImage: "/images/services/mold-remediation/hero.jpg",
    galleryImages: [
      "/images/services/mold-remediation/gallery-1.jpg",
      "/images/services/mold-remediation/gallery-2.jpg",
      "/images/services/mold-remediation/gallery-3.jpg",
    ],
    whatIncluded: [
      "Visual mold inspection and moisture assessment",
      "Air quality testing and surface sampling",
      "Containment setup (polyethylene barriers, negative pressure)",
      "HEPA vacuuming of all affected surfaces",
      "Physical removal of mold-affected materials (drywall, insulation, wood)",
      "Anti-microbial treatment of structural surfaces",
      "HEPA air filtration during remediation",
      "Post-remediation air clearance testing",
      "Written clearance report",
      "Moisture source identification and recommendations",
      "Coordination with restoration contractors",
    ],
    processSteps: [
      {
        step: 1,
        title: "Inspection & testing",
        description:
          "We assess visible mold, take air and surface samples, and use moisture meters to find the source. Lab results typically return within 24–48 hours.",
      },
      {
        step: 2,
        title: "Containment",
        description:
          "We isolate the affected area with polyethylene sheeting and HEPA-filtered negative air machines to prevent cross-contamination to clean areas.",
      },
      {
        step: 3,
        title: "Removal",
        description:
          "All porous materials with mold growth (drywall, insulation, carpeting) are removed and bagged per IICRC S520 standards. Non-porous surfaces are HEPA-vacuumed and cleaned.",
      },
      {
        step: 4,
        title: "Treatment",
        description:
          "Structural materials that can't be removed (framing, joists) are treated with EPA-registered anti-microbial agents and allowed to dry fully before clearance.",
      },
      {
        step: 5,
        title: "Clearance testing",
        description:
          "Post-remediation air samples are compared against pre-remediation and outdoor baseline levels. We don't leave until you get a written clearance.",
      },
    ],
    whyItMatters:
      "Mold causes respiratory illness, triggers asthma, and can make a property uninhabitable or unmortgageable. In NJ, mold disclosure is required at sale — and incomplete remediation will fail a home inspection. Painting over mold is not remediation. We remove it properly, document it, and give you a clearance report that satisfies insurance companies, banks, and buyers.",
    faq: [
      {
        question: "How do I know if I have mold?",
        answer:
          "Visible mold is obvious — but mold behind walls, under flooring, or in HVAC systems often shows up first as a musty smell, unexplained respiratory symptoms, or water staining. If you've had a flood or leak, assume mold is likely present and test before renovating.",
      },
      {
        question: "Is mold remediation covered by homeowners insurance?",
        answer:
          "It depends on the cause. Sudden water damage (burst pipe) is often covered. Long-term moisture or flooding is usually not. We provide full documentation to support your insurance claim.",
      },
      {
        question: "Can I stay in my home during mold remediation?",
        answer:
          "For small, contained jobs (single room), sometimes yes. For larger jobs or cases involving black mold (Stachybotrys), we recommend vacating during remediation. We'll give you a specific recommendation after assessment.",
      },
      {
        question: "Will the mold come back?",
        answer:
          "Not if the moisture source is fixed. Mold requires moisture to grow. We identify the source (roof leak, plumbing, condensation, grading) and give you specific recommendations. If you address the source, mold remediation is permanent.",
      },
      {
        question: "Do you offer mold testing as a standalone service?",
        answer:
          "Yes. If you just want an assessment and air quality test without remediation, we offer standalone mold inspections. Call us to schedule.",
      },
    ],
  },
];

export type ServiceSlug = "demolition" | "asbestos-removal" | "mold-remediation";

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

// ── Sub-service types ────────────────────────────────────────────────────────

export type SubService = {
  slug: string;
  name: string;
  parentSlug: "demolition";
  category: "residential" | "commercial";
  shortDescription: string;
  longDescription: string;
  heroImage: string;
  whyHireAPro: string;
  processSteps: ProcessStep[];
  whatIncluded: string[];
  faq: FAQ[];
  relatedServices: string[];
  prefillCategory: "Residential" | "Commercial";
};

export const subServices: SubService[] = [
  {
    slug: "garage-demolition",
    name: "Garage Demolition",
    parentSlug: "demolition",
    category: "residential",
    prefillCategory: "Residential",
    shortDescription:
      "Full removal of attached or detached garages, including slab removal when needed.",
    longDescription:
      "Complete garage demolition for residential properties across North Jersey. We handle attached and detached structures, including the foundation slab, with full debris removal and site cleanup. Permits handled when required.",
    heroImage: "/images/services/demolition/hero.jpg",
    whyHireAPro:
      "Garage demolition involves more than knocking down walls. Attached garages share structural connections with the main house — cutting them wrong can compromise the home's framing. Detached garages often have buried utilities and concrete slabs that require proper saw-cutting and disposal. In most NJ municipalities, a demolition permit is legally required, and unpermitted work can create title and insurance problems when you sell. We pull the permit, handle the disconnects, and leave the site ready for whatever comes next.",
    processSteps: [
      {
        step: 1,
        title: "Structure Assessment",
        description:
          "We evaluate the garage's construction type, attachment to the main house, foundation thickness, electrical and plumbing connections, and access conditions to plan the safest dismantling sequence.",
      },
      {
        step: 2,
        title: "Area Protection",
        description:
          "Adjacent structures, driveways, fencing, and landscaping are protected. Utilities are properly disconnected and capped before work begins.",
      },
      {
        step: 3,
        title: "Demolition",
        description:
          "Walls and roof are dismantled in controlled stages. Slab removal is performed when needed using concrete-cutting equipment. All work is performed by trained crews in proper PPE.",
      },
      {
        step: 4,
        title: "Completion & Cleanup",
        description:
          "Debris is sorted, hauled, and disposed at licensed facilities. Site is left graded, level, and ready for reconstruction, repaving, or landscaping.",
      },
    ],
    whatIncluded: [
      "Permit pulling and coordination with local building department",
      "Utility disconnection (electrical, plumbing) coordinated with providers",
      "Full structural demolition (walls, roof, framing)",
      "Foundation slab removal when required",
      "Concrete and debris hauling to licensed disposal sites",
      "Site grading and final cleanup",
      "Free written estimate within 24 hours",
    ],
    faq: [
      {
        question: "How long does a typical garage demolition take?",
        answer:
          "Most single-car garages take 1 day. Two-car garages typically run 1–2 days. Add a day if slab removal is needed.",
      },
      {
        question: "Do I need a permit to demolish my garage in NJ?",
        answer:
          "In most NJ municipalities, yes. We pull the permit as part of the job — you don't have to deal with the building department.",
      },
      {
        question: "Will the demolition damage my driveway or yard?",
        answer:
          "No — we protect adjacent surfaces with mats and barriers before work starts, and we backfill and grade the site clean when we're done.",
      },
      {
        question: "Can you demolish an attached garage without affecting the main house?",
        answer:
          "Yes, with a controlled stage-by-stage dismantling. We assess the shared wall and any structural ties before starting so nothing unexpected gets pulled.",
      },
      {
        question: "How much does garage demolition cost?",
        answer:
          "Typically $1,500–$5,000 depending on size, attachment, slab, and disposal volume. Every job gets a free written estimate — call or submit the form.",
      },
    ],
    relatedServices: ["shed-demolition", "concrete-cutting", "deck-porch-demolition", "junk-removal"],
  },

  {
    slug: "kitchen-demolition",
    name: "Kitchen Demolition",
    parentSlug: "demolition",
    category: "residential",
    prefillCategory: "Residential",
    shortDescription:
      "Full or partial kitchen tear-out including cabinets, countertops, flooring, and fixtures, prepped for renovation.",
    longDescription:
      "Professional kitchen demolition for renovation projects. We remove cabinets, countertops, appliances, flooring, tile, and fixtures down to the studs and subfloor as needed, leaving the space ready for your contractor to begin the rebuild. Disposal included.",
    heroImage: "/images/services/demolition/hero.jpg",
    whyHireAPro:
      "Kitchen demo looks straightforward until you hit the unexpected — asbestos floor tile in a pre-1980 home, a gas line that wasn't capped, plumbing connections that weren't flagged on the renovation plan. We pre-screen for hazardous materials, coordinate with your plumber and electrician on timing, and work around your renovation schedule. Debris out the same day where possible. Your GC starts with a clean, code-compliant space.",
    processSteps: [
      {
        step: 1,
        title: "Structure Assessment",
        description:
          "We walk the space with you, identify what stays and what goes, locate plumbing and electrical lines, and confirm subfloor and wall conditions.",
      },
      {
        step: 2,
        title: "Area Protection",
        description:
          "Floors, doorways, and adjacent rooms are protected with masking and floor protection. Dust containment installed for occupied homes.",
      },
      {
        step: 3,
        title: "Demolition",
        description:
          "Cabinets, countertops, appliances, backsplash, flooring, and any specified walls are removed in sequence. Plumbing and electrical are capped safely, coordinated with your trades.",
      },
      {
        step: 4,
        title: "Completion & Cleanup",
        description:
          "All debris is hauled out the same day where possible. Subfloor and wall studs are left clean and ready for the next phase.",
      },
    ],
    whatIncluded: [
      "Cabinet and countertop removal",
      "Appliance disconnect and removal",
      "Tile, vinyl, and hardwood flooring removal",
      "Backsplash and drywall removal as specified",
      "Plumbing and electrical capping in coordination with trades",
      "Full debris removal and disposal",
      "Daily cleanup, end-of-job site sweep",
    ],
    faq: [
      {
        question: "How long does a kitchen demolition take?",
        answer:
          "Most kitchens take 1–2 days. Larger or more complex layouts with mortar-bed tile or multiple material layers can run up to 3 days.",
      },
      {
        question: "Can you do the demo while we're still living in the house?",
        answer:
          "Yes — we set up dust containment and seal the work zone so the rest of the house stays livable.",
      },
      {
        question: "Do you handle appliance disposal?",
        answer:
          "Yes. We haul old appliances to licensed recycling. Working units we'll set aside for donation if you prefer — just say so.",
      },
      {
        question: "Do I need a permit for kitchen demo?",
        answer:
          "Usually no for non-structural demo. Yes if walls are coming down — we handle the permit if it's needed.",
      },
      {
        question: "What if you find asbestos floor tile during demo?",
        answer:
          "We stop, test, and bring in our licensed abatement team. Pre-1980 vinyl tile frequently contains asbestos — disturbing it without testing is illegal. We handle it in-house, no subcontractors.",
      },
    ],
    relatedServices: ["bathroom-demolition", "flooring-removal", "wall-removal", "junk-removal"],
  },

  {
    slug: "bathroom-demolition",
    name: "Bathroom Demolition",
    parentSlug: "demolition",
    category: "residential",
    prefillCategory: "Residential",
    shortDescription:
      "Complete bathroom gut-out including tile, fixtures, vanity, tub, and flooring, ready for renovation.",
    longDescription:
      "Full bathroom demolition for residential renovations. We remove tile, vanities, tubs, toilets, flooring, and fixtures down to the studs and subfloor when needed. Plumbing capped safely. Disposal handled. Most bathrooms completed in one day.",
    heroImage: "/images/services/demolition/hero.jpg",
    whyHireAPro:
      "Bathrooms concentrate the hazards: mortar beds under old tile can hide asbestos, subfloor moisture damage needs to be caught and documented before a renovation starts, and cast iron tubs require the right equipment to remove without cracking the floor below. We inspect before we start, flag anything that would surprise your contractor, and coordinate plumbing capping with your trade. You get a clean, inspected space — not a surprise on demo day.",
    processSteps: [
      {
        step: 1,
        title: "Structure Assessment",
        description:
          "Inspect for hidden water damage, mold (flagged for our remediation team if found), and the condition of subfloor and framing before work starts.",
      },
      {
        step: 2,
        title: "Area Protection",
        description:
          "Hallways, adjacent rooms, and floors are protected. Dust containment installed.",
      },
      {
        step: 3,
        title: "Demolition",
        description:
          "Tile, vanity, tub, toilet, flooring, drywall, and any specified fixtures are removed in sequence. Plumbing capped safely.",
      },
      {
        step: 4,
        title: "Completion & Cleanup",
        description:
          "Debris hauled, work area swept, subfloor and studs left ready for the next phase.",
      },
    ],
    whatIncluded: [
      "Tile floor and wall removal",
      "Vanity, sink, and toilet removal",
      "Tub and shower demolition",
      "Flooring removal down to subfloor",
      "Plumbing and electrical capping",
      "Full debris removal and hauling",
    ],
    faq: [
      {
        question: "Can a bathroom demo be done in one day?",
        answer:
          "Most can. Tile and tub removal takes longer in older homes with mortar beds — we'll tell you up front if yours is a two-day job.",
      },
      {
        question: "What if you find mold or asbestos?",
        answer:
          "We stop, document, and bring in our remediation team. Removal of either requires proper containment — we handle it in-house.",
      },
      {
        question: "Do you handle cast iron tubs?",
        answer:
          "Yes — we have the tools and crew to remove cast iron tubs without damaging surrounding structure or floors.",
      },
      {
        question: "Will the subfloor be intact when you're done?",
        answer:
          "Subfloor stays unless damaged. We assess at the start and let you know right away if subfloor replacement is needed.",
      },
      {
        question: "How much does bathroom demolition cost?",
        answer:
          "Typically $800–$2,500 depending on size, tile coverage, and fixture type. Free estimate — call or submit the form.",
      },
    ],
    relatedServices: ["kitchen-demolition", "flooring-removal", "mold-remediation", "asbestos-removal"],
  },

  {
    slug: "house-teardown",
    name: "Full House Teardown",
    parentSlug: "demolition",
    category: "residential",
    prefillCategory: "Residential",
    shortDescription:
      "Complete demolition of single-family homes including foundation removal, hauling, and final site grading.",
    longDescription:
      "Full residential teardowns for new construction or land redevelopment across North Jersey. We handle the entire process — permits, utility disconnects, demolition, foundation removal, debris hauling, and final site grading. 25+ years experience, fully insured, licensed in NJ and NY.",
    heroImage: "/images/services/demolition/hero.jpg",
    whyHireAPro:
      "A full house teardown is the most permit-intensive and regulated demolition job a homeowner can order. NJ law requires pre-demolition asbestos and lead testing for homes built before 1980. DEP notifications, municipal demolition permits, and utility company sign-offs must all line up before the first machine touches the structure. Get one step out of order and the work stops — sometimes for weeks. We've run this process hundreds of times. We know the sequence, the inspectors, and the disposal requirements. You get a graded, permit-closed site on schedule.",
    processSteps: [
      {
        step: 1,
        title: "Structure Assessment",
        description:
          "Comprehensive evaluation including pre-1980 asbestos and lead-paint testing (legally required), structural assessment, foundation type, utility locations, and adjacent property conditions.",
      },
      {
        step: 2,
        title: "Area Protection",
        description:
          "Site fencing installed. Adjacent properties, sidewalks, and roadways protected. Utilities formally disconnected with provider sign-offs obtained.",
      },
      {
        step: 3,
        title: "Demolition",
        description:
          "Asbestos abatement performed first if required. Mechanical demolition with excavators in controlled sequence — interior strip, then structural, then foundation. Dust suppression throughout.",
      },
      {
        step: 4,
        title: "Completion & Cleanup",
        description:
          "Debris sorted at site — concrete, metal, and wood hauled to appropriate licensed facilities. Foundation hole backfilled and graded. Site left ready for new construction.",
      },
    ],
    whatIncluded: [
      "All required permits — NJ DEP, local building, utility",
      "Pre-demolition asbestos and lead testing",
      "Asbestos abatement if needed (in-house, no subcontracting)",
      "Utility disconnection coordination",
      "Site fencing and dust suppression",
      "Full structural demolition",
      "Foundation and slab removal",
      "Concrete, metal, and wood debris recycling",
      "Final grading and site preparation",
    ],
    faq: [
      {
        question: "How long does a full house teardown take?",
        answer:
          "Typically 1–2 weeks from permit to final grading. Older homes requiring asbestos abatement add 3–5 days for that phase.",
      },
      {
        question: "Is asbestos testing always required for a house teardown?",
        answer:
          "For homes built before 1980, yes — it's required by NJ DEP before demolition can begin. We conduct the testing as part of the project.",
      },
      {
        question: "Do you handle all the permits?",
        answer:
          "Yes — every permit, every inspection, every sign-off. You don't need to interact with the building department or utility companies.",
      },
      {
        question: "Can you preserve trees or landscaping on the site?",
        answer:
          "We can protect and work around specified trees and landscape features when access allows. Discuss what you want to keep during the assessment visit.",
      },
      {
        question: "What's the typical cost for a full house teardown?",
        answer:
          "Highly variable — $15,000 to $50,000+ depending on size, age, asbestos presence, and foundation type. Every job gets a written estimate after we walk the site.",
      },
    ],
    relatedServices: ["asbestos-removal", "site-clearing", "concrete-cutting", "exterior-demolition"],
  },

  {
    slug: "concrete-cutting",
    name: "Concrete Cutting & Demolition",
    parentSlug: "demolition",
    category: "residential",
    prefillCategory: "Residential",
    shortDescription:
      "Precision concrete cutting, slab removal, and selective concrete demolition for residential and light commercial.",
    longDescription:
      "Concrete cutting and demolition services across North Jersey. We handle slab removal, sidewalk and patio demolition, foundation cuts, and selective concrete work for residential and light commercial projects. Diamond blade cutting for clean precision — controlled removal and full disposal.",
    heroImage: "/images/services/demolition/hero.jpg",
    whyHireAPro:
      "Concrete cutting looks like brute-force work — it isn't. Post-tension cables, rebar patterns, and embedded conduit aren't visible from the surface, and hitting them wrong can cause structural failure or electrical hazards. Diamond saw work also produces fine silica dust that requires proper respiratory protection and containment. We mark utilities, scan for cables before cutting, and contain the slurry. You get a clean cut where you need it, nothing damaged where you don't.",
    processSteps: [
      {
        step: 1,
        title: "Structure Assessment",
        description:
          "Identify concrete type and thickness, locate embedded rebar or post-tension cables, mark utility lines, and confirm the cut or removal pattern with the site owner.",
      },
      {
        step: 2,
        title: "Area Protection",
        description:
          "Adjacent surfaces masked. Slurry containment installed for wet cutting. All utilities clearly marked.",
      },
      {
        step: 3,
        title: "Cutting & Removal",
        description:
          "Diamond-blade saw cutting — wet or dry depending on environment. Slabs broken into manageable sections. Rebar cut and separated for recycling.",
      },
      {
        step: 4,
        title: "Completion & Cleanup",
        description:
          "All concrete removed and hauled to a recycling facility. Site swept clean. Cut edges left ready for the next phase.",
      },
    ],
    whatIncluded: [
      "Underground utility marking before cutting",
      "Diamond blade wet or dry cutting",
      "Slab, sidewalk, and patio removal",
      "Concrete recycling at licensed facilities",
      "Rebar separation for recycling",
      "Site cleanup and final sweep",
    ],
    faq: [
      {
        question: "Can you cut through a concrete slab that has rebar?",
        answer:
          "Yes — diamond blades handle rebar cleanly. We assess thickness and rebar density before starting to select the right blade and approach.",
      },
      {
        question: "Is wet cutting messy?",
        answer:
          "Slurry is contained at the cut line with barriers and a wet vac. We clean the work area before leaving.",
      },
      {
        question: "Do you do core drilling?",
        answer:
          "Yes — for plumbing, electrical, or HVAC penetrations through concrete walls or slabs. Ask about this specifically when you call.",
      },
      {
        question: "How thick a slab can you cut?",
        answer:
          "Most diamond saws cut up to 12 inches in a single pass. Thicker concrete requires staged cuts — we'll tell you what's needed after the assessment.",
      },
      {
        question: "What does concrete cutting typically cost?",
        answer:
          "Sidewalks: $4–$8 per square foot. Driveways: $5–$10 per square foot. Free estimate for every job.",
      },
    ],
    relatedServices: ["concrete-slab-removal", "concrete-core-drilling", "site-clearing", "garage-demolition"],
  },
];

export function getSubService(slug: string): SubService | undefined {
  return subServices.find((s) => s.slug === slug);
}
