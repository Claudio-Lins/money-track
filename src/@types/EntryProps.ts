export interface EntryProps {
  id: number;
  amount: number;
  type: string;
  note?: string | null;
  createdAt: Date;
  updatedAt: Date;
  userId?: string | null;
  User?: User | null;
  category: Category[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  emailVerified: null;
  image: string;
}

export interface Category {
  id: number;
  name: string;
  icon: string;
  createdAt: Date;
  updatedAt: Date;
  entryId: number;
}
