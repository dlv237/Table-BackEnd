import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method == 'GET'){
        try {
            const architectScales = await prisma.architectScales.findMany({
                where: {
                    architect_id: Number(req.query.architect_id)
                }
            });
            res.status(200).json(architectScales)
        }
        catch (error) {
            res.status(500).json(error)
        }     
    } 
    else if (req.method == 'POST') {
        const architect_id = Number(req.query.architect_id)
        const { scale_id } = req.body;
        try {
            const architectScale = await prisma.architectScales.create({
                data: {
                    architect_id,
                    scale_id
                }
            });
            res.status(201).json(architectScale)
        }
        catch (error) {
            res.status(500).json(error)
        } 
    }
    else {
        res.status(405).json("Method not allowed")
    }
}