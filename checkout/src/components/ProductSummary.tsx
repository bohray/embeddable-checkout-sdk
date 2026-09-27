import { Product } from "@/types/checkout-page-types";
import Image from "next/image";

interface ProductSummaryProps {
  product: Product;
}
export default function ProductSummary({ product }: ProductSummaryProps) {
  return (
    <section className="flex w-full min-w-0 gap-5 rounded-xl border border-gray-200 p-4">
      <div className="h-32 w-32 shrink-0 overflow-hidden rounded-xl bg-gray-50 p-3 border-2 border-gray-200">
        <Image
          src={product.image}
          alt={product.title}
          width={128}
          height={128}
          className="h-full w-full object-contain"
        />
      </div>

      <div className="flex min-w-0 flex-1 flex-col justify-center">
        <h2 className="max-w-full wrap-break-word text-xl font-semibold">
          {product.title}
        </h2>

        <p className="mt-2 text-lg font-bold">${product.price}</p>
      </div>
    </section>
  );
}
