import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        console.log('POST request received');
        console.log('Request body:', req.body);

        const { email, phone, name, city, address, website, experience_id, description} = req.body;
        try {
            const architect = await prisma.architect.create({data: {email, phone, name, city, description, address, website, experience_id}})
            await prisma.architectStats.create({data: {architect_id: architect.id, view_count: 0, contact_count: 0}});
            res.status(201).json({ architect });
        }
        catch (error) {
            res.status(500).json({ message: 'Error creating architect' + (error as Error).message });
        }
    }  else if (req.method === 'GET') {
        try {
            const architects = await prisma.architect.findMany();
            res.status(200).json(architects);
        }
        catch (error) {
            res.status(500).json({ message: 'Error retrieving architects' + (error as Error).message });
        }
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}