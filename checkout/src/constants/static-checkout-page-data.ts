import { PaymentField } from "@/types/checkout-page-types";

export const paymentFields: PaymentField[] = [
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "you@example.com",
    autoComplete: "email",
  },
  {
    name: "cardNumber",
    label: "Card number",
    type: "text",
    placeholder: "1234 5678 9012 3456",
    autoComplete: "cc-number",
    len: 19,
  },

  {
    name: "cvv",
    label: "CVV",
    type: "text",
    placeholder: "123",
    autoComplete: "cc-csc",
    len: 3,
  },
] as const;

export const initialPaymentFormData = {
  email: "",
  cardNumber: "",
  expiryMonth: "",
  expiryYear: "",
  cvv: "",
} as const;
