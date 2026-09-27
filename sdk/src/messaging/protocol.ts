export type CheckoutMessage =
  | {
      type: "CHECKOUT_INIT";
      productId: string;
    }
  | {
      type: "CHECKOUT_READY";
    }
  | {
      type: "PAYMENT_SUCCESS";
      sessionId: string;
    }
  | {
      type: "PAYMENT_ERROR";
      code: string;
      message: string;
    }
  | {
      type: "CHECKOUT_CLOSE";
      reason: string;
    };
