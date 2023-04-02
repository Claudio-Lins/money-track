import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import { Entry } from '@prisma/client';

interface CreateEntryInput {
  amount: number;
  type: 'INCOME' | 'EXPENSE';
  typeAccount: 'CORPORATIVO' | 'PERSONAL';
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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const entries = await prisma.entry.create({
    data: req.body as Entry,
    include: {
      categories: true,
      User: true,
    },
  });
  res.status(200).json(entries);
}
