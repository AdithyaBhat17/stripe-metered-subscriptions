import { Customer } from "../types";
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
