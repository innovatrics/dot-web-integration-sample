import { ProcessingError } from '../errors/index.ts';
import { clearSession, getSession } from '../session.ts';
import { readFile } from '../storage/file.ts';
import { createS3Client, uploadFile } from '../storage/s3.ts';

export async function postAgeFeedbackResolver(sessionId: string, tmpDir: string, ageFeedback: number) {
  const session = getSession(sessionId);

  console.info(`Found session: ${JSON.stringify(session)}`);

  if (!session) {
    throw new ProcessingError({
      message: 'Session not found',
      operation: 'postAgeFeedbackResolver:getSession',
      status: 404,
    });
  }

  const filename = `${sessionId}.png`;

  const imageBuffer = await readFile(filename, tmpDir);

  const { bucketName, client: s3Client } = createS3Client();

  // Generate S3 key with ISO date format
  const isoDate = new Date().toISOString();

  const s3Key = `face-photo/${isoDate}_${session.estimatedAge}_${ageFeedback}_${sessionId}.png`;

  console.info('Uploading photo to S3...');

  const s3Response = await uploadFile(s3Client, bucketName, {
    body: imageBuffer,
    contentType: 'image/png',
    key: s3Key,
    metadata: {
      originalFilename: filename,
      uploadedAt: isoDate,
    },
  });

  console.info('Successfully uploaded photo! Clearing session...');

  clearSession(sessionId);

  console.info('Session cleared!');

  return {
    key: s3Response.key,
    message: 'Age feedback processed!',
  };
}
