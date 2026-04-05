import { ENDPOINTS } from '@/shared/constants/endpoints.constants';
import { axiosInstance } from '@/shared/lib/axios';
import { useMutation } from '@tanstack/react-query';
import { useInvalidateNotifications } from './use-listen-to-notifications';

export const useMarkNotificationsAsRead = () => {
  const invalidateNotifications = useInvalidateNotifications();

  return useMutation({
    mutationFn: async () => {
      await axiosInstance.get(
        ENDPOINTS.NOTIFICATIONS.MARK_NOTIFICATIONS_AS_READ
      );
    },
    onSuccess: () => invalidateNotifications()
  });
};
