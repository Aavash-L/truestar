export type FAQ = {
  question: string;
  answer: string;
};

export const globalFaqs: FAQ[] = [
  {
    question: "How much does asbestos removal cost?",
    answer:
      "Cost depends on the material type, square footage, and accessibility. A single-room floor tile job typically runs $1,500–$4,000. Whole-house pipe insulation abatement is more. We visit every site before quoting — call us for a free estimate at (908) 402-0192.",
  },
  {
    question: "Are you licensed and insured?",
    answer:
      "Yes. True Star Contracting LLC is licensed in both New Jersey and New York, and NJ DOL certified for asbestos abatement. We carry full general liability and workers' compensation insurance. We'll provide certificates on request.",
  },
  {
    question: "Do you handle permits?",
    answer:
      "Yes — permits are included in our scope. We file demolition permits and NJ DOL asbestos abatement notifications on every applicable job. You don't need to interact with the municipality or the DOL.",
  },
  {
    question: "How long does a full demolition take?",
    answer:
      "A single-room gut runs 1–2 days. A full floor of a house is typically 3–5 days. Large commercial jobs vary. We give you a written timeline during the estimate visit and stick to it.",
  },
  {
    question: "Is asbestos removal safe for my family?",
    answer:
      "When performed by a licensed contractor, yes. We set up negative air containment and HEPA filtration before any work begins. Occupants must be out of the work area during abatement. We provide written air clearance before anyone re-enters.",
  },
  {
    question: "Do you offer free estimates?",
    answer:
      "Yes. We provide free on-site estimates for all services. We visit the property, assess the scope, and deliver a written estimate within 24 hours. Call (908) 402-0192 or use the form on our site.",
  },
  {
    question: "What towns do you serve?",
    answer:
      "We serve 60 towns across Bergen, Hudson, Essex, Passaic, and Middlesex counties in North Jersey. Our primary service area includes North Arlington, Kearny, Belleville, Newark, Jersey City, Hoboken, and surrounding towns. View our full service area list on the Service Areas page.",
  },
  {
    question: "How do I know if I have mold or asbestos?",
    answer:
      "Mold is sometimes visible but often hides behind walls, under flooring, or in HVAC systems — a musty smell is the first sign. Asbestos cannot be identified visually and requires lab testing of bulk material samples. If your building was built before 1980, assume asbestos may be present until tested. Call us for an inspection.",
  },
];

export const serviceSpecificFaqs: Record<string, FAQ[]> = {
  demolition: [
    {
      question: "Do you do partial/selective demolition?",
      answer:
        "Yes — selective demo is most of what we do. We remove only what's specified, protect adjacent structures, and leave the site ready for the next phase.",
    },
    {
      question: "Can you work in an occupied building?",
      answer:
        "Yes. We use dust containment, coordinate shift hours with occupants or tenants, and stage work to minimize disruption.",
    },
  ],
  "asbestos-removal": [
    {
      question: "Does NJ require air clearance testing?",
      answer:
        "Yes, NJ DOL requires post-abatement air clearance before a work area can be reoccupied. We coordinate third-party clearance testing as part of every abatement project.",
    },
    {
      question: "What materials commonly contain asbestos?",
      answer:
        "In pre-1980 buildings: floor tiles (VAT/VCT), pipe insulation, ceiling tiles, textured (popcorn) ceilings, siding (transite board), roofing felt, and spray-applied fireproofing.",
    },
  ],
  "mold-remediation": [
    {
      question: "Does insurance cover mold remediation?",
      answer:
        "It depends on the cause. Sudden water events (burst pipes) are often covered; long-term moisture or flooding generally is not. We provide full documentation to support insurance claims.",
    },
    {
      question: "Will mold come back after remediation?",
      answer:
        "Not if the moisture source is fixed. We identify the source and give specific recommendations. Address the source, and remediation is permanent.",
    },
  ],
};
