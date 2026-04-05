import { useSocketInitializer } from '../hooks/socket/use-socket-initializer';

export const SocketProvider = () => {
  useSocketInitializer();
  return null;
};
