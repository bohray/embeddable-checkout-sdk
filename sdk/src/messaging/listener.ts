import type { CheckoutMessage } from "./protocol";
import { isCheckoutMessage } from "./validator";

declare const CHECKOUT_APP_URL: string;
const CHECKOUT_ORIGIN = new URL(CHECKOUT_APP_URL).origin;

export function listenForMessages(
  iframe: HTMLIFrameElement,
  handler: (message: CheckoutMessage) => void,
) {
  const listener = (event: MessageEvent) => {
    if (event.origin !== CHECKOUT_ORIGIN) return;
    if (event.source !== iframe.contentWindow) return;

    if (!isCheckoutMessage(event.data)) return;

    handler(event.data);
  };

  window.addEventListener("message", listener);

  return () => {
    window.removeEventListener("message", listener);
  };
}
