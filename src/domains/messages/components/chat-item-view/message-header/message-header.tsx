import { cn } from '@/shared/lib/utils';
import { useNavigate } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { FaChevronRight } from 'react-icons/fa';
import { useMessagesStore } from '../../../hooks/use-messages-store';
import { ConversationImage } from '../../conversation-image/conversation-image';

type MessageHeaderProps = {
  propertyId: string;
} & React.HTMLAttributes<HTMLDivElement>;

export const MessageHeader: React.FC<MessageHeaderProps> = ({
  propertyId,
  className,
  ...props
}) => {
  const navigate = useNavigate();
  const { messageMeta } = useMessagesStore();
  const [t] = useTranslation();

  const onViewProperty = () => {
    navigate({ to: '/property/$pId', params: { pId: propertyId } });
  };

  return (
    <div
      className={cn(
        'group bg-secondary hover:bg-secondary/80 flex cursor-default items-center gap-2 rounded-md p-2 shadow transition',
        className
      )}
      {...props}
      onClick={onViewProperty}
    >
      <ConversationImage imageId={messageMeta?.imageId} />
      <span className="text-muted-foreground group-hover:text-primary ml-auto truncate transition">
        {t('see-property')}
      </span>
      <FaChevronRight className="group-hover:text-primary mr-2 transition group-hover:translate-x-0.5" />
    </div>
  );
};
