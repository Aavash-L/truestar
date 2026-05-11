import type { Metadata } from "next";
import Link from "next/link";
import { Star } from "lucide-react";
import { reviews } from "@/data/reviews";
import { siteConfig } from "@/data/siteConfig";
import { ReviewCard } from "@/components/ui/ReviewCard";
import { buildReviewsSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Customer Reviews | True Star Contracting LLC",
  description:
    "5.0 stars across 42 Google reviews. Read what North Jersey homeowners and property managers say about True Star Contracting's demolition, asbestos removal, and mold remediation work.",
  alternates: { canonical: "/reviews" },
};

export default function ReviewsPage() {
  const reviewSchema = buildReviewsSchema(reviews);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }} />

      <section className="bg-[var(--ink)] py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-display font-extrabold text-white mb-4" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}>
            Customer Reviews
          </h1>
          <a
            href={siteConfig.social.google}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 text-white/80 hover:text-white transition-colors w-fit"
          >
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={20} className="text-yellow-400 fill-yellow-400" />
              ))}
            </div>
            <span className="text-2xl font-bold text-white">{siteConfig.stats.googleRating}</span>
            <span>· {siteConfig.stats.googleReviewCount} reviews on Google ↗</span>
          </a>
        </div>
      </section>

      <section className="bg-[var(--paper)] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>

          <div className="text-center border-t border-[var(--line)] pt-12">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={siteConfig.social.google}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[var(--ink)] text-white px-6 py-3 font-semibold hover:bg-[var(--brand-red)] transition-colors"
              >
                <Star size={16} />
                See Our Reviews on Google
              </a>
              <p className="text-[var(--muted)] text-sm sm:border-l sm:border-[var(--line)] sm:pl-4">
                Had a great experience?{" "}
                <a
                  href={siteConfig.social.google}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-[var(--brand-red)] hover:underline"
                >
                  Leave us a review
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
