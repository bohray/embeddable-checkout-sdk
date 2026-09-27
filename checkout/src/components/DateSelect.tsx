import { DateSelectProps } from "@/types/checkout-page-types";

const months = Array.from({ length: 12 }, (_, index) =>
  String(index + 1).padStart(2, "0"),
);

const currentYear = new Date().getFullYear();

const years = Array.from({ length: 10 }, (_, index) =>
  String(currentYear + index),
);

export default function DateSelect({
  month,
  year,
  monthError,
  yearError,
  disabled,
  onChange,
}: DateSelectProps) {
  const dropdowns = [
    {
      name: "expiryMonth" as const,
      value: month,
      placeholder: "MM",
      options: months,
      error: monthError,
    },
    {
      name: "expiryYear" as const,
      value: year,
      placeholder: "YYYY",
      options: years,
      error: yearError,
    },
  ];

  const error = monthError || yearError;

  return (
    <div className="flex flex-col">
      <label className="mb-1.5 text-sm font-medium text-gray-700">Expiry</label>

      <div className="flex gap-2">
        {dropdowns.map(({ name, value, placeholder, options }) => (
          <select
            key={name}
            value={value ?? ""}
            disabled={disabled}
            onChange={(event) => onChange(name, event.target.value)}
            className={`w-full rounded-xl border bg-white px-3 py-3 outline-none transition-colors duration-200 disabled:cursor-not-allowed ${
              error
                ? "border-red-500 focus:border-red-500"
                : "border-gray-200 focus:border-sky-500"
            }`}
          >
            <option value="" disabled hidden>
              {placeholder}
            </option>

            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        ))}
      </div>

      <p className="mt-0.2 min-h-4 text-sm text-red-500">{error || "\u00A0"}</p>
    </div>
  );
}
