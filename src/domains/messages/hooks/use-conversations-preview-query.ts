import { ENDPOINTS } from '@/shared/constants/endpoints.constants';
import { useSocketStatus } from '@/shared/hooks/socket/use-socket-status';
import { Dto } from '@/shared/interfaces/dto.interfaces';
import { axiosInstance } from '@/shared/lib/axios';
import { mapDto } from '@/shared/utils/dto.utils';
import { useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { ConversationPreviewDto } from '../interfaces/messages.interfaces';
import { MessagesQueryKeys } from '../query/query.keys';

export const useConversationsPreviewsQuery = (page: number) => {
  const isConnected = useSocketStatus();
  return useQuery({
    queryKey: MessagesQueryKeys.CONVERSATION_PREVIEWS(page),
    refetchInterval: () => (isConnected ? false : 3 * 10 * 1000),
    queryFn: () =>
      axiosInstance
        .get<
          any,
          AxiosResponse<Dto<ConversationPreviewDto[]>>
        >(ENDPOINTS.MESSAGE.CONVERSATIONS_PREVIEWS(page))
        .then(mapDto())
  });
};
