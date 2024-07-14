import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method == 'GET'){
        try {
            const architectStats = await prisma.architectStats.findUnique(
                {
                    where: {
                        architect_id: Number(req.query.architect_id)
                    }
                }
            );
            res.status(200).json(architectStats)
        }
        catch (error) {
            res.status(500).json(error)
        }    
    }
    else if (req.method == 'PATCH') {
        const architect_id = Number(req.query.architect_id)
        const { type } = req.body;
        try {
            let architectStats = await prisma.architectStats.findUnique({
                where: { architect_id }
            });
            let updatedArchitectStats;
            if (!architectStats) {
                architectStats = await prisma.architectStats.create({data: {architect_id, view_count: 0, contact_count: 0}});
            }

            updatedArchitectStats = await incrementArchitectStats(type, updatedArchitectStats, architect_id, architectStats);
            
            res.status(200).json(updatedArchitectStats)

        }
        catch (error) {
            res.status(500).json(error)
        }
    } 


    async function incrementArchitectStats(type: any, updatedArchitectStats: any, architect_id: number, architectStats: { architect_id: number; view_count: number; contact_count: number; }) {
        if (type == "contact") {
            updatedArchitectStats = await prisma.architectStats.update({
                where: { architect_id },
                data: { contact_count: architectStats.contact_count + 1 }
            });
        }
        else {
            updatedArchitectStats = await prisma.architectStats.update({
                where: { architect_id },
                data: { view_count: architectStats.view_count + 1 }
            });
        }
        return updatedArchitectStats;
    }
}