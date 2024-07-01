import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method == 'GET'){
        try {
            const architectImages = await prisma.image.findMany({
                where: {
                    architect_id: Number(req.query.architect_id)
                }
            });
            res.status(200).json(architectImages)
        }
        catch (error) {
            res.status(500).json(error)
        }     
    } 
    else if (req.method == 'POST') {
        const architect_id = Number(req.query.architect_id)
        const { name } = req.body;
        try {
            const architectImage = await prisma.image.create({
                data: {
                    architect_id,
                    url: name
                }
            });
            res.status(201).json(architectImage)
        }
        catch (error) {
            res.status(500).json(error)
        } 
    }
    else if (req.method == 'DELETE') {
        const architect_id = Number(req.query.architect_id)
        try {
            const architectImage = await prisma.image.deleteMany({
                where: {
                    architect_id: architect_id,
                }
            });
            res.status(201).json(architectImage)
        }
        catch (error) {
            res.status(500).json(error)
        } 
    } 
    else {
        res.status(405).json("Method not allowed")
    }
}