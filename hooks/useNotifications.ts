import { useState, useEffect, useRef } from 'react';
import type { MessageWithFile } from '@/types';
import {
  getNotificationPermission,
  requestNotificationPermission,
  showMessageNotification,
  type NotificationPermissionStatus,
} from '@/utils/notifications';

export function useNotifications(messages: MessageWithFile[], currentUser: string) {
  const [permission, setPermission] = useState<NotificationPermissionStatus>('default');
  const [isEnabled, setIsEnabled] = useState(false);
  const previousMessageCountRef = useRef(0);
  const isFirstLoadRef = useRef(true);

  // Check initial permission
  useEffect(() => {
    const currentPermission = getNotificationPermission();
    setPermission(currentPermission);
    setIsEnabled(currentPermission === 'granted');
  }, []);

  // Request permission
  const requestPermission = async () => {
    const newPermission = await requestNotificationPermission();
    setPermission(newPermission);
    setIsEnabled(newPermission === 'granted');
    return newPermission === 'granted';
  };

  // Listen for new messages and show notifications
  useEffect(() => {
    if (!isEnabled || !messages.length) return;

    // Skip notification on first load
    if (isFirstLoadRef.current) {
      isFirstLoadRef.current = false;
      previousMessageCountRef.current = messages.length;
      return;
    }

    // Check if there's a new message
    if (messages.length > previousMessageCountRef.current) {
      const newMessage = messages[messages.length - 1];

      // Don't notify for own messages
      if (newMessage.sender !== currentUser) {
        // Only notify if document is not visible
        if (document.hidden) {
          showMessageNotification(
            newMessage.sender,
            newMessage.text || '',
            Boolean(newMessage.$file)
          );
        }
      }
    }

    previousMessageCountRef.current = messages.length;
  }, [messages, currentUser, isEnabled]);

  return {
    permission,
    isEnabled,
    requestPermission,
  };
}
