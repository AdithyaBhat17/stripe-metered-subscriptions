import { Customer, PriceFactors } from "../types";
import { fetcher } from "./fetcher";

export async function createCustomer(
  name: string,
  email: string
): Promise<Customer> {
  return await fetcher("/create-customer", {
    method: "POST",
    body: JSON.stringify({
      email,
      name,
    }),
  });
}

export async function createPrice(
  total: number,
  meteredAmount: number,
  productMetadata?: { [key in PriceFactors]: string | undefined }
): Promise<{ id: string } | { success: false; message: string }> {
  return await fetcher("/create-price", {
    method: "POST",
    body: JSON.stringify({
      total,
      meteredAmount,
      productMetadata,
    }),
  });
}
