import { Product } from "@/types/checkout-page-types";

export async function getProduct(productId: string): Promise<Product> {
  const response = await fetch(
    `https://fakestoreapi.com/products/${productId}`,
  );

  if (!response.ok) throw new Error("Failed to load products");

  return response.json();
}
