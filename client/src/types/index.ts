import { ChangeEvent } from "react";

export interface UserForm {
  email: { value: string };
  name: { value: string };
}

export interface Customer {
  id: string;
}

export interface ConfigProps {
  vm: string;
  csp: string;
  users: string;
  handleConfigUpdates: (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
}

export type PriceFactors = "vm" | "csp" | "users";

export type CloudStorage = "aws" | "azure" | "gcp";
