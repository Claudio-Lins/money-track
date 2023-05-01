import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const entries = await prisma.entry.findMany({
    include: {
      categories: true,
      User: true,
    },
    // sort desc
    orderBy: {
      createdAt: 'asc',
    },
  });
  res.status(200).json(entries);
}

