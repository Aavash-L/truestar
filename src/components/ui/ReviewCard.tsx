import type { Review } from "@/data/reviews";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill={i < rating ? "#DC2626" : "#E4E4E7"}>
          <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
        </svg>
      ))}
    </div>
  );
}

export function ReviewCard({ review }: { review: Review }) {
  const date = new Date(review.date).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <article className="bg-[var(--paper)] border border-[var(--line)] p-6">
      <div className="flex items-start justify-between gap-2 mb-3">
        <div>
          <div className="font-semibold text-[var(--ink)] text-sm">{review.author}</div>
          <div className="text-xs text-[var(--muted)] mt-0.5">{date}</div>
        </div>
        <StarRating rating={review.rating} />
      </div>
      <p className="text-sm text-[var(--ink)] leading-relaxed">{review.body}</p>
    </article>
  );
}
