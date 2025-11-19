import { useState, useRef } from 'react';
import { init } from '@instantdb/react';
import type { AppSchema } from '@/instant.schema';
import schema from '@/instant.schema';
import { Avatar } from './Avatar';

const APP_ID = process.env.NEXT_PUBLIC_INSTANT_APP_ID!;
const db = init<AppSchema>({
  appId: APP_ID,
  schema,
  devtool: false
});

interface AvatarUploadProps {
  name: string;
  currentAvatarUrl?: string;
  onAvatarChange: (url: string) => void;
  accentColor?: string;
}

export function AvatarUpload({
  name,
  currentAvatarUrl,
  onAvatarChange,
  accentColor = '#0d6efd',
}: AvatarUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string>(currentAvatarUrl || '');
  const [error, setError] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file');
      return;
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      setError('Image must be smaller than 5MB');
      return;
    }

    setError('');
    setIsUploading(true);

    try {
      // Create preview
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);

      // Upload to InstantDB
      const timestamp = Date.now();
      const filePath = `${name}/avatar/${timestamp}_${file.name}`;

      const result = await db.storage.uploadFile(filePath, file, {
        contentType: file.type,
      });

      // Get the URL
      const url = await db.storage.getDownloadUrl(result.data.id);
      onAvatarChange(url);

      // Clean up preview URL
      URL.revokeObjectURL(objectUrl);
    } catch (err) {
      console.error('Avatar upload failed:', err);
      setError('Failed to upload avatar. Please try again.');
      setPreviewUrl(currentAvatarUrl || '');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
        disabled={isUploading}
      />

      <div className="relative">
        <Avatar
          name={name}
          avatarUrl={previewUrl}
          size="2xl"
          accentColor={accentColor}
        />
        {isUploading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full">
            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </div>

      <button
        type="button"
        onClick={handleClick}
        disabled={isUploading}
        className="px-4 py-2 text-sm font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        style={{
          backgroundColor: accentColor,
          color: 'white',
        }}
      >
        {previewUrl ? 'Change' : 'Upload'}
      </button>

      {error && (
        <p className="text-sm text-red-400">{error}</p>
      )}
    </div>
  );
}
