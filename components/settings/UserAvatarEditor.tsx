import { Avatar } from '@/components/shared/Avatar';
import { AvatarUpload } from '@/components/shared/AvatarUpload';
import { useState } from 'react';

interface UserAvatarEditorProps {
  userName: string;
  currentAvatarUrl: string;
  onAvatarChange: (url: string) => void;
  onAvatarRemove: () => void;
  accentColor?: string;
}

export function UserAvatarEditor({
  userName,
  currentAvatarUrl,
  onAvatarChange,
  onAvatarRemove,
  accentColor = '#0d6efd',
}: UserAvatarEditorProps) {
  const [isEditing, setIsEditing] = useState(false);

  if (!isEditing) {
    return (
      <div className="flex items-center justify-between p-4 bg-[rgba(255,255,255,0.05)] rounded-lg border border-[rgba(255,255,255,0.1)]">
        <div className="flex items-center gap-3">
          <Avatar
            name={userName}
            avatarUrl={currentAvatarUrl}
            size="md"
            accentColor={accentColor}
          />
          <div>
            <p className="text-xs text-neutral-400 mb-1">Avatar</p>
            <p className="text-sm text-white">{currentAvatarUrl ? 'Custom' : 'No avatar added'}</p>
          </div>
        </div>
        <button
          onClick={() => setIsEditing(true)}
          className="px-3 py-1.5 text-xs font-medium rounded-lg transition-colors"
          style={{
            backgroundColor: `${accentColor}20`,
            color: accentColor,
          }}
        >
          Edit
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 bg-[rgba(255,255,255,0.05)] rounded-lg border border-[rgba(255,255,255,0.1)]">
      <p className="text-xs text-neutral-400 mb-3">Avatar</p>
      <AvatarUpload
        name={userName}
        currentAvatarUrl={currentAvatarUrl}
        onAvatarChange={onAvatarChange}
        accentColor={accentColor}
      />
      <div className="flex gap-2 mt-4">
        {currentAvatarUrl && (
          <button
            onClick={() => {
              onAvatarRemove();
              setIsEditing(false);
            }}
            className="flex-1 px-3 py-1.5 text-xs font-medium rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors"
          >
            Remove Avatar
          </button>
        )}
        <button
          onClick={() => setIsEditing(false)}
          className="flex-1 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors"
          style={{
            backgroundColor: accentColor,
            color: 'white',
          }}
        >
          Done
        </button>
      </div>
    </div>
  );
}
