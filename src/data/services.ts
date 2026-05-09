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
