import { useState } from 'react';

interface UserNameEditorProps {
  currentName: string;
  onSave: (name: string) => void;
  accentColor?: string;
}

export function UserNameEditor({ currentName, onSave, accentColor = '#0d6efd' }: UserNameEditorProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(currentName);

  const handleSave = () => {
    const trimmedName = editedName.trim();
    if (trimmedName) {
      onSave(trimmedName);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditedName(currentName);
    setIsEditing(false);
  };

  if (!isEditing) {
    return (
      <div className="flex items-center justify-between p-4 bg-[rgba(255,255,255,0.05)] rounded-lg border border-[rgba(255,255,255,0.1)]">
        <div>
          <p className="text-xs text-neutral-400 mb-1">Username</p>
          <p className="text-sm font-medium text-white">{currentName}</p>
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
      <p className="text-xs text-neutral-400 mb-2">Username</p>
      <input
        type="text"
        value={editedName}
        onChange={(e) => setEditedName(e.target.value)}
        className="w-full px-3 py-2 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.2)] rounded-lg text-white text-sm focus:outline-none focus:border-[rgba(255,255,255,0.4)] mb-3"
        autoFocus
      />
      <div className="flex gap-2">
        <button
          onClick={handleSave}
          disabled={!editedName.trim()}
          className="flex-1 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            backgroundColor: accentColor,
            color: 'white',
          }}
        >
          Save
        </button>
        <button
          onClick={handleCancel}
          className="flex-1 px-3 py-1.5 text-xs font-medium rounded-lg bg-[rgba(255,255,255,0.1)] text-white hover:bg-[rgba(255,255,255,0.15)] transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
