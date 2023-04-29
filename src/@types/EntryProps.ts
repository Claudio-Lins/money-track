import { CategoryProps } from "./CategoryProps";
import { UserProps } from "./UserProps";

export interface EntryProps {
  id: number;
  amount: number;
  type: string;
  notes?: string | null;
  description: string
  location: string
  file: string
  bankAccount: string
  recurring: string
  paymentMethod: string
  createdAt: Date;
  updatedAt: Date;
  userId?: string | null;
  User?: UserProps | null | undefined;
  categories?: CategoryProps[]
}