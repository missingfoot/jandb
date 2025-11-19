import type { MessageWithFile } from '@/types';
import type { NavigationLayout } from '@/hooks/useUserPreferences';
import { ScrollContainer } from './ScrollContainer';
import { MessageBubble } from './MessageBubble';
import { MessageInput } from './MessageInput';
import { LoadingSpinner } from '@/components/shared/LoadingSpinner';

interface ChatViewProps {
  messages: MessageWithFile[];
  currentUser: string;
  onSendMessage: (text: string, file?: File) => void;
  isLoading?: boolean;
  accentColor?: string;
  navigationLayout?: NavigationLayout;
}

export function ChatView({
  messages,
  currentUser,
  onSendMessage,
  isLoading,
  accentColor = '#0d6efd',
  navigationLayout = 'top',
}: ChatViewProps) {
  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <LoadingSpinner text="Loading messages..." />
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-black">
      <ScrollContainer dependencies={[messages]}>
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-neutral-400 text-sm">No messages yet. Start the conversation!</p>
          </div>
        ) : (
          <div className="space-y-1">
            {messages.map((message, index) => {
              const nextMessage = messages[index + 1];
              const showAvatar = !nextMessage || nextMessage.sender !== message.sender;

              return (
                <MessageBubble
                  key={message.id}
                  message={message}
                  isOwn={message.sender === currentUser}
                  showAvatar={showAvatar}
                  accentColor={accentColor}
                />
              );
            })}
          </div>
        )}
      </ScrollContainer>

      <MessageInput
        onSendMessage={onSendMessage}
        disabled={isLoading}
        accentColor={accentColor}
        navigationLayout={navigationLayout}
      />
    </div>
  );
}
