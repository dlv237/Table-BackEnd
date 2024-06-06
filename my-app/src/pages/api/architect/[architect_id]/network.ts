import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method == 'GET'){
        try {
            const architectNetworks = await prisma.architectNetworks.findMany({
                where: {
                    architect_id: Number(req.query.architect_id)
                }
            });
            res.status(200).json(architectNetworks)
        }
        catch (error) {
            res.status(500).json(error)
        }    
    }
    else if (req.method == 'POST') {
        const architect_id = Number(req.query.architect_id)
        const { social_type, social_media } = req.body;
        try {
            const architectNetwork = await prisma.architectNetworks.create({
                data: {
                    architect_id,
                    social_type,
                    social_media
                }
            });
            res.status(201).json(architectNetwork)
        }
        catch (error) {
            res.status(500).json(error)
        } 
    } else {
        res.status(405).json("Method not allowed")
    }
}