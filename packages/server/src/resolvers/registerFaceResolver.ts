import { disClient } from '../api/connection/serverConnection.ts';
import { detectFaceApi, evaluateAspectsApi } from '../api/faceOperationsApi.ts';
import { ProcessingError } from '../errors/index.ts';
import { appLogger } from '../logger.ts';
import { clearSession, createSession, updateSessionAge, updateSessionFilename } from '../session.ts';
import { deleteOldFiles, storeFile } from '../storage/file.ts';

export async function registerFaceResolver(imageBase64: string, tmpDir: string) {
  const sessionId = createSession();
  const filename = `${sessionId}.png`;

  appLogger.info(`Created session with id: ${sessionId}`);

  updateSessionFilename(sessionId, filename);

  try {
    // Cleanup old face upload files
    try {
      const deletedFiles = await deleteOldFiles(3600, tmpDir);

      if (deletedFiles.length > 0) {
        appLogger.debug(`Cleaned up ${deletedFiles.length} old face upload files`);
      }
    } catch (cleanupError) {
      appLogger.warn('Failed to cleanup old face upload files:', cleanupError as Record<string, unknown>);
    }

    // Convert base64 image to Buffer
    const imageBuffer = Buffer.from(imageBase64, 'base64');

    await storeFile(imageBuffer, filename, tmpDir);

    const { id: faceId } = await detectFaceApi({ image: { data: imageBase64 } });

    appLogger.info(`Created face with id: ${faceId}`);

    if (!faceId) {
      clearSession(sessionId);

      throw new ProcessingError({
        message: 'Unable to detect face',
        status: 400,
        operation: 'registerFaceResolver:detectFace',
      });
    }

    const aspectsResponse = await evaluateAspectsApi(faceId);

    const estimatedAge = aspectsResponse.age;

    updateSessionAge(sessionId, estimatedAge);

    const croppedSelfieResponse = await disClient.api.doCrop(faceId);

    return {
      aspects: aspectsResponse,
      croppedSelfie: croppedSelfieResponse.data,
      sessionId,
    };
  } catch (error) {
    clearSession(sessionId);

    // Re-throw ProcessingError and ThirdPartyApiError as-is
    if (error instanceof ProcessingError) {
      throw error;
    }

    appLogger.error('Failed to register face', error as Record<string, unknown>);

    throw new ProcessingError({
      message: 'Failed to register face',
      operation: 'registerFaceResolver',
      originalError: error instanceof Error ? error : undefined,
    });
  }
}
