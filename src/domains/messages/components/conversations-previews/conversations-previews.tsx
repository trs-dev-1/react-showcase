import { useUserState } from '@/domains/auth';
import { cn } from '@/shared/lib/utils';
import { useNavigate } from '@tanstack/react-router';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useMessagesStore } from '../../hooks/use-messages-store';
import { ConversationPreviewDef } from '../../interfaces/messages.interfaces';
import { ConversationPreviewItem } from '../conversation-preview-item/conversation-preview-item';

type ConversationsPreviewsProps = {
  previews: ConversationPreviewDef[];
} & React.HTMLAttributes<HTMLDivElement>;

export const ConversationsPreviews: FC<ConversationsPreviewsProps> = ({
  previews,
  className,
  ...props
}) => {
  const navigate = useNavigate();
  const user = useUserState();
  const [t] = useTranslation();
  // const { propertyId, userId } = useParams();
  const propertyId = '';
  const userId = '';

  const getUserToMessageId = (senderId: string, recipientId: string): string =>
    user?.id === recipientId ? senderId : recipientId;

  const isActive = (value: ConversationPreviewDef): boolean =>
    value.propertyId === propertyId &&
    getUserToMessageId(value.senderId, value.recipientId) === userId;

  const { setMessageMeta } = useMessagesStore();

  function onOpenConversation(preview: ConversationPreviewDef) {
    setMessageMeta({
      imageId: preview.imageId
    });
    navigate({
      to: '/messages/$pId/$userId',
      params: {
        pId: preview.propertyId,
        userId: getUserToMessageId(preview.senderId, preview.recipientId)
      }
    });
  }

  return (
    <div
      className={cn('flex h-full w-full flex-col gap-2', className)}
      {...props}
    >
      <h1 className="text-lg font-medium">{t('messages')}</h1>
      {!previews.length && (
        <p className="text-muted-foreground my-auto text-center text-sm">
          {t('no-messages-have-been-send-received-yet')}
        </p>
      )}

      {previews.map((preview) => (
        <ConversationPreviewItem
          key={preview.messageId}
          preview={preview}
          selected={isActive(preview)}
          onClick={() => onOpenConversation(preview)}
        />
      ))}
    </div>
  );
};
