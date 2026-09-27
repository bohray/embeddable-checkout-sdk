import type { PaymentFormData } from "@/types/checkout-page-types";

export type FormErrors = Partial<Record<keyof PaymentFormData, string>>;

export const validatePaymentForm = (formData: PaymentFormData): FormErrors => {
  const errors: FormErrors = {};

  //Email Validation
  if (!formData.email.trim()) {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    errors.email = "Enter a valid email address";
  }

  //Card Number Validation
  const cardNumber = formData.cardNumber.replace(/\s/g, "");

  if (!cardNumber) {
    errors.cardNumber = "Card number is required";
  } else if (cardNumber.length !== 16)
    errors.cardNumber = "Card number must be 16 digits";
  else if (!/^\d{16}$/.test(cardNumber))
    errors.cardNumber = "Enter a valid 16-digit card number";

  //Expiry Details Validation
  if (!formData.expiryMonth) {
    errors.expiryMonth = "Expiry month is required";
  }

  if (!formData.expiryYear) {
    errors.expiryYear = "Expiry year is required";
  }

  if (formData.expiryMonth && formData.expiryYear) {
    const expiryMonth = Number(formData.expiryMonth);
    const expiryYear = Number(formData.expiryYear);

    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();

    if (
      expiryYear < currentYear ||
      (expiryYear === currentYear && expiryMonth < currentMonth)
    ) {
      errors.expiryMonth = "Card has expired";
    }
  }

  //cvv validation
  if (!formData.cvv.trim()) {
    errors.cvv = "CVV is required";
  } else if (!/^\d{3}$/.test(formData.cvv)) {
    errors.cvv = "CVV must be 3 digits";
  }

  return errors;
};
