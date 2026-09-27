import type { CheckoutMessage } from "./protocol";

export function isCheckoutMessage(data: unknown): data is CheckoutMessage {
  if (!data || typeof data !== "object") {
    return false;
  }

  const message = data as Record<string, unknown>;

  switch (message.type) {
    case "CHECKOUT_READY":
      return true;

    case "PAYMENT_SUCCESS":
      return typeof message.sessionId === "string";

    case "PAYMENT_ERROR":
      return (
        typeof message.code === "string" && typeof message.message === "string"
      );

    case "CHECKOUT_CLOSE":
      return typeof message.reason === "string";

    default:
      return false;
  }
}
