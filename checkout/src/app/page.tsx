"use client";

import CheckoutResultScreen from "@/components/CheckoutResultScreen";
import ProductSummarySkeleton from "@/components/Loader/ProductSummarySkeleton";
import PaymentForm from "@/components/PaymentForm";
import ProductSummary from "@/components/ProductSummary";
import { useCheckoutMessaging } from "@/hooks/useCheckoutMessaging";
import { processPayment } from "@/lib/payment";
import { getProduct } from "@/lib/products";
import {
  PaymentFormData,
  PaymentState,
  Product,
} from "@/types/checkout-page-types";
import { useCallback, useEffect, useState } from "react";

export default function CheckoutPage() {
  const [product, setProduct] = useState<Product | null>(null);
  const [paymentState, setPaymentState] = useState<PaymentState>({
    status: "idle",
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [formResetKey, setFormResetKey] = useState(0);

  const paymentStatus = paymentState.status;

  const handleProductRequest = useCallback(async (productId: string) => {
    setLoading(true);
    setProduct(null);

    try {
      const productData = await getProduct(productId);

      setProduct(productData);
    } catch (error) {
      console.error("Failed to fetch product:", error);
      setProduct(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const { handleClose } = useCheckoutMessaging({
    onProductRequest: handleProductRequest,
    paymentState,
  });

  useEffect(() => {
    if (paymentStatus !== "success") {
      return;
    }

    const timer = setTimeout(() => {
      handleClose("auto_closed");
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [paymentStatus, handleClose]);

  const handlePaymentSubmit = async (data: PaymentFormData) => {
    setPaymentState({
      status: "processing",
    });

    try {
      const result = await processPayment(data.cardNumber);

      if (result.status === "success") {
        setPaymentState({
          status: "success",
          message: "Payment successful!",
          sessionId: result.sessionId,
        });

        return;
      }

      if (result.status === "error") {
        setPaymentState({
          status: "error",
          code: result.code,
          message: result.message,
        });
      }
    } catch (error) {
      console.error("Payment processing failed:", error);

      const code = "UNKNOWN_ERROR";
      const message = "Something went wrong. Please try again.";

      setPaymentState({
        status: "error",
        code,
        message,
      });
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center ">
      <section className="w-2xl bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h1 className="text-xl font-semibold text-gray-900">Checkout</h1>

          <button
            type="button"
            onClick={() => handleClose("user_closed")}
            title={
              paymentStatus === "processing"
                ? "Payment is processing"
                : "Close Checkout"
            }
            disabled={paymentStatus === "processing"}
            className="text-gray-500 hover:text-gray-900 enabled:hover:bg-gray-100 px-3 py-1 rounded-full text-2xl cursor-pointer disabled:cursor-not-allowed"
          >
            ×
          </button>
        </header>

        <div className="w-full min-w-0 p-6">
          {paymentStatus === "success" || paymentStatus === "error" ? (
            product && (
              <CheckoutResultScreen
                product={product}
                message={paymentState.message}
                status={paymentStatus}
                sessionId={
                  paymentStatus === "success"
                    ? paymentState.sessionId
                    : undefined
                }
                errorCode={
                  paymentStatus === "error" ? paymentState.code : undefined
                }
                onRetry={
                  paymentStatus === "error"
                    ? () => {
                        setPaymentState({ status: "idle" });
                        setFormResetKey((prev) => prev + 1);
                      }
                    : undefined
                }
              />
            )
          ) : (
            <>
              {loading ? (
                <ProductSummarySkeleton />
              ) : product ? (
                <ProductSummary product={product} />
              ) : (
                <div className="py-10 text-center">
                  <p className="font-medium text-gray-900">
                    Unable to load this product
                  </p>

                  <p className="mt-2 text-sm text-gray-500">
                    Please close checkout and try again.
                  </p>
                </div>
              )}

              {!loading && product && (
                <PaymentForm
                  onSubmit={handlePaymentSubmit}
                  disabled={paymentStatus === "processing"}
                  resetKey={formResetKey}
                />
              )}
            </>
          )}
        </div>
      </section>
    </main>
  );
}
