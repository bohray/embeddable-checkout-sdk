"use client";

import {
  initialPaymentFormData,
  paymentFields,
} from "@/constants/static-checkout-page-data";
import { formatCardNumber } from "@/lib/cardFormatter";
import { FormErrors, validatePaymentForm } from "@/lib/validation";
import { PaymentFormData, PaymentFormProps } from "@/types/checkout-page-types";
import { useEffect, useState } from "react";
import DateSelect from "./DateSelect";

export default function PaymentForm({
  onSubmit,
  disabled = false,
  resetKey,
}: PaymentFormProps) {
  const [formData, setFormData] = useState<PaymentFormData>(
    initialPaymentFormData,
  );
  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    setFormData(initialPaymentFormData);
    setErrors({});
  }, [resetKey]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    let formattedValue = value;

    if (name === "cardNumber") {
      formattedValue = formatCardNumber(value);
    }

    if (name === "cvv") {
      formattedValue = value.replace(/\D/g, "").slice(0, 3);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: formattedValue,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: undefined,
    }));
  };

  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validatedErros = validatePaymentForm(formData);

    if (Object.keys(validatedErros).length > 0) {
      setErrors(validatedErros);
      return;
    }

    setErrors({});

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="mt-4">
      <h2 className="text-lg font-semibold border-b border-gray-300 py-1 mb-4">
        Payment Details
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {paymentFields.map(
          ({ label, name, type, placeholder, autoComplete, len }) => (
            <div key={name} className="flex flex-col">
              <label
                htmlFor={name}
                className="mb-1.5 text-sm font-medium text-gray-700"
              >
                {label}
              </label>

              <input
                id={name}
                name={name}
                type={type}
                placeholder={placeholder}
                autoComplete={autoComplete}
                value={formData[name] ?? ""}
                onChange={handleChange}
                minLength={len}
                maxLength={len}
                disabled={disabled}
                className={`rounded-xl border px-3 py-2.5 outline-none transition-colors duration-200 disabled:cursor-not-allowed ${
                  errors[name]
                    ? "border-red-500 focus:border-red-500"
                    : "border-gray-200 focus:border-sky-500"
                }`}
              />

              <p className="mt-0.5 min-h-4 text-sm text-red-500">
                {errors[name] || "\u00A0"}
              </p>
            </div>
          ),
        )}

        <DateSelect
          month={formData.expiryMonth}
          year={formData.expiryYear}
          monthError={errors.expiryMonth}
          yearError={errors.expiryYear}
          disabled={disabled}
          onChange={(field, value) => {
            setFormData((prev) => ({
              ...prev,
              [field]: value,
            }));

            setErrors((prev) => ({
              ...prev,
              [field]: undefined,
            }));
          }}
        />
      </div>

      <button
        type="submit"
        disabled={disabled}
        className="mt-6 w-full rounded-lg bg-sky-500 px-4 py-3 font-medium text-white transition-all duration-250 ease-in-out hover:bg-sky-600 enabled:cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 active:scale-[0.98]"
      >
        {disabled ? "Processing..." : "Make Payment"}
      </button>
    </form>
  );
}
