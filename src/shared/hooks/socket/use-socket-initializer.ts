import { useIsAuthenticated } from '@/domains/auth';
import {
  connectSocket,
  disconnectSocket
} from '@/shared/services/socket.service';
import { useEffect } from 'react';
import { useSocketStore } from './use-socket-status';

export const useSocketInitializer = () => {
  const isAuthenticated = useIsAuthenticated();
  const { setIsConnected } = useSocketStore();

  useEffect(() => {
    if (isAuthenticated) {
      connectSocket({
        onConnect: () => setIsConnected(true),
        onDisconnect: () => setIsConnected(false)
      });

      return;
    }

    setIsConnected(false);
    disconnectSocket();
  }, [isAuthenticated]);
};
