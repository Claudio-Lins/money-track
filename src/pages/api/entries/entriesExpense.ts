import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const entriesExpense = await prisma.entry.findMany({
    where: {
      type: {
        equals: 'EXPENSE',
      },
    },
    include: {
      categories: true,
      User: true,
    },
  });
  res.status(200).json(entriesExpense);
}

