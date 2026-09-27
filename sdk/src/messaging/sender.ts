import type { CheckoutMessage } from "./protocol";

declare const CHECKOUT_APP_URL: string;
const CHECKOUT_ORIGIN = new URL(CHECKOUT_APP_URL).origin;

export function sendMessage(
  iframe: HTMLIFrameElement,
  message: CheckoutMessage,
) {
  iframe.contentWindow?.postMessage(message, CHECKOUT_ORIGIN);
}
