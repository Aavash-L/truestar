"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Phone, CheckCircle } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";
import { services } from "@/data/services";
import { towns } from "@/data/towns";
import { AddressAutocomplete } from "@/components/AddressAutocomplete";
import { formatPhone, suggestEmail } from "@/lib/phoneFormat";
import { trackEvent } from "@/lib/gtag";

const schema = z.object({
  name: z.string().min(2, "Name is required"),
  phone: z.string().min(14, "Enter a complete 10-digit phone number"),
  email: z.string().email("Enter a valid email address"),
  service: z.string().min(1, "Please select a service"),
  town: z.string().min(1, "Please select your town"),
  message: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

export function EstimateForm() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [address, setAddress] = useState("");
  const [addressError, setAddressError] = useState<string | null>(null);
  const [emailSuggestion, setEmailSuggestion] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const handleTownDetected = (city: string) => {
    const normalized = city.toLowerCase().trim();
    const match = towns.find(
      (t) => t.name.toLowerCase() === normalized || t.slug === normalized.replace(/\s+/g, "-")
    );
    if (match) setValue("town", match.slug, { shouldValidate: true });
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value);
    setValue("phone", formatted, { shouldValidate: false });
  };

  const handleEmailBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setEmailSuggestion(suggestEmail(e.target.value));
  };

  const applyEmailSuggestion = () => {
    if (!emailSuggestion) return;
    setValue("email", emailSuggestion, { shouldValidate: true });
    setEmailSuggestion(null);
  };

  const onSubmit = async (data: FormValues) => {
    setError(null);
    if (!address.trim()) {
      setAddressError("Property address is required");
      return;
    }
    setAddressError(null);
    try {
      const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
      const recaptchaToken = siteKey
        ? await new Promise<string>((resolve, reject) => {
            window.grecaptcha.ready(() => {
              window.grecaptcha.execute(siteKey, { action: "submit" }).then(resolve, reject);
            });
          })
        : undefined;

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, address, recaptchaToken }),
      });
      if (!res.ok) throw new Error("Failed to submit");
      trackEvent("generate_lead");
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please call us directly at " + siteConfig.phone.display);
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-12">
        <CheckCircle size={48} className="text-green-600 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-[var(--ink)] mb-2">Request received.</h3>
        <p className="text-[var(--muted)]">We'll be in touch within 24 hours. Or call us now:</p>
        <a href={siteConfig.phone.href} className="inline-flex items-center gap-2 mt-4 text-[var(--brand-red)] font-bold text-lg">
          <Phone size={20} />
          {siteConfig.phone.display}
        </a>
      </div>
    );
  }

  const inputClass =
    "w-full border border-[var(--line)] bg-white px-4 py-3 text-sm text-[var(--ink)] focus:outline-none focus:border-[var(--ink)] transition-colors";
  const labelClass = "block text-xs font-semibold text-[var(--ink)] uppercase tracking-wide mb-1.5";
  const errorClass = "text-[var(--brand-red)] text-xs mt-1";

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="name" className={labelClass}>Full Name *</label>
          <input id="name" type="text" autoComplete="name" className={inputClass} {...register("name")} />
          {errors.name && <p className={errorClass}>{errors.name.message}</p>}
        </div>
        <div>
          <label htmlFor="phone" className={labelClass}>Phone Number *</label>
          <input
            id="phone"
            type="tel"
            autoComplete="tel"
            placeholder="(201) 555-0100"
            className={inputClass}
            {...register("phone")}
            onChange={handlePhoneChange}
            value={watch("phone") ?? ""}
          />
          {errors.phone && <p className={errorClass}>{errors.phone.message}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="email" className={labelClass}>Email Address *</label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          className={inputClass}
          {...register("email")}
          onBlur={handleEmailBlur}
          onChange={(e) => { register("email").onChange(e); setEmailSuggestion(null); }}
        />
        {emailSuggestion && (
          <p className="text-xs mt-1 text-[var(--muted)]">
            Did you mean{" "}
            <button type="button" onClick={applyEmailSuggestion} className="text-[var(--brand-red)] font-semibold underline">
              {emailSuggestion}
            </button>
            ?
          </p>
        )}
        {errors.email && !emailSuggestion && <p className={errorClass}>{errors.email.message}</p>}
      </div>

      <div>
        <label className={labelClass}>Property Address *</label>
        <AddressAutocomplete
          value={address}
          onChange={(v) => { setAddress(v); if (v.trim()) setAddressError(null); }}
          onTownDetected={handleTownDetected}
          className={inputClass}
        />
        {addressError && <p className={errorClass}>{addressError}</p>}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="service" className={labelClass}>Service Needed *</label>
          <select id="service" className={inputClass} {...register("service")}>
            <option value="">Select a service</option>
            {services.map((s) => (
              <option key={s.slug} value={s.slug}>{s.name}</option>
            ))}
            <option value="multiple">Multiple services</option>
            <option value="not-sure">Not sure</option>
          </select>
          {errors.service && <p className={errorClass}>{errors.service.message}</p>}
        </div>
        <div>
          <label htmlFor="town" className={labelClass}>Your Town *</label>
          <select id="town" className={inputClass} {...register("town")}>
            <option value="">Select your town</option>
            {towns.map((t) => (
              <option key={t.slug} value={t.slug}>{t.name}, {t.county} County</option>
            ))}
            <option value="other">Other / not listed</option>
          </select>
          {errors.town && <p className={errorClass}>{errors.town.message}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>Project Details (optional)</label>
        <textarea
          id="message"
          rows={4}
          className={inputClass}
          placeholder="Briefly describe the project — what material, what scope, any timeline constraints..."
          {...register("message")}
        />
      </div>

      {error && (
        <div className="bg-red-50 border border-[var(--brand-red)] text-[var(--brand-red)] px-4 py-3 text-sm">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-[var(--brand-red)] text-white py-4 font-bold text-base hover:bg-red-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Sending..." : "Request a Site Visit"}
      </button>

      <p className="text-xs text-[var(--muted)] text-center">
        By submitting this form, you agree to be contacted by True Star Contracting LLC regarding your estimate request.
      </p>
    </form>
  );
}
