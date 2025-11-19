import { useRef } from 'react';
import { AttachIcon } from './Icons';

interface FileUploadProps {
  onFileSelect: (file: File | null) => void;
  disabled?: boolean;
  accentColor?: string;
}

export function FileUpload({ onFileSelect, disabled, accentColor = '#0d6efd' }: FileUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    onFileSelect(file);
    // Reset input so same file can be selected again
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        onChange={handleFileChange}
        className="hidden"
        disabled={disabled}
      />
      <button
        type="button"
        onClick={handleClick}
        disabled={disabled}
        className="p-2 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[rgba(255,255,255,0.1)]"
        style={{
          color: accentColor,
        }}
        aria-label="Attach file"
      >
        <AttachIcon />
      </button>
    </>
  );
}
