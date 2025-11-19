import type { NotificationPermissionStatus } from '@/utils/notifications';

interface NotificationSettingsProps {
  permission: NotificationPermissionStatus;
  isEnabled: boolean;
  onRequestPermission: () => void;
  accentColor?: string;
}

export function NotificationSettings({
  permission,
  isEnabled,
  onRequestPermission,
  accentColor = '#0d6efd',
}: NotificationSettingsProps) {
  const getStatusText = () => {
    switch (permission) {
      case 'granted':
        return 'Enabled';
      case 'denied':
        return 'Blocked';
      case 'default':
        return 'Not enabled';
      case 'unsupported':
        return 'Not supported';
      default:
        return 'Unknown';
    }
  };

  const getStatusColor = () => {
    switch (permission) {
      case 'granted':
        return '#28a745'; // Green
      case 'denied':
        return '#dc3545'; // Red
      default:
        return '#6c757d'; // Gray
    }
  };

  return (
    <div className="p-4 bg-[rgba(255,255,255,0.05)] rounded-lg border border-[rgba(255,255,255,0.1)]">
      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="text-xs text-neutral-400 mb-1">Push Notifications</p>
          <div className="flex items-center gap-2">
            <div className="relative flex h-4 w-4">
              {permission === 'granted' && (
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
                  boxShadow: permission === 'granted' ? `0 0 8px ${getStatusColor()}` : 'none',
                }}
              />
            </div>
            <span className="text-sm text-white">{getStatusText()}</span>
          </div>
        </div>
      </div>

      {permission === 'default' && (
        <>
          <p className="text-xs text-neutral-400 mb-3">
            Get notified when you receive new messages, even when the app is closed.
          </p>
          <button
            onClick={onRequestPermission}
            className="w-full px-3 py-2 text-sm font-medium rounded-lg transition-colors"
            style={{
              backgroundColor: accentColor,
              color: 'white',
            }}
          >
            Enable Notifications
          </button>
        </>
      )}

      {permission === 'denied' && (
        <p className="text-xs text-neutral-400">
          Notifications are blocked. Please enable them in your browser settings.
        </p>
      )}

      {permission === 'granted' && (
        <p className="text-xs text-neutral-400">
          You&apos;ll receive notifications for new messages when the app is not active.
        </p>
      )}

      {permission === 'unsupported' && (
        <p className="text-xs text-neutral-400">
          Your browser doesn&apos;t support push notifications.
        </p>
      )}
    </div>
  );
}
