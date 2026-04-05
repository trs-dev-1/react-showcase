import { ENDPOINTS } from '@/shared/constants/endpoints.constants';
import { DEFAULT_CACHE_TIME } from '@/shared/constants/query-keys.constants';
import { useSocketStatus } from '@/shared/hooks/socket/use-socket-status';
import { axiosInstance } from '@/shared/lib/axios';
import { useInfiniteQuery } from '@tanstack/react-query';
import { NotificationsQueryKeys } from '../constants/query';
import { PaginatedNotificationsDto } from '../interfaces/notification-system.interfaces';

export const useNotificationsInfiniteQuery = (enabled: boolean) => {
  const isConnected = useSocketStatus();

  return useInfiniteQuery({
    queryKey: NotificationsQueryKeys.LIST(),
    queryFn: async ({ pageParam }) => {
      const { data } = await axiosInstance.get<PaginatedNotificationsDto>(
        ENDPOINTS.NOTIFICATIONS.GET_CONVERSATIONS_BY_PROPERTY_ID(pageParam)
      );
      return data;
    },
    // TODO can be improved for multi pages!
    refetchInterval: () => (isConnected ? false : 3 * 10 * 1000),
    initialPageParam: 1,
    refetchOnWindowFocus: false,
    enabled,
    staleTime: DEFAULT_CACHE_TIME,
    select: (data) => ({
      currentPage: data.pageParams[data.pageParams.length - 1],
      lastPage: data.pages[0].pagination.lastPage,
      notifications: data.pages.map((page) => page.data).flat()
    }),
    getNextPageParam: ({ pagination }) =>
      pagination.page < pagination.lastPage ? pagination.page + 1 : undefined
  });
};
