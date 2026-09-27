import { CheckoutResultScreenProps } from "@/types/checkout-page-types";

export default function CheckoutResultScreen({
  product,
  message,
  sessionId,
  status,
  errorCode,
  onRetry,
}: CheckoutResultScreenProps) {
  const isSuccess = status === "success";

  return (
    <section className="flex flex-col items-center py-4 text-center">
      <div
        className={`flex h-16 w-16 items-center justify-center rounded-full ${
          isSuccess ? "bg-emerald-100" : "bg-red-100"
        }`}
      >
        <span
          className={`text-2xl ${
            isSuccess ? "text-emerald-600" : "text-red-600"
          }`}
        >
          {isSuccess ? "✓" : "✕"}
        </span>
      </div>

      <h2 className="mt-5 text-2xl font-semibold text-gray-900">{message}</h2>

      <p className="mt-2 text-sm text-gray-500">
        {isSuccess
          ? "Your payment has been completed successfully."
          : "We couldn't complete your payment. Please try again."}
      </p>

      <div className="mt-6 w-full max-w-xl rounded-xl border border-gray-200 p-4 text-left">
        <p className="text-sm font-medium text-gray-500">Purchase</p>

        <div className="mt-3 flex items-center justify-between gap-4">
          <p className="text-sm font-medium text-gray-900">{product.title}</p>

          <p className="shrink-0 font-semibold text-gray-900">
            ${product.price}
          </p>
        </div>

        {isSuccess && sessionId && (
          <div className="mt-4 flex items-center justify-between border-t border-gray-200 pt-4">
            <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
              Session ID
            </p>

            <p className="break-all font-mono text-sm text-gray-800">
              {sessionId}
            </p>
          </div>
        )}

        {!isSuccess && errorCode && (
          <div className="mt-4 flex items-center justify-between border-t border-gray-200 pt-4">
            <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
              Error Code
            </p>

            <p className="font-mono text-sm text-red-600">{errorCode}</p>
          </div>
        )}

        {!isSuccess && onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="mt-6 w-full rounded-lg bg-sky-500 px-4 py-3 font-medium cursor-pointer text-white transition-colors duration-250 ease-in-out hover:bg-sky-600 active:scale-[0.98]"
          >
            Try Again
          </button>
        )}
      </div>
    </section>
  );
}
