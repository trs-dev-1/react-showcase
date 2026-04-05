import { TryAgainButton } from '@/shared/components/buttons/try-again-button';
import { useMediaQuery } from '@/shared/hooks/utils/use-media-query';
import { cn } from '@/shared/lib/utils';
import { useConversationsPreviewsQuery } from '../../hooks/use-conversations-preview-query';
import { ConversationsPreviewsSkeleton } from '../conversations-previews-skeleton/conversations-previews-skeleton';
import { ConversationsPreviews } from '../conversations-previews/conversations-previews';

export const ConversationPreviewsContainer = () => {
  const { isPending, isError, data, refetch } =
    useConversationsPreviewsQuery(1);
  const isPhone = useMediaQuery('(max-width: 768px)');
  const hasSelectedConversation = () =>
    window.location.pathname !== '/messages';

  return (
    <div
      className={cn(
        'w-full sm:block sm:w-44 sm:min-w-44',
        isPhone && hasSelectedConversation() && 'hidden'
      )}
    >
      {isPending && <ConversationsPreviewsSkeleton />}
      {isError && <TryAgainButton onRetry={refetch} />}
      {data && (
        <ConversationsPreviews
          className={hasSelectedConversation() ? 'hidden sm:flex' : ''}
          previews={data}
        />
      )}
    </div>
  );
};
