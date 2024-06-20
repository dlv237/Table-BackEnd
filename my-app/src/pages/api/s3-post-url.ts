import { S3Client, PutObjectCommand, PutObjectCommandInput, ObjectCannedACL } from "@aws-sdk/client-s3";
import { NextApiRequest, NextApiResponse } from 'next';
import bodyParser from 'body-parser';
import { promisify } from 'util';
import { v4 as uuidv4 } from 'uuid';

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  },
});

export const config = {
  api: {
    bodyParser: false,
  },
};

const parseBody = promisify(bodyParser.json({ limit: '10mb' }));

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await parseBody(req, res);

  if (req.method === 'POST') {
    const { imageData } = req.body;

    if (!imageData) {
      return res.status(400).json({ error: 'Image data is required' });
    }
    const uniqueId = uuidv4();
    const fileName = `image_${Date.now()}_${uniqueId}.jpg`;
    const contentType = 'image/jpeg';

    const bucketName = process.env.AWS_S3_BUCKET_NAME;
    
    if (!bucketName) {
      return res.status(500).json({ error: 'AWS S3 bucket name is not defined.' });
    }
    
    const base64Data = Buffer.from(imageData.replace(/^data:image\/\w+;base64,/, ""), 'base64');

    const params: PutObjectCommandInput = {
      Bucket: bucketName,
      Key: fileName,
      ContentType: contentType,
      Body: base64Data,
      ACL: 'public-read' as ObjectCannedACL,
    };

    try {
      const command = new PutObjectCommand(params);
      const data = await s3Client.send(command);
      const imageUrl = `https://${bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;
      res.status(200).json({ fileName });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error uploading image to S3' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
