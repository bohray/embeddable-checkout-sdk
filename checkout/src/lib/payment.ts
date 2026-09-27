import { PaymentResult } from "@/types/checkout-page-types";

let failedOnce = false;

export async function processPayment(
  cardNumber: string,
): Promise<PaymentResult> {
  await new Promise((resolve) => setTimeout(resolve, 1500));

  const normalizedCardNumber = cardNumber.replace(/\s/g, "");

  switch (normalizedCardNumber) {
    case "4242424242424242":
      return {
        status: "success",
        sessionId: `sess_${Date.now()}`,
      };

    case "4000000000000002":
      return {
        status: "error",
        code: "CARD_DECLINED",
        message: "Your card was declined.",
      };

    case "4000000000000341":
      if (!failedOnce) {
        failedOnce = true;

        return {
          status: "error",
          code: "PAYMENT_FAILED",
          message: "Payment failed. Please try again.",
        };
      }

      return {
        status: "success",
        sessionId: `sess_${Date.now()}`,
      };

    default:
      return {
        status: "error",
        code: "INVALID_CARD",
        message: "Invalid test card.",
      };
  }
}
