import Image from 'next/image';
import { ExternalLinkIcon } from '@/components/shared/Icons';

interface LinkCardProps {
  url: string;
  title?: string;
  imageUrl?: string;
  isOwn: boolean;
  accentColor: string;
}

function getDomainFromUrl(url: string): string {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname.replace('www.', '');
  } catch {
    return url;
  }
}

export function LinkCard({ url, title, imageUrl, isOwn, accentColor }: LinkCardProps) {
  const displayTitle = title || getDomainFromUrl(url);
  const backgroundColor = isOwn ? 'rgba(255, 255, 255, 0.15)' : 'rgba(255, 255, 255, 0.1)';

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="block rounded-2xl overflow-hidden transition-opacity hover:opacity-90"
      style={{ backgroundColor }}
    >
      {imageUrl && (
        <div className="relative w-full max-w-xs">
          <Image
            src={imageUrl}
            alt={displayTitle}
            width={300}
            height={200}
            className="w-full object-cover"
            unoptimized
          />
        </div>
      )}
      <div className="px-4 py-3">
        <p className="text-sm text-white break-words">{displayTitle}</p>
        <div className="flex items-center gap-1 mt-1.5 text-xs text-white/70">
          <span className="truncate">{getDomainFromUrl(url)}</span>
          <ExternalLinkIcon className="flex-shrink-0" />
        </div>
      </div>
    </a>
  );
}
