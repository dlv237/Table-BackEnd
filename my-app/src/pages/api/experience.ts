import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            const experiences = await prisma.experience.findMany();
            res.status(200).json(experiences);
        }
        catch (error) {
            res.status(500).json({ message: 'Error retrieving architects' + (error as Error).message });
        }    
    }
    else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}