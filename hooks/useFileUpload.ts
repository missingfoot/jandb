import { useState } from 'react';
import { formatFileSize, MAX_FILE_SIZE } from '@/utils/files';

export interface FilePreview {
  file: File;
  name: string;
  size: string;
  isImage: boolean;
  previewUrl?: string;
}

export function useFileUpload() {
  const [selectedFile, setSelectedFile] = useState<FilePreview | null>(null);
  const [error, setError] = useState<string>('');

  const handleFileSelect = (file: File | null) => {
    setError('');

    if (!file) {
      setSelectedFile(null);
      return;
    }

    // Check file size (50MB limit)
    if (file.size > MAX_FILE_SIZE) {
      setError('File size exceeds 50MB limit');
      return;
    }

    const isImage = file.type.startsWith('image/');
    const preview: FilePreview = {
      file,
      name: file.name,
      size: formatFileSize(file.size),
      isImage,
      previewUrl: isImage ? URL.createObjectURL(file) : undefined,
    };

    setSelectedFile(preview);
  };

  const clearFile = () => {
    if (selectedFile?.previewUrl) {
      URL.revokeObjectURL(selectedFile.previewUrl);
    }
    setSelectedFile(null);
    setError('');
  };

  return {
    selectedFile,
    error,
    handleFileSelect,
    clearFile,
  };
}
