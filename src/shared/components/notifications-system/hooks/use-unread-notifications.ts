import { useIsAuthenticated } from '@/domains/auth';
import { ENDPOINTS } from '@/shared/constants/endpoints.constants';
import { CountDto } from '@/shared/interfaces/dto.interfaces';
import { axiosInstance } from '@/shared/lib/axios';
import { mapDto } from '@/shared/utils/dto.utils';
import { useQuery } from '@tanstack/react-query';
import { NotificationsQueryKeys } from '../constants/query';

export const useUnreadNotifications = () => {
  const isAuthenticated = useIsAuthenticated();

  const { data } = useQuery({
    queryKey: NotificationsQueryKeys.COUNT(),
    queryFn: () =>
      axiosInstance
        .get<CountDto>(ENDPOINTS.NOTIFICATIONS.GET_UNREAD_NOTIFICATIONS)
        .then(mapDto())
        .then(({ count }) => count),
    enabled: isAuthenticated
  });

  return data || 0;
};
