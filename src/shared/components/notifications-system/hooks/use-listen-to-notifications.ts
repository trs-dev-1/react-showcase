import { useIsAuthenticated } from '@/domains/auth';
import { PREVIEWS_AND_UNREAD_MESSAGES } from '@/domains/messages';
import { useSocketStatus } from '@/shared/hooks/socket/use-socket-status';
import { getSocket } from '@/shared/services/socket.service';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { NOTIFICATIONS_PREDICATE } from '../constants/query';
import {
  NotificationDto,
  NotificationTypeEnum
} from '../interfaces/notification-system.interfaces';

/**
 * Hook to listen for new notifications via socket.io
 * Automatically invalidates relevant queries when notifications arrive
 */
export const useNotificationsSocketListener = () => {
  const queryClient = useQueryClient();
  const isAuthenticated = useIsAuthenticated();
  const isConnected = useSocketStatus();
  const invalidateNotifications = useInvalidateNotifications();

  useEffect(() => {
    const socket = getSocket();
    if (!socket || !isConnected) return;

    const notificationKey = 'notifications';

    if (isAuthenticated) {
      socket.on(
        notificationKey,
        (notification: NotificationDto | NotificationTypeEnum) => {
          // Handle message notifications
          if (notification === NotificationTypeEnum.MESSAGE) {
            queryClient.invalidateQueries({
              predicate: ({ queryKey }) =>
                queryKey[0] === PREVIEWS_AND_UNREAD_MESSAGES
            });
          }

          // Handle object notifications
          if (typeof notification === 'object') {
            invalidateNotifications();
          }
        }
      );
    } else {
      socket.off(notificationKey);
    }

    return () => {
      socket.off(notificationKey);
    };
  }, [isAuthenticated, isConnected, queryClient]);
};

export const useInvalidateNotifications = () => {
  const queryClient = useQueryClient();

  return () => {
    queryClient.invalidateQueries({
      predicate: ({ queryKey }) => queryKey[0] === NOTIFICATIONS_PREDICATE
    });
  };
};
