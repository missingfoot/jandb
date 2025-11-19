import { UserNameEditor } from './UserNameEditor';
import { UserAvatarEditor } from './UserAvatarEditor';
import { ThemePicker } from './ThemePicker';
import { NotificationSettings } from './NotificationSettings';
import type { NotificationPermissionStatus } from '@/utils/notifications';
import type { NavigationLayout } from '@/hooks/useUserPreferences';

interface SettingsViewProps {
  userName: string;
  avatarUrl: string;
  themeColor: string;
  defaultThemeColor: string;
  customColors: string[];
  navigationLayout: NavigationLayout;
  connectionStatus: string;
  notificationPermission: NotificationPermissionStatus;
  isNotificationsEnabled: boolean;
  onUserNameChange: (name: string) => void;
  onAvatarChange: (url: string) => void;
  onAvatarRemove: () => void;
  onThemeColorChange: (color: string) => void;
  onThemeColorReset: () => void;
  onSaveCustomColor: (color: string) => void;
  onClearCustomColors: () => void;
  onNavigationLayoutChange: (layout: NavigationLayout) => void;
  onReconnect: () => void;
  onRequestNotificationPermission: () => void;
  accentColor?: string;
}

export function SettingsView({
  userName,
  avatarUrl,
  themeColor,
  defaultThemeColor,
  customColors,
  navigationLayout,
  connectionStatus,
  notificationPermission,
  isNotificationsEnabled,
  onUserNameChange,
  onAvatarChange,
  onAvatarRemove,
  onThemeColorChange,
  onThemeColorReset,
  onSaveCustomColor,
  onClearCustomColors,
  onNavigationLayoutChange,
  onReconnect,
  onRequestNotificationPermission,
  accentColor = '#0d6efd',
}: SettingsViewProps) {
  const getStatusColor = () => {
    switch (connectionStatus) {
      case 'authenticated':
        return '#28a745'; // Green
      case 'connecting':
        return '#ffc107'; // Yellow
      case 'closed':
      case 'errored':
        return '#dc3545'; // Red
      default:
        return '#6c757d'; // Gray
    }
  };

  const getStatusText = () => {
    switch (connectionStatus) {
      case 'authenticated':
        return 'Connected';
      case 'connecting':
        return 'Connecting...';
      case 'closed':
        return 'Disconnected';
      case 'errored':
        return 'Error';
      default:
        return 'Unknown';
    }
  };

  return (
    <div className="h-full overflow-y-auto p-4 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/20">
      <div className="space-y-4 max-w-md mx-auto">
        <h2 className="text-lg font-semibold text-white mb-4">Settings</h2>

        {/* User Settings */}
        <div>
          <h3 className="text-sm font-medium text-neutral-300 mb-2">User</h3>
          <div className="space-y-3">
            <UserNameEditor
              currentName={userName}
              onSave={onUserNameChange}
              accentColor={accentColor}
            />
            <UserAvatarEditor
              userName={userName}
              currentAvatarUrl={avatarUrl}
              onAvatarChange={onAvatarChange}
              onAvatarRemove={onAvatarRemove}
              accentColor={accentColor}
            />
          </div>
        </div>

        {/* Theme Settings */}
        <div>
          <h3 className="text-sm font-medium text-neutral-300 mb-2">Appearance</h3>
          <div className="space-y-3">
            <ThemePicker
              currentColor={themeColor}
              defaultColor={defaultThemeColor}
              customColors={customColors}
              onColorChange={onThemeColorChange}
              onReset={onThemeColorReset}
              onSaveCustomColor={onSaveCustomColor}
              onClearCustomColors={onClearCustomColors}
            />

            {/* Navigation Layout */}
            <div className="p-4 bg-[rgba(255,255,255,0.05)] rounded-lg border border-[rgba(255,255,255,0.1)]">
              <p className="text-xs text-neutral-400 mb-3">Navigation Layout</p>
              <div className="flex gap-2">
                <button
                  onClick={() => onNavigationLayoutChange('side')}
                  className="flex-1 px-3 py-2 text-sm font-medium rounded-lg transition-colors"
                  style={{
                    backgroundColor: navigationLayout === 'side' ? accentColor : 'rgba(255, 255, 255, 0.05)',
                    color: navigationLayout === 'side' ? 'white' : 'rgba(255, 255, 255, 0.6)',
                    border: navigationLayout === 'side' ? 'none' : '1px solid rgba(255, 255, 255, 0.1)',
                  }}
                >
                  Side
                </button>
                <button
                  onClick={() => onNavigationLayoutChange('top')}
                  className="flex-1 px-3 py-2 text-sm font-medium rounded-lg transition-colors"
                  style={{
                    backgroundColor: navigationLayout === 'top' ? accentColor : 'rgba(255, 255, 255, 0.05)',
                    color: navigationLayout === 'top' ? 'white' : 'rgba(255, 255, 255, 0.6)',
                    border: navigationLayout === 'top' ? 'none' : '1px solid rgba(255, 255, 255, 0.1)',
                  }}
                >
                  Top
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div>
          <h3 className="text-sm font-medium text-neutral-300 mb-2">Notifications</h3>
          <NotificationSettings
            permission={notificationPermission}
            isEnabled={isNotificationsEnabled}
            onRequestPermission={onRequestNotificationPermission}
            accentColor={accentColor}
          />
        </div>

        {/* Connection Status */}
        <div>
          <h3 className="text-sm font-medium text-neutral-300 mb-2">Connection</h3>
          <div className="p-4 bg-[rgba(255,255,255,0.05)] rounded-lg border border-[rgba(255,255,255,0.1)]">
            <div className={`flex items-center justify-between ${(connectionStatus === 'closed' || connectionStatus === 'errored') ? 'mb-3' : ''}`}>
              <div className="flex items-center gap-2">
                <div className="relative flex h-4 w-4">
                  {connectionStatus === 'authenticated' && (
                    <span
                      className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                      style={{
                        backgroundColor: getStatusColor(),
                        animationDuration: '2s'
                      }}
                    />
                  )}
                  <span
                    className="relative inline-flex rounded-full h-3 w-3 m-auto"
                    style={{
                      backgroundColor: getStatusColor(),
                      boxShadow: connectionStatus === 'authenticated' ? `0 0 8px ${getStatusColor()}` : 'none',
                    }}
                  />
                </div>
                <span className="text-sm text-white">{getStatusText()}</span>
              </div>
            </div>
            {(connectionStatus === 'closed' || connectionStatus === 'errored') && (
              <button
                onClick={onReconnect}
                className="w-full px-3 py-2 text-sm font-medium rounded-lg transition-colors"
                style={{
                  backgroundColor: accentColor,
                  color: 'white',
                }}
              >
                Reconnect
              </button>
            )}
          </div>
        </div>

        {/* App Info */}
        <div>
          <h3 className="text-sm font-medium text-neutral-300 mb-2">About</h3>
          <div className="p-4 bg-[rgba(255,255,255,0.05)] rounded-lg border border-[rgba(255,255,255,0.1)]">
            <p className="text-xs text-neutral-400">James & Beril Chat</p>
            <p className="text-xs text-neutral-500 mt-1">Private chat PWA</p>
          </div>
        </div>
      </div>
    </div>
  );
}
