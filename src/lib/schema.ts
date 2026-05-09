import { siteConfig } from "@/data/siteConfig";
import { towns } from "@/data/towns";
import type { Service, SubService } from "@/data/services";
import type { Town } from "@/data/towns";
import type { Review } from "@/data/reviews";

export function buildLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: siteConfig.name,
    url: siteConfig.url,
    telephone: siteConfig.phone.raw,
    email: siteConfig.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.city,
      addressRegion: siteConfig.address.state,
      postalCode: siteConfig.address.zip,
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.geo.lat,
      longitude: siteConfig.geo.lng,
    },
    openingHoursSpecification: siteConfig.hours.schema.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.day,
      opens: h.open,
      closes: h.close,
    })),
    priceRange: siteConfig.priceRange,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: siteConfig.stats.googleRating,
      reviewCount: siteConfig.stats.googleReviewCount,
      bestRating: 5,
      worstRating: 1,
    },
    areaServed: towns.map((t) => ({
      "@type": "Place",
      name: `${t.name}, NJ`,
      geo: {
        "@type": "GeoCoordinates",
        latitude: t.lat,
        longitude: t.lng,
      },
    })),
    serviceArea: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: siteConfig.geo.lat,
        longitude: siteConfig.geo.lng,
      },
      geoRadius: "48280", // 30 miles in meters
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Contracting Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Demolition",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Asbestos Removal & Abatement",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Mold Remediation",
          },
        },
      ],
    },
  };
}

export function buildServiceSchema(service: Service, town?: Town) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    serviceType: service.name,
    provider: {
      "@type": "LocalBusiness",
      name: siteConfig.name,
      telephone: siteConfig.phone.raw,
      url: siteConfig.url,
    },
    areaServed: town
      ? {
          "@type": "Place",
          name: `${town.name}, NJ`,
          geo: {
            "@type": "GeoCoordinates",
            latitude: town.lat,
            longitude: town.lng,
          },
          ...(town.zipCodes.length > 0 && {
            postalCode: town.zipCodes.join(", "),
          }),
        }
      : {
          "@type": "GeoCircle",
          geoMidpoint: {
            "@type": "GeoCoordinates",
            latitude: siteConfig.geo.lat,
            longitude: siteConfig.geo.lng,
          },
          geoRadius: "48280",
        },
    description: service.shortDescription,
    url: town
      ? `${siteConfig.url}/service-areas/${town.slug}/${service.slug}`
      : `${siteConfig.url}/services/${service.slug}`,
  };
}

export function buildFaqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function buildReviewsSchema(reviews: Review[]) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: siteConfig.name,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: siteConfig.stats.googleRating,
      reviewCount: siteConfig.stats.googleReviewCount,
      bestRating: 5,
      worstRating: 1,
    },
    review: reviews.map((r) => ({
      "@type": "Review",
      author: { "@type": "Person", name: r.author },
      datePublished: r.date,
      reviewRating: {
        "@type": "Rating",
        ratingValue: r.rating,
        bestRating: 5,
        worstRating: 1,
      },
      reviewBody: r.body,
    })),
  };
}

export function buildSubServiceSchema(sub: SubService) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: sub.name,
    serviceType: sub.name,
    provider: {
      "@type": "LocalBusiness",
      name: siteConfig.name,
      telephone: siteConfig.phone.raw,
      url: siteConfig.url,
    },
    description: sub.longDescription,
    areaServed: towns.map((t) => ({
      "@type": "Place",
      name: `${t.name}, NJ`,
    })),
    url: `${siteConfig.url}/services/${sub.parentSlug}/${sub.slug}`,
  };
}

export function buildBreadcrumbSchema(
  crumbs: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.name,
      item: `${siteConfig.url}${crumb.url}`,
    })),
  };
}
