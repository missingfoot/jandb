/**
 * Notification utilities for PWA
 */

export type NotificationPermissionStatus = 'granted' | 'denied' | 'default' | 'unsupported';

/**
 * Checks if notifications are supported in the current browser
 */
export function isNotificationSupported(): boolean {
  return typeof window !== 'undefined' && 'Notification' in window;
}

/**
 * Gets the current notification permission status
 */
export function getNotificationPermission(): NotificationPermissionStatus {
  if (!isNotificationSupported()) return 'unsupported';
  return Notification.permission as NotificationPermissionStatus;
}

/**
 * Requests notification permission from the user
 */
export async function requestNotificationPermission(): Promise<NotificationPermissionStatus> {
  if (!isNotificationSupported()) return 'unsupported';

  try {
    const permission = await Notification.requestPermission();
    return permission as NotificationPermissionStatus;
  } catch (error) {
    console.error('Error requesting notification permission:', error);
    return 'denied';
  }
}

/**
 * Shows a notification
 */
export function showNotification(title: string, options?: NotificationOptions): void {
  if (!isNotificationSupported()) return;
  if (Notification.permission !== 'granted') return;

  try {
    new Notification(title, {
      icon: '/icon-192.png',
      badge: '/icon-192.png',
      ...options,
    });
  } catch (error) {
    console.error('Error showing notification:', error);
  }
}

/**
 * Shows a notification for a new message
 */
export function showMessageNotification(sender: string, text: string, hasFile: boolean): void {
  const title = `New message from ${sender}`;
  const body = hasFile
    ? text
      ? `${text} (with attachment)`
      : 'Sent a file'
    : text || 'Sent a message';

  showNotification(title, {
    body,
    tag: 'new-message',
    requireInteraction: false,
    silent: false,
  });
}
