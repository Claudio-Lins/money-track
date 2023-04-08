import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import { Entry } from '@prisma/client';

// delete Entru
export default async function handler( req: NextApiRequest, res: NextApiResponse ) {
  const entryId = req.query.id;
  const entry = await prisma.entry.delete({
    where: { id: Number(entryId) },
  });
  res.json(entry);
}