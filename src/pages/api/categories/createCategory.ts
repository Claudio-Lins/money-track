import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import { Category } from '@prisma/client';

interface CreateCategoryInput {
    name: string;
    icon: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const categories = await prisma.category.create({
        data: req.body as CreateCategoryInput,
    });
    res.status(200).json(categories);
}
