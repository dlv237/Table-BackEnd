import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method == 'GET'){
        try {
            const architectsStats = await prisma.architectStats.findMany();
            res.status(200).json(architectsStats)
        }
        catch (error) {
            res.status(500).json(error)
        }
    }
}