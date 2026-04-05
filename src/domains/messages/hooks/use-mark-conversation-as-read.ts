import { ENDPOINTS } from '@/shared/constants/endpoints.constants';
import { axiosInstance } from '@/shared/lib/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { PREVIEWS_AND_UNREAD_MESSAGES } from '../query/query.keys';

type MarkConversationAsRead = {
  propertyId: string;
  senderId: string;
};

export const useMarkConversationAsRead = () => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: ({ propertyId, senderId }: MarkConversationAsRead) =>
      axiosInstance.get(
        ENDPOINTS.MESSAGE.MARK_CONVERSATION_AS_READ({ propertyId, senderId })
      ),
    onSuccess: () => {
      client.invalidateQueries({
        predicate: ({ queryKey }) =>
          queryKey[0] === PREVIEWS_AND_UNREAD_MESSAGES
      });
    }
  });
};
