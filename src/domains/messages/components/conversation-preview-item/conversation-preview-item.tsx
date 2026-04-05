import { useUserState } from '@/domains/auth';
import { cn } from '@/shared/lib/utils';
import { FC, useEffect } from 'react';
import { useMessagesStore } from '../../hooks/use-messages-store';
import { ConversationPreviewDef } from '../../interfaces/messages.interfaces';
import { ConversationImage } from '../conversation-image/conversation-image';
import { EllipsisTooltip } from '@/shared/components/ui/ellipsis-tooltip';

type ConversationPreviewItemProps = {
  selected: boolean;
  preview: ConversationPreviewDef;
} & React.HTMLAttributes<HTMLDivElement>;

export const ConversationPreviewItem: FC<ConversationPreviewItemProps> = ({
  className,
  preview,
  selected,
  ...props
}) => {
  const user = useUserState();
  const { messageMeta, setMessageMeta } = useMessagesStore();

  useEffect(() => {
    if (selected && !messageMeta) {
      setMessageMeta({ imageId: preview.imageId });
    }
  }, [selected, messageMeta]);
  return (
    <div
      className={cn(
        'border-secondary bg-secondary hover:bg-secondary/80 flex cursor-default items-center gap-1 rounded-md border p-2 transition-colors',
        className,
        selected && 'border-primary'
      )}
      {...props}
    >
      <ConversationImage imageId={preview.imageId} />

      <EllipsisTooltip
        className={
          !preview.readAt && preview.recipientId === user?.id && 'font-semibold'
        }
      >
        {preview.content || ''}
      </EllipsisTooltip>
    </div>
  );
};
