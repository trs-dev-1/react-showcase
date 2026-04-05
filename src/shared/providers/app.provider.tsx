import { QueryClientProvider } from '@tanstack/react-query';
import { UIProvider } from './ui-provider';

import { QueryClient } from '@tanstack/react-query';
import { NotificationProvider } from '../components/notifications-system/providers/notifications.provider';
import { SocketProvider } from './socket.provider';
import { BrowserTitleNotificationsProvider } from './title-notificaitons.provider';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0
    },
    mutations: {
      retry: 0
    }
  }
});

interface AppProviderProps {
  children: React.ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    <UIProvider>{children}</UIProvider>
    <NotificationProvider />
    <SocketProvider />
    <BrowserTitleNotificationsProvider />
  </QueryClientProvider>
);
