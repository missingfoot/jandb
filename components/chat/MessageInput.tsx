import { useState, useRef, useEffect, KeyboardEvent } from 'react';
import type { NavigationLayout } from '@/hooks/useUserPreferences';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { FileUpload } from '@/components/shared/FileUpload';
import { FilePreview } from '@/components/shared/FilePreview';
import { SendIcon, EmojiIcon, EmojiIconActive } from '@/components/shared/Icons';
import { useFileUpload } from '@/hooks/useFileUpload';

interface MessageInputProps {
  onSendMessage: (text: string, file?: File) => void;
  disabled?: boolean;
  accentColor?: string;
  navigationLayout?: NavigationLayout;
}

export function MessageInput({ onSendMessage, disabled, accentColor = '#0d6efd', navigationLayout = 'top' }: MessageInputProps) {
  const [text, setText] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const emojiPickerRef = useRef<HTMLDivElement>(null);
  const { selectedFile, error, handleFileSelect, clearFile } = useFileUpload();

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
    }
  }, [text]);

  // Handle click outside emoji picker
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target as Node)) {
        setShowEmojiPicker(false);
      }
    };

    if (showEmojiPicker) {
      // Small delay to prevent immediate closure when opening
      setTimeout(() => {
        document.addEventListener('mousedown', handleClickOutside);
      }, 0);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showEmojiPicker]);

  const handleEmojiSelect = (emoji: any) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const newText = text.substring(0, start) + emoji.native + text.substring(end);

    setText(newText);
    setShowEmojiPicker(false);

    // Restore focus and cursor position
    setTimeout(() => {
      textarea.focus();
      const newPosition = start + emoji.native.length;
      textarea.setSelectionRange(newPosition, newPosition);
    }, 0);
  };

  const handleSend = () => {
    const trimmedText = text.trim();
    if (!trimmedText && !selectedFile) return;

    onSendMessage(trimmedText, selectedFile?.file);
    setText('');
    clearFile();

    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className={`py-2 pr-3 bg-[#141414] ${navigationLayout === 'side' ? 'pl-6' : 'pl-3'}`}>
      {/* File preview */}
      {selectedFile && (
        <div className="mb-3">
          <FilePreview file={selectedFile} onRemove={clearFile} />
        </div>
      )}

      {/* Error message */}
      {error && (
        <div className="mb-3 p-2 bg-red-500/20 border border-red-500/50 rounded-lg text-sm text-red-300">
          {error}
        </div>
      )}

      {/* Input row */}
      <div className="flex items-end gap-2">
        <FileUpload
          onFileSelect={handleFileSelect}
          disabled={disabled}
          accentColor={accentColor}
        />

        <div ref={emojiPickerRef} className="relative">
          {/* Emoji Picker */}
          {showEmojiPicker && (
            <div className="absolute bottom-full -left-6 mb-4 z-50">
              <Picker
                data={data}
                onEmojiSelect={handleEmojiSelect}
                theme="dark"
                previewPosition="none"
                skinTonePosition="none"
              />
            </div>
          )}

          <button
            type="button"
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            disabled={disabled}
            className="p-2 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[rgba(255,255,255,0.1)]"
            style={{
              color: accentColor,
              backgroundColor: showEmojiPicker ? 'rgba(255,255,255,0.1)' : 'transparent',
            }}
            aria-label="Add emoji"
          >
            {showEmojiPicker ? <EmojiIconActive /> : <EmojiIcon />}
          </button>
        </div>

        <textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          disabled={disabled}
          rows={1}
          className="flex-1 py-2 text-white placeholder-gray-400 resize-none focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed transition-colors overflow-hidden"
          style={{
            maxHeight: '120px',
            backgroundColor: 'transparent',
          }}
        />

        <button
          type="button"
          onClick={handleSend}
          disabled={disabled || (!text.trim() && !selectedFile)}
          className="p-2 rounded-full transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            backgroundColor: accentColor,
            color: 'white',
          }}
          aria-label="Send message"
        >
          <SendIcon />
        </button>
      </div>
    </div>
  );
}
