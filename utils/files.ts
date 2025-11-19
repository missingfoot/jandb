/**
 * Formats file size in bytes to human-readable format
 * @param bytes - File size in bytes
 * @returns Formatted string (e.g., "1.5 MB")
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

/**
 * Removes timestamp prefix from InstantDB file paths
 * @param path - File path (e.g., "userId/chat/1234567890_photo.jpg")
 * @returns Clean filename (e.g., "photo.jpg")
 */
export function getCleanFileName(path: string): string {
  const parts = path.split('/');
  const filename = parts[parts.length - 1];
  // Remove timestamp prefix (format: timestamp_filename)
  const match = filename.match(/^\d+_(.*)/);
  return match ? match[1] : filename;
}

/**
 * Checks if a file is an image based on extension
 */
export function isImageFile(filename: string): boolean {
  const imageExtensions = [
    'jpg', 'jpeg', 'png', 'gif', 'webp',
    'bmp', 'svg', 'tiff', 'tif', 'ico',
    'heic', 'heif', 'avif'
  ];

  const ext = filename.split('.').pop()?.toLowerCase();
  return ext ? imageExtensions.includes(ext) : false;
}

/**
 * Maximum file size allowed for uploads (50MB)
 */
export const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB
