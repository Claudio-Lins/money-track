import prisma from '@/lib/prisma';
import { Entry } from '@prisma/client';

interface CreateEntryInput {
  amount: number;
  type: 'INCOME' | 'EXPENSE';
  notes?: string;
  description?: string;
  location?: string;
  bankAccount?: string;
  recurring?: 'VARIABLE' | 'FIXED';
  paymentMethod?: string;
  userId?: string;
  categories?: {
    connect: {
      id: number;
    }[];
  };
}

export default async function createEntry(
  input: CreateEntryInput
): Promise<Entry> {
  const entry = await prisma.entry.create({
    data: {
      ...input,
      categories: {
        connect: input.categories?.connect,
      },
    },
  });

  return entry;
}
