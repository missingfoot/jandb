import { LinksIcon, CloseIcon } from '@/components/shared/Icons';

interface LinkPreviewProps {
  url: string;
  onDismiss: () => void;
  accentColor?: string;
}

function truncateUrl(url: string, maxLength = 40): string {
  try {
    const urlObj = new URL(url);
    const display = urlObj.hostname + urlObj.pathname;
    return display.length > maxLength
      ? display.slice(0, maxLength - 3) + '...'
      : display;
  } catch {
    return url.length > maxLength ? url.slice(0, maxLength - 3) + '...' : url;
  }
}

export function LinkPreview({ url, onDismiss, accentColor = '#0d6efd' }: LinkPreviewProps) {
  return (
    <div className="relative flex items-center gap-3 p-3 bg-[rgba(255,255,255,0.05)] rounded-lg border border-[rgba(255,255,255,0.1)]">
      <div
        className="w-10 h-10 flex items-center justify-center rounded flex-shrink-0"
        style={{ backgroundColor: `${accentColor}20` }}
      >
        <LinksIcon width={20} height={20} style={{ color: accentColor }} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-neutral-400 mb-0.5">Link attached</p>
        <p className="text-sm text-white truncate">{truncateUrl(url)}</p>
      </div>
      <button
        type="button"
        onClick={onDismiss}
        className="flex-shrink-0 p-1.5 hover:bg-[rgba(255,255,255,0.1)] rounded transition-colors"
        aria-label="Remove link"
      >
        <CloseIcon />
      </button>
    </div>
  );
}
