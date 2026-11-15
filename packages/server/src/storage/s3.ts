import type { PutObjectCommandInput } from '@aws-sdk/client-s3';

import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

import { ENV } from '../dotenv.ts';

export type S3Config = {
  accessKeyId?: string;
  bucketName: string;
  region: string;
  secretAccessKey?: string;
};

export type UploadFileParams = {
  body: Buffer | Uint8Array | string;
  contentType?: string;
  key: string;
  metadata?: Record<string, string>;
};

export type UploadFileResult = {
  key: string;
};

export async function uploadFile(
  s3Client: S3Client,
  bucketName: string,
  params: UploadFileParams,
): Promise<UploadFileResult> {
  try {
    const putObjectParams: PutObjectCommandInput = {
      Body: params.body,
      Bucket: bucketName,
      ContentType: params.contentType,
      Key: params.key,
      Metadata: params.metadata,
    };

    const command = new PutObjectCommand(putObjectParams);

    await s3Client.send(command);

    return {
      key: params.key,
    };
  } catch (error) {
    throw new Error(`Failed to upload file to S3: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

// Factory function to create S3 client with environment variables
export const createS3Client = (): { bucketName: string; client: S3Client } => {
  const { AWS_ACCESS_KEY_ID, AWS_ENDPOINT_URL, AWS_REGION, AWS_S3_BUCKET_NAME, AWS_SECRET_ACCESS_KEY, NODE_ENV } = ENV;
  const bucketName = AWS_S3_BUCKET_NAME;

  if (!bucketName) {
    throw new Error('AWS_S3_BUCKET_NAME environment variable is required');
  }

  const client = new S3Client({
    forcePathStyle: true,
    region: AWS_REGION || 'us-east-1',
    ...(NODE_ENV === 'development'
      ? {
          credentials:
            AWS_ACCESS_KEY_ID && AWS_SECRET_ACCESS_KEY
              ? {
                  accessKeyId: AWS_ACCESS_KEY_ID,
                  secretAccessKey: AWS_SECRET_ACCESS_KEY,
                }
              : undefined,
          endpoint: AWS_ENDPOINT_URL,
        }
      : {}),
  });

  return { bucketName, client };
};
