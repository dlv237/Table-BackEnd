import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            const architect = await prisma.architect.findUniqueOrThrow({
                where: {
                    id: Number(req.query.architect_id)
                }
            });
            res.status(200).json(architect);
        }
        catch (error) {
            res.status(500).json({ message: 'Error creating architect' + (error as Error).message });
        }
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}