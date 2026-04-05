import { useSocketStatus } from '@/shared/hooks/socket/use-socket-status';
import { getSocket } from '@/shared/services/socket.service';
import { useEffect } from 'react';

export const useJoinNotificationsRoom = () => {
  const isConnected = useSocketStatus();

  useEffect(() => {
    const socket = getSocket();
    if (!socket) return;

    if (isConnected) {
      socket.emit('notifications/connect-to-notifications');
    }
  }, [isConnected]);
};
