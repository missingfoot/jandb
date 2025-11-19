import type { MessageWithFile } from '@/types';

interface LinksViewProps {
  messages: MessageWithFile[];
  accentColor?: string;
}

export function LinksView({ messages, accentColor = '#0d6efd' }: LinksViewProps) {
  const messagesWithLinks = messages.filter((m) => m.link);

  if (messagesWithLinks.length === 0) {
    return (
      <div className="h-full flex items-center justify-center p-8">
        <p className="text-neutral-400 text-sm text-center">No links shared yet</p>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto p-4 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/20">
      <div className="space-y-3">
        {messagesWithLinks.map((message) => (
          <div
            key={message.id}
            className="p-4 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-lg hover:bg-[rgba(255,255,255,0.08)] transition-colors"
          >
            <div className="flex items-start justify-between gap-3 mb-2">
              <div className="flex-1 min-w-0">
                <p className="text-sm text-white break-words mb-1">{message.text}</p>
                <p className="text-xs text-neutral-400">
                  Shared by {message.sender} •{' '}
                  {new Date(message.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
            <a
              href={message.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-3 py-1.5 rounded-lg text-xs font-medium transition-colors mt-2"
              style={{
                backgroundColor: accentColor,
                color: 'white',
              }}
            >
              Open Link
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
