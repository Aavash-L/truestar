export const siteConfig = {
  name: "True Star Contracting LLC",
  tagline: "Licensed Demolition & Asbestos Removal Done Right.",
  phone: {
    display: "(201) 790-4530",
    href: "tel:+12017904530",
    raw: "+12017904530",
  },
  email: "info@truestarcontracting.com",
  address: {
    street: "54 Hedden Terrace",
    city: "North Arlington",
    state: "NJ",
    zip: "07031",
    full: "54 Hedden Terrace, North Arlington, NJ 07031",
  },
  geo: {
    lat: 40.7882,
    lng: -74.1349,
  },
  hours: {
    display: "Mon–Sat 8:00 AM – 5:00 PM",
    officeDisplay: "Mon–Fri 8:00 AM – 4:00 PM",
    schema: [
      { day: "Monday", open: "08:00", close: "17:00" },
      { day: "Tuesday", open: "08:00", close: "17:00" },
      { day: "Wednesday", open: "08:00", close: "17:00" },
      { day: "Thursday", open: "08:00", close: "17:00" },
      { day: "Friday", open: "08:00", close: "17:00" },
      { day: "Saturday", open: "08:00", close: "17:00" },
    ],
  },
  stats: {
    yearsInBusiness: 25,
    projectsCompleted: 150,
    happyCustomers: 250,
    fiveStarReviews: 50,
    googleRating: 5.0,
    googleReviewCount: 42,
  },
  licenses: {
    njLicense: "02047",
    nyLicense: "{{TODO: NY contractor license number}}",
    njDep: "02047",
    epaAhera: "{{TODO: EPA AHERA certification number}}",
  },
  social: {
    google: "https://share.google/PgdwfEBKFF1q4wnlZ",
    googleReview: "https://www.google.com/search?hl=en-US&gl=us&q=True+Star+Contracting,+54+Hedden+Terrace,+North+Arlington,+NJ+07031&ludocid=15729902838892807638&lsig=AB86z5Xt08fPMQYLtIJ1cTfBQj9M#lrd=0x89c255444fb59d13:0xda4bd74a979d45d6,3",
    instagram: "https://www.instagram.com/truestarcontracting/",
    facebook: "{{TODO: Facebook URL}}",
  },
  url: "https://truestarcontracting.com",
  priceRange: "$$$",
} as const;

export type SiteConfig = typeof siteConfig;
