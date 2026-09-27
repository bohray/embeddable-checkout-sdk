import { useCallback, useEffect } from "react";
import type {
  CloseReason,
  UseCheckoutMessagingProps,
} from "@/types/checkout-page-types";

const PARENT_ORIGIN =
  process.env.NEXT_PUBLIC_MERCHANT_ORIGIN || "http://localhost:5173";

export function useCheckoutMessaging({
  onProductRequest,
  paymentState,
}: UseCheckoutMessagingProps) {
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== PARENT_ORIGIN) return;
      if (event.source !== window.parent) return;

      if (event.data?.type !== "CHECKOUT_INIT") {
        return;
      }

      if (typeof event.data.productId !== "string") {
        return;
      }

      onProductRequest(event.data.productId);
    };

    window.addEventListener("message", handleMessage);

    window.parent.postMessage(
      {
        type: "CHECKOUT_READY",
      },
      PARENT_ORIGIN,
    );

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [onProductRequest]);

  useEffect(() => {
    if (paymentState.status === "success") {
      window.parent.postMessage(
        {
          type: "PAYMENT_SUCCESS",
          sessionId: paymentState.sessionId,
        },
        PARENT_ORIGIN,
      );
    }

    if (paymentState.status === "error") {
      window.parent.postMessage(
        {
          type: "PAYMENT_ERROR",
          code: paymentState.code,
          message: paymentState.message,
        },
        PARENT_ORIGIN,
      );
    }
  }, [paymentState]);

  const handleClose = useCallback((reason: CloseReason = "user_closed") => {
    window.parent.postMessage(
      {
        type: "CHECKOUT_CLOSE",
        reason,
      },
      PARENT_ORIGIN,
    );
  }, []);

  return {
    handleClose,
  };
}
