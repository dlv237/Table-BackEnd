import { NextApiRequest, NextApiResponse } from 'next';
import aws from 'aws-sdk';

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
  signatureVersion: 'v4',
});

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const { key } = req.query;

    const params = {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: key as string,
      Expires: 60,
    };

    try {
      const url = await s3.getSignedUrlPromise('getObject', params);
      res.status(200).json({ url });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error generating signed URL' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
