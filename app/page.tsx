'use client';

import { useState, useEffect } from 'react';
import { init, id, tx } from '@instantdb/react';
import type { AppSchema } from '@/instant.schema';
import schema from '@/instant.schema';
import type { TabType, MessageWithFile } from '@/types';
import { useUserPreferences } from '@/hooks/useUserPreferences';
import { useNotifications } from '@/hooks/useNotifications';

// Layout components
import { Layout } from '@/components/layout/Layout';
import { TabNavigation } from '@/components/layout/TabNavigation';
import { SideNavigation } from '@/components/layout/SideNavigation';

// View components
import { ChatView } from '@/components/chat/ChatView';
import { LinksView } from '@/components/media/LinksView';
import { ImagesView } from '@/components/media/ImagesView';
import { FilesView } from '@/components/media/FilesView';
import { SettingsView } from '@/components/settings/SettingsView';

// Shared components
import { LoadingSpinner } from '@/components/shared/LoadingSpinner';
import { AvatarUpload } from '@/components/shared/AvatarUpload';

// Initialize InstantDB
const APP_ID = process.env.NEXT_PUBLIC_INSTANT_APP_ID!;
const db = init<AppSchema>({
  appId: APP_ID,
  schema,
  devtool: false
});

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabType>('chat');
  const [isNamePromptVisible, setIsNamePromptVisible] = useState(false);
  const [tempName, setTempName] = useState('');
  const [tempAvatarUrl, setTempAvatarUrl] = useState('');

  const {
    userName,
    themeColor,
    navigationLayout,
    avatarUrl,
    customColors,
    isNameSet,
    isLoading: isLoadingPreferences,
    setUserName,
    setThemeColor,
    setNavigationLayout,
    setAvatarUrl,
    removeAvatar,
    resetThemeColor,
    saveCustomColor,
    clearCustomColors,
    DEFAULT_THEME_COLOR,
  } = useUserPreferences();

  // Query messages and files
  const { isLoading, error, data } = db.useQuery({
    messages: {
      $file: {},
    },
  });

  // Sort messages by createdAt
  const messages: MessageWithFile[] = (data?.messages || []).sort(
    (a, b) => a.createdAt - b.createdAt
  );

  // Notifications (must be called before any conditional returns)
  const { permission, isEnabled, requestPermission } = useNotifications(messages, userName);

  // Get connection status
  const [connectionStatus, setConnectionStatus] = useState('connecting');

  useEffect(() => {
    // Monitor connection status
    const checkStatus = () => {
      try {
        // Access internal reactor status (same as extension)
        const status = (db as any)._core?._reactor?.status;
        setConnectionStatus(status || 'connecting');
      } catch {
        setConnectionStatus('unknown');
      }
    };

    checkStatus();
    const interval = setInterval(checkStatus, 1000);
    return () => clearInterval(interval);
  }, []);

  // Show name prompt if not set
  useEffect(() => {
    if (!isLoadingPreferences && !isNameSet) {
      setIsNamePromptVisible(true);
    }
  }, [isLoadingPreferences, isNameSet]);

  const handleSetName = () => {
    const trimmedName = tempName.trim();
    if (trimmedName) {
      setUserName(trimmedName);
      if (tempAvatarUrl) {
        setAvatarUrl(tempAvatarUrl);
      }
      setIsNamePromptVisible(false);
      setTempName('');
      setTempAvatarUrl('');
    }
  };

  const handleSendMessage = async (text: string, file?: File) => {
    if (!userName) return;

    const messageId = id();
    const txs = [];

    // Extract first link from text
    const urlMatch = text.match(/(https?:\/\/[^\s]+)/);
    const link = urlMatch ? urlMatch[0] : undefined;

    // Upload file if present
    let fileId: string | undefined;
    if (file) {
      const timestamp = Date.now();
      const filePath = `${userName}/chat/${timestamp}_${file.name}`;

      try {
        const result = await db.storage.uploadFile(filePath, file, {
          contentType: file.type || 'application/octet-stream',
        });
        fileId = result.data.id;
      } catch (error) {
        console.error('File upload failed:', error);
        alert('Failed to upload file. Please try again.');
        return;
      }
    }

    // Create message
    txs.push(
      tx.messages[messageId].update({
        text: text || '',
        link,
        sender: userName,
        createdAt: Date.now(),
      })
    );

    // Link file to message if uploaded
    if (fileId) {
      txs.push(tx.messages[messageId].link({ $file: fileId }));
    }

    // Execute transaction
    await db.transact(txs);
  };

  const handleReconnect = () => {
    try {
      // Force reconnection (same as extension)
      (db as any)._core?._reactor?._transport?.close();
      (db as any)._core?._reactor?._startSocket?.();
    } catch (error) {
      console.error('Reconnection failed:', error);
    }
  };

  // Show name prompt
  if (isNamePromptVisible) {
    return (
      <Layout>
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="w-full max-w-sm">
            <h1 className="text-2xl font-bold text-center mb-2">Welcome!</h1>
            <p className="text-sm text-gray-400 text-center mb-6">
              Please enter your name to get started
            </p>

            <div className="mb-6 flex justify-center">
              <AvatarUpload
                name={tempName || 'User'}
                currentAvatarUrl={tempAvatarUrl}
                onAvatarChange={setTempAvatarUrl}
                accentColor={DEFAULT_THEME_COLOR}
              />
            </div>

            <input
              type="text"
              value={tempName}
              onChange={(e) => setTempName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSetName()}
              placeholder="Your name"
              className="w-full px-4 py-3 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.2)] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[rgba(255,255,255,0.4)] mb-4"
              autoFocus
            />
            <button
              onClick={handleSetName}
              disabled={!tempName.trim()}
              className="w-full px-4 py-3 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                backgroundColor: DEFAULT_THEME_COLOR,
                color: 'white',
              }}
            >
              Continue
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  // Loading state
  if (isLoading || isLoadingPreferences) {
    return (
      <Layout>
        <div className="flex-1 flex items-center justify-center">
          <LoadingSpinner text="Loading chat..." />
        </div>
      </Layout>
    );
  }

  // Error state
  if (error) {
    return (
      <Layout>
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="text-center">
            <p className="text-red-400 mb-4">Failed to load messages</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 rounded-lg"
              style={{
                backgroundColor: themeColor,
                color: 'white',
              }}
            >
              Retry
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  // Render active view
  const renderView = () => {
    switch (activeTab) {
      case 'chat':
        return (
          <ChatView
            messages={messages}
            currentUser={userName}
            onSendMessage={handleSendMessage}
            accentColor={themeColor}
            navigationLayout={navigationLayout}
          />
        );
      case 'links':
        return <LinksView messages={messages} accentColor={themeColor} />;
      case 'images':
        return <ImagesView messages={messages} />;
      case 'files':
        return <FilesView messages={messages} accentColor={themeColor} />;
      case 'settings':
        return (
          <SettingsView
            userName={userName}
            avatarUrl={avatarUrl}
            themeColor={themeColor}
            defaultThemeColor={DEFAULT_THEME_COLOR}
            customColors={customColors}
            navigationLayout={navigationLayout}
            connectionStatus={connectionStatus}
            notificationPermission={permission}
            isNotificationsEnabled={isEnabled}
            onUserNameChange={setUserName}
            onAvatarChange={setAvatarUrl}
            onAvatarRemove={removeAvatar}
            onThemeColorChange={setThemeColor}
            onThemeColorReset={resetThemeColor}
            onSaveCustomColor={saveCustomColor}
            onClearCustomColors={clearCustomColors}
            onNavigationLayoutChange={setNavigationLayout}
            onReconnect={handleReconnect}
            onRequestNotificationPermission={requestPermission}
            accentColor={themeColor}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Layout>
      {navigationLayout === 'top' ? (
        <>
          <TabNavigation
            activeTab={activeTab}
            onTabChange={setActiveTab}
            accentColor={themeColor}
          />
          <div className="flex-1 overflow-hidden">
            {renderView()}
          </div>
        </>
      ) : (
        <div className="flex-1 flex flex-row overflow-hidden">
          <SideNavigation
            activeTab={activeTab}
            onTabChange={setActiveTab}
            accentColor={themeColor}
          />
          <div className="flex-1 overflow-hidden">
            {renderView()}
          </div>
        </div>
      )}
    </Layout>
  );
}
