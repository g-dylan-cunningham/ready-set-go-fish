import { createPresignedPost } from '@aws-sdk/s3-presigned-post';
import { S3Client } from '@aws-sdk/client-s3';

export async function POST(request) {
  const { key, contentType } = await request.json();

  try {
    // const client = new S3Client({ region: process.env.AWS_REGION }) // this line alone works if deployed on vercel. Check env var name
    const client = new S3Client({
      // full params are needed for non vercel deployment
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION,
    });

    // console.log("process.env.AWS_BUCKET_NAME", process.env.AWS_ACCESS_KEY_ID, process.env.AWS_SECRET_ACCESS_KEY, process.env.AWS_BUCKET_NAME, process.env.AWS_REGION)
    const { url, fields } = await createPresignedPost(client, {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `${key}`,
      Conditions: [
        ['content-length-range', 0, 1048576 * 3], // up to 3 MB
        ['starts-with', '$Content-Type', contentType],
      ],
      Fields: {
        acl: 'public-read',
        'Content-Type': contentType,
      },
      Expires: 600, // Seconds before the presigned post expires. 3600 by default.
    });

    return Response.json({ url, fields });
  } catch (error) {
    console.error('/api/aws POST error',error);
    var errorMessage;
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return Response.json({ error: errorMessage });
  }
}
