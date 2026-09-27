import { createCheckoutIframe } from "./iframe/manager";
import { listenForMessages } from "./messaging/listener";
import { sendMessage } from "./messaging/sender";
import type { CheckoutConfig } from "./types/checkout";

type CheckoutState = "closed" | "opening" | "open";
let checkoutIframe: HTMLIFrameElement | null = null;
let stopListening: (() => void) | null = null;
let checkoutState: CheckoutState = "closed";
let readyTimeout: ReturnType<typeof setTimeout> | null = null;
declare global {
  interface Window {
    CheckoutSDK: typeof CheckoutSDK;
  }
}

const CheckoutSDK = {
  open(config: CheckoutConfig) {
    if (!config.productId?.trim()) {
      config.onError?.({
        code: "INVALID_CONFIG",
        message: "productId is required.",
      });

      return;
    }

    if (checkoutState !== "closed") {
      config.onError?.({
        code: "CHECKOUT_ALREADY_OPEN",
        message: "A checkout is already open.",
      });

      return;
    }

    console.log("Opening Checkout for:", config.productId);

    checkoutState = "opening";
    checkoutIframe = createCheckoutIframe();

    stopListening = listenForMessages(checkoutIframe, (message) => {
      switch (message.type) {
        case "CHECKOUT_READY":
          console.log("Checkout is ready");

          if (!checkoutIframe) return;

          checkoutState = "open";

          if (readyTimeout) {
            clearTimeout(readyTimeout);
            readyTimeout = null;
          }

          sendMessage(checkoutIframe, {
            type: "CHECKOUT_INIT",
            productId: config.productId,
          });
          break;
        case "PAYMENT_SUCCESS":
          config.onSuccess?.({
            sessionId: message.sessionId,
          });
          break;
        case "PAYMENT_ERROR":
          config.onError?.({
            code: message.code,
            message: message.message,
          });
          break;
        case "CHECKOUT_CLOSE":
          config.onClose?.({
            reason: message.reason,
          });

          CheckoutSDK.close();
          break;
      }
    });

    document.body.appendChild(checkoutIframe);

    readyTimeout = setTimeout(() => {
      if (checkoutState !== "opening") return;

      console.error("Checkout failed to initialize");

      config.onError?.({
        code: "CHECKOUT_TIMEOUT",
        message: "Checkout failed to initialize",
      });

      CheckoutSDK.close();
    }, 10000);
  },

  close() {
    console.log("Closing checkout");

    if (readyTimeout) {
      clearTimeout(readyTimeout);
      readyTimeout = null;
    }

    stopListening?.();
    stopListening = null;

    checkoutIframe?.remove();
    checkoutIframe = null;
    checkoutState = "closed";
  },
};

export default CheckoutSDK;

if (typeof window !== "undefined") {
  window.CheckoutSDK = CheckoutSDK;
}
