import { accessSync, promises as fs, mkdirSync } from 'node:fs';
import path from 'node:path';

/**
 * Initialize the storage directory if it doesn't exist
 */
function ensureStorageDir(storageDir: string): void {
  try {
    accessSync(storageDir);
  } catch {
    mkdirSync(storageDir, { recursive: true });
  }
}

/**
 * Store a file with the given content
 * @param content - File content as Buffer or string
 * @param filename - Filename to use for storing the file
 * @param storageDir - Storage directory path
 * @returns Promise<string> - The stored filename
 */
export async function storeFile(content: Buffer | string, filename: string, storageDir: string): Promise<string> {
  ensureStorageDir(storageDir);

  const buffer = Buffer.isBuffer(content) ? content : Buffer.from(content);
  const filePath = path.join(storageDir, filename);

  await fs.writeFile(filePath, new Uint8Array(buffer));

  return filename;
}

/**
 * Read a file by filename
 * @param filename - Name of the file to read
 * @param storageDir - Storage directory path
 * @returns Promise<Buffer> - File content as Buffer
 */
export async function readFile(filename: string, storageDir: string): Promise<Buffer> {
  const filePath = path.join(storageDir, filename);

  return fs.readFile(filePath);
}

/**
 * Delete files older than the specified threshold
 * @param thresholdSeconds - Age threshold in seconds
 * @param storageDir - Storage directory path
 * @returns Promise<string[]> - Array of deleted filenames
 */
export async function deleteOldFiles(thresholdSeconds: number, storageDir: string): Promise<string[]> {
  ensureStorageDir(storageDir);

  const deletedFiles: string[] = [];
  const cutoffTime = Date.now() - thresholdSeconds * 1000;

  const files = await fs.readdir(storageDir);

  for (const filename of files) {
    const filePath = path.join(storageDir, filename);

    try {
      const stats = await fs.stat(filePath);

      if (stats.birthtime.getTime() < cutoffTime) {
        await fs.unlink(filePath);
        deletedFiles.push(filename);
      }
    } catch (error) {
      // Skip files that can't be processed
      console.warn(`Skipping file ${filename}: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  return deletedFiles;
}
