export type ChecklistItem = {
  id: string;
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
  resource?: string;
  resourceLabel?: string;
};

export type ChecklistCategory = {
  id: string;
  name: string;
  items: ChecklistItem[];
};

export const seoChecklist: ChecklistCategory[] = [
  {
    id: "gbp",
    name: "Google Business Profile",
    items: [
      {
        id: "gbp-1",
        title: "Claim and verify Google Business Profile",
        description: "Make sure the GBP listing is claimed and verified. This is the single highest-leverage SEO action for local search.",
        priority: "high",
        resource: "https://business.google.com",
        resourceLabel: "Google Business Profile",
      },
      {
        id: "gbp-2",
        title: "NAP matches website exactly",
        description: "Name, address, phone number on GBP must be byte-identical to what's on the website footer and contact page. Check character by character.",
        priority: "high",
      },
      {
        id: "gbp-3",
        title: "Add all 3 services to GBP",
        description: "Add Demolition, Asbestos Removal & Abatement, and Mold Remediation as services with descriptions.",
        priority: "high",
      },
      {
        id: "gbp-4",
        title: "Set service area to all 60 towns",
        description: "In GBP, add all 60 towns we serve as the service area. This helps with 'near me' searches in those towns.",
        priority: "high",
      },
      {
        id: "gbp-5",
        title: "Upload 10+ real job photos",
        description: "Add real before/after photos from actual jobs. Label them with the service type and town in the file name before uploading.",
        priority: "high",
      },
      {
        id: "gbp-6",
        title: "Post weekly updates to GBP",
        description: "Google rewards active GBP listings. Post a photo + 1-sentence update from a recent job each week. Town name + service in every post.",
        priority: "medium",
      },
      {
        id: "gbp-7",
        title: "Respond to all reviews within 48 hours",
        description: "Responding to reviews (positive and negative) is a ranking signal. Thank positive reviewers by name and mention the service/town.",
        priority: "high",
      },
      {
        id: "gbp-8",
        title: "Enable messaging on GBP",
        description: "Turn on GBP messaging so potential customers can contact you directly through Google.",
        priority: "medium",
      },
      {
        id: "gbp-9",
        title: "Add Q&A entries",
        description: "Seed the GBP Q&A section with the 8 most common questions from the website FAQ. Answer them yourself.",
        priority: "medium",
      },
    ],
  },
  {
    id: "citations",
    name: "Citations & Directory Listings",
    items: [
      {
        id: "cite-1",
        title: "List on Yelp",
        description: "Claim the Yelp listing and ensure NAP matches exactly.",
        priority: "high",
        resource: "https://biz.yelp.com",
        resourceLabel: "Yelp for Business",
      },
      {
        id: "cite-2",
        title: "List on Angi (formerly Angie's List)",
        description: "Claim and verify on Angi — a key lead source for contractors in NJ.",
        priority: "high",
        resource: "https://www.angi.com/pro",
        resourceLabel: "Angi for Pros",
      },
      {
        id: "cite-3",
        title: "List on HomeAdvisor",
        description: "Claim HomeAdvisor profile. Ensure NAP is identical to GBP.",
        priority: "high",
      },
      {
        id: "cite-4",
        title: "List on BBB",
        description: "Create or claim Better Business Bureau profile. NJ homeowners look here for contractor trust signals.",
        priority: "medium",
        resource: "https://www.bbb.org/us/nj",
        resourceLabel: "BBB New Jersey",
      },
      {
        id: "cite-5",
        title: "List on Houzz",
        description: "Create a Houzz profile — common discovery platform for homeowners planning renovations.",
        priority: "medium",
        resource: "https://www.houzz.com/for-professionals",
        resourceLabel: "Houzz for Pros",
      },
      {
        id: "cite-6",
        title: "List on Thumbtack",
        description: "Claim Thumbtack listing. Active platform for home services in North Jersey.",
        priority: "medium",
        resource: "https://www.thumbtack.com/pro",
        resourceLabel: "Thumbtack for Pros",
      },
      {
        id: "cite-7",
        title: "List on NJ contractor registries",
        description: "Ensure registration is visible on the NJ Division of Consumer Affairs contractor registry and any county-level registries in Bergen, Hudson, Essex.",
        priority: "high",
        resource: "https://www.njconsumeraffairs.gov/hic",
        resourceLabel: "NJ Consumer Affairs HIC Registry",
      },
      {
        id: "cite-8",
        title: "Apple Maps / Bing Places",
        description: "Claim listings on Apple Maps Connect and Bing Places for Business. These are secondary but worth 30 minutes each.",
        priority: "low",
      },
    ],
  },
  {
    id: "reviews",
    name: "Review Generation",
    items: [
      {
        id: "rev-1",
        title: "Request review at job completion",
        description: "After every completed job, text or email the customer a direct link to leave a Google review. Do this within 24 hours of project completion.",
        priority: "high",
      },
      {
        id: "rev-2",
        title: "Reach 50 Google reviews",
        description: "Currently at 42. Getting to 50 crosses a psychological trust threshold for many searchers. Focus review requests on completed jobs.",
        priority: "high",
      },
      {
        id: "rev-3",
        title: "Reach 100 Google reviews",
        description: "Long-term milestone: 100 reviews puts True Star ahead of nearly every competitor in this area.",
        priority: "medium",
      },
      {
        id: "rev-4",
        title: "Add Yelp review requests",
        description: "After building Google reviews, start including a Yelp link in follow-up messages to diversify the review footprint.",
        priority: "low",
      },
    ],
  },
  {
    id: "backlinks",
    name: "Backlinks & Local Authority",
    items: [
      {
        id: "link-1",
        title: "Get listed on local chamber of commerce sites",
        description: "Join and get listed on the Bergen County Chamber, Hudson County Chamber, and any relevant local business associations.",
        priority: "high",
      },
      {
        id: "link-2",
        title: "Get listed on local town websites",
        description: "Some NJ town websites list local contractors. Reach out to North Arlington, Kearny, Lyndhurst, and Belleville municipal sites.",
        priority: "medium",
      },
      {
        id: "link-3",
        title: "Supplier / vendor backlinks",
        description: "Ask suppliers (disposal facilities, equipment vendors) if they maintain contractor directories and request a listing.",
        priority: "medium",
      },
      {
        id: "link-4",
        title: "Local news / community mentions",
        description: "Submit a press release to NJ.com, The Record (Bergen County), and local patch.com sites when you complete a notable project.",
        priority: "low",
      },
    ],
  },
  {
    id: "maintenance",
    name: "Monthly Maintenance",
    items: [
      {
        id: "maint-1",
        title: "Add new completed project to gallery",
        description: "After each significant project, add photos to the website gallery with town + service caption. Fresh content signals to Google.",
        priority: "high",
      },
      {
        id: "maint-2",
        title: "Post on GBP weekly",
        description: "One post per week. Real job photo, service + town mentioned. 3–5 sentences max.",
        priority: "high",
      },
      {
        id: "maint-3",
        title: "Monitor Google Search Console monthly",
        description: "Check Search Console for new keyword opportunities, pages with declining impressions, and any coverage errors.",
        priority: "medium",
        resource: "https://search.google.com/search-console",
        resourceLabel: "Google Search Console",
      },
      {
        id: "maint-4",
        title: "Check Google Business Profile for Q&A and updates",
        description: "Users can add questions and suggest edits to your GBP. Review monthly and respond promptly.",
        priority: "medium",
      },
      {
        id: "maint-5",
        title: "Update reviews on website quarterly",
        description: "Pull new Google reviews into the reviews.ts file quarterly to keep the site's review count current.",
        priority: "low",
      },
    ],
  },
];
