"use client";
import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowRight, Phone, CheckCircle } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";

// ── Service lists ─────────────────────────────────────────────────────────────

const RESIDENTIAL_TYPES = [
  "Junk Removal & Household Cleanouts",
  "Bathroom Demolition",
  "Shed/Outbuilding Demolition",
  "Kitchen Demolition",
  "Fireplace/Hearth Removal",
  "Chimney Demolition",
  "Full House Teardown",
  "Interior Home Gut & Strip-Out",
  "Garage Demolition",
  "Deck & Porch Demolition",
  "Siding Removal",
  "Interior Wall Removal",
  "Flooring Removal",
  "Concrete Cutting & Demolition",
];

const COMMERCIAL_TYPES = [
  "Interior Selective Demolition",
  "Full Interior Gut-Out Demolition",
  "Concrete Slab Removal",
  "Concrete Cutting & Core Drilling",
  "Commercial Roof Removal",
  "Wall Partition Demolition",
  "Commercial Bathroom Demolition",
  "Commercial Kitchen Demolition",
  "Drop Ceiling Removal",
  "Mechanical/HVAC System Removal",
  "Fire-Damaged Building Demolition",
  "Commercial Floor Removal",
  "Exterior Building Demolition",
  "Commercial Site Clearing & Grading",
];

const SPECIALTY_TYPES = [
  "Asbestos Removal",
  "Asbestos Inspection",
  "Asbestos Abatement",
  "Mold Remediation",
  "Mold Testing & Inspection",
];

type Category = "residential" | "commercial" | "specialty" | "other";

const SERVICE_TYPES: Record<Exclude<Category, "other">, string[]> = {
  residential: RESIDENTIAL_TYPES,
  commercial: COMMERCIAL_TYPES,
  specialty: SPECIALTY_TYPES,
};

// ── Prefill map (slug → category + type) ──────────────────────────────────────

type Prefill = { category: Category; type: string };

const PREFILL_MAP: Record<string, Prefill> = {
  // Main services
  "asbestos-removal": { category: "specialty", type: "Asbestos Removal" },
  "mold-remediation": { category: "specialty", type: "Mold Remediation" },
  // Residential demolition sub-services
  "garage-demolition":   { category: "residential", type: "Garage Demolition" },
  "kitchen-demolition":  { category: "residential", type: "Kitchen Demolition" },
  "bathroom-demolition": { category: "residential", type: "Bathroom Demolition" },
  "house-teardown":      { category: "residential", type: "Full House Teardown" },
  "concrete-cutting":    { category: "residential", type: "Concrete Cutting & Demolition" },
};

// ── Zod schema ────────────────────────────────────────────────────────────────

const schema = z.object({
  name: z.string().min(2, "Full name is required"),
  phone: z
    .string()
    .regex(/^\(\d{3}\) \d{3}-\d{4}$/, "Valid US phone required"),
  email: z.string().email("Valid email required"),
  address: z.string().min(5, "Property address is required"),
  category: z.enum(["residential", "commercial", "specialty", "other"]),
  serviceType: z.string().min(1, "Please select or describe a service type"),
  notes: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

// ── Helpers ───────────────────────────────────────────────────────────────────

function formatPhone(raw: string): string {
  const digits = raw.replace(/\D/g, "").slice(0, 10);
  if (digits.length === 10) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  }
  return raw;
}

// ── Component ─────────────────────────────────────────────────────────────────

interface Props {
  prefillService?: string;
}

export function QuoteSidebar({ prefillService }: Props) {
  const prefill = prefillService ? PREFILL_MAP[prefillService] : undefined;

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      address: "",
      category: prefill?.category ?? ("" as Category),
      serviceType: prefill?.type ?? "",
      notes: "",
    },
  });

  const [submitted, setSubmitted] = useState(false);
  const [submittedName, setSubmittedName] = useState("");
  const [submittedType, setSubmittedType] = useState("");
  const [submitError, setSubmitError] = useState<string | null>(null);

  const category = watch("category") as Category | "";

  // Reset serviceType when category changes (but only if the new category
  // doesn't match the prefill, so prefill still works on first render)
  const [prevCategory, setPrevCategory] = useState<Category | "">(
    prefill?.category ?? ""
  );
  useEffect(() => {
    if (category !== prevCategory) {
      setValue("serviceType", "");
      setPrevCategory(category);
    }
  }, [category, prevCategory, setValue]);

  const onSubmit = async (data: FormValues) => {
    setSubmitError(null);
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!json.ok) throw new Error(json.error ?? "Failed");
      setSubmittedName(data.name.split(" ")[0]);
      setSubmittedType(data.serviceType);
      setSubmitted(true);
    } catch {
      setSubmitError("Something went wrong. Please call us directly.");
    }
  };

  const inputClass =
    "w-full border border-[var(--line)] bg-white px-3 py-2.5 text-sm text-[var(--ink)] focus:outline-none focus:border-[var(--ink)] transition-colors placeholder:text-[var(--muted)]";

  const errorClass = "text-[var(--brand-red)] text-xs mt-1";

  return (
    <div
      className="border border-[var(--line)] rounded-lg overflow-hidden"
      style={{ background: "white" }}
    >
      {/* Header */}
      <div
        className="px-5 py-4"
        style={{ background: "var(--brand-red)" }}
      >
        <p className="text-white font-semibold text-lg leading-tight">
          Get A Free Quote
        </p>
        <p className="text-white/80 text-sm mt-0.5">
          Response within 24 hours
        </p>
      </div>

      {/* Body */}
      <div className="p-5">
        {submitted ? (
          <div className="border border-green-200 bg-green-50 rounded-lg p-4 text-sm text-green-800 leading-relaxed">
            <CheckCircle size={20} className="text-green-600 mb-2" />
            <strong>Thanks, {submittedName}!</strong> We&apos;ll call you back
            within 24 hours to discuss your{" "}
            {submittedType ? `${submittedType} ` : ""}project.
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-3">
            {/* Name */}
            <div>
              <input
                type="text"
                placeholder="Full Name *"
                autoComplete="name"
                className={inputClass}
                {...register("name")}
              />
              {errors.name && (
                <p className={errorClass}>{errors.name.message}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="tel"
                    placeholder="Phone *"
                    autoComplete="tel"
                    className={inputClass}
                    onBlur={(e) => {
                      field.onBlur();
                      field.onChange(formatPhone(e.target.value));
                    }}
                  />
                )}
              />
              {errors.phone && (
                <p className={errorClass}>{errors.phone.message}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <input
                type="email"
                placeholder="Email *"
                autoComplete="email"
                className={inputClass}
                {...register("email")}
              />
              {errors.email && (
                <p className={errorClass}>{errors.email.message}</p>
              )}
            </div>

            {/* Address */}
            <div>
              <input
                type="text"
                placeholder="Property Address *"
                autoComplete="street-address"
                className={inputClass}
                {...register("address")}
              />
              {errors.address && (
                <p className={errorClass}>{errors.address.message}</p>
              )}
            </div>

            {/* Service Category */}
            <div>
              <select className={inputClass} {...register("category")}>
                <option value="">Select Service Category</option>
                <option value="residential">Residential</option>
                <option value="commercial">Commercial</option>
                <option value="specialty">Specialty (Asbestos &amp; Mold)</option>
                <option value="other">Other</option>
              </select>
              {errors.category && (
                <p className={errorClass}>{errors.category.message}</p>
              )}
            </div>

            {/* Service Type — conditional on category */}
            {category && category !== "other" && (
              <div>
                <select className={inputClass} {...register("serviceType")}>
                  <option value="">Select Service Type</option>
                  {SERVICE_TYPES[category].map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
                {errors.serviceType && (
                  <p className={errorClass}>{errors.serviceType.message}</p>
                )}
              </div>
            )}

            {category === "other" && (
              <div>
                <input
                  type="text"
                  placeholder="Describe your project *"
                  className={inputClass}
                  {...register("serviceType")}
                />
                {errors.serviceType && (
                  <p className={errorClass}>{errors.serviceType.message}</p>
                )}
              </div>
            )}

            {/* Notes */}
            <div>
              <textarea
                rows={3}
                placeholder="Anything else we should know? (Optional)"
                className={`${inputClass} resize-none`}
                {...register("notes")}
              />
            </div>

            {submitError && (
              <p className="text-[var(--brand-red)] text-sm">{submitError}</p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 bg-[var(--brand-red)] text-white py-3.5 text-sm font-bold hover:bg-red-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Sending…" : "Get My Free Estimate"}
              {!isSubmitting && <ArrowRight size={15} />}
            </button>

            {/* Secondary call action */}
            <div className="flex items-center gap-3 pt-1">
              <div className="flex-1 h-px bg-[var(--line)]" />
              <span className="text-xs text-[var(--muted)]">or</span>
              <div className="flex-1 h-px bg-[var(--line)]" />
            </div>
            <a
              href={siteConfig.phone.href}
              className="w-full flex items-center justify-center gap-2 border border-[var(--ink)] text-[var(--ink)] py-3 text-sm font-semibold hover:bg-[var(--paper-2)] transition-colors"
            >
              <Phone size={15} />
              Call {siteConfig.phone.display}
            </a>
          </form>
        )}
      </div>
    </div>
  );
}
