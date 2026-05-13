"use client";
import { useState, useRef, useEffect } from "react";
import { MapPin } from "lucide-react";

interface NominatimResult {
  place_id: number;
  display_name: string;
  address: {
    house_number?: string;
    road?: string;
    city?: string;
    town?: string;
    village?: string;
    suburb?: string;
    state?: string;
    postcode?: string;
  };
}

function formatAddress(r: NominatimResult): string {
  const a = r.address;
  const street = [a.house_number, a.road].filter(Boolean).join(" ");
  const city = a.city || a.town || a.village || a.suburb || "";
  const parts = [street, city, a.state, a.postcode].filter(Boolean);
  return parts.join(", ");
}

interface Props {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function AddressAutocomplete({ value, onChange, className }: Props) {
  const [suggestions, setSuggestions] = useState<NominatimResult[]>([]);
  const [open, setOpen] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const fetchSuggestions = async (query: string) => {
    if (query.length < 4) { setSuggestions([]); setOpen(false); return; }
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&addressdetails=1&limit=6&countrycodes=us`,
        { headers: { "Accept-Language": "en-US" } }
      );
      const data: NominatimResult[] = await res.json();
      setSuggestions(data);
      setOpen(data.length > 0);
    } catch {
      setSuggestions([]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => fetchSuggestions(e.target.value), 350);
  };

  const select = (r: NominatimResult) => {
    onChange(formatAddress(r));
    setSuggestions([]);
    setOpen(false);
  };

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <input
        type="text"
        value={value}
        onChange={handleChange}
        onFocus={() => suggestions.length > 0 && setOpen(true)}
        placeholder="Start typing your property address..."
        autoComplete="off"
        className={className}
      />
      {open && (
        <ul className="absolute z-50 w-full bg-white border border-[var(--line)] shadow-lg mt-0.5 max-h-64 overflow-y-auto">
          {suggestions.map((s) => (
            <li key={s.place_id}>
              <button
                type="button"
                onClick={() => select(s)}
                className="w-full flex items-start gap-3 px-4 py-3 text-sm text-left text-[var(--ink)] hover:bg-[var(--paper-2)] border-b border-[var(--line)] last:border-0"
              >
                <MapPin size={14} className="text-[var(--muted)] mt-0.5 flex-shrink-0" />
                <span className="line-clamp-2">{s.display_name}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
