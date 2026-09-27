export default function ProductSummarySkeleton() {
  return (
    <div className="animate-pulse">
      {/* Product summary */}
      <div className="flex w-full min-w-0 gap-5 rounded-xl border border-gray-200 p-4">
        <div className="h-32 w-32 shrink-0 rounded-xl border-2 border-gray-200 bg-gray-200 p-3" />

        <div className="flex min-w-0 flex-1 flex-col justify-center">
          {/* Product title */}
          <div className="h-6 w-3/4 rounded bg-gray-200" />

          {/* Product price */}
          <div className="mt-2 h-6 w-20 rounded bg-gray-200" />
        </div>
      </div>

      {/* Payment details */}
      <div className="mt-4">
        <div className="mb-4 border-b border-gray-300 py-1">
          <div className="h-6 w-40 rounded bg-gray-200" />
        </div>

        <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
          {/* Field 1 */}
          <div className="flex flex-col">
            <div className="mb-1.5 h-4 w-16 rounded bg-gray-200" />
            <div className="h-11 w-full rounded-xl bg-gray-200" />
            <div className="mt-0.5 min-h-4" />
          </div>

          {/* Field 2 */}
          <div className="flex flex-col">
            <div className="mb-1.5 h-4 w-24 rounded bg-gray-200" />
            <div className="h-11 w-full rounded-xl bg-gray-200" />
            <div className="mt-0.5 min-h-4" />
          </div>

          {/* Field 3 */}
          <div className="flex flex-col">
            <div className="mb-1.5 h-4 w-28 rounded bg-gray-200" />
            <div className="h-11 w-full rounded-xl bg-gray-200" />
            <div className="mt-0.5 min-h-4" />
          </div>

          {/* Expiry */}
          <div className="flex flex-col">
            <div className="mb-1.5 h-4 w-14 rounded bg-gray-200" />

            <div className="flex gap-2">
              <div className="h-11 w-full rounded-xl bg-gray-200" />
              <div className="h-11 w-full rounded-xl bg-gray-200" />
            </div>

            <div className="mt-0.5 min-h-4" />
          </div>
        </div>

        {/* Payment button */}
        <div className="mt-6 h-12 w-full rounded-lg bg-gray-200" />
      </div>
    </div>
  );
}
