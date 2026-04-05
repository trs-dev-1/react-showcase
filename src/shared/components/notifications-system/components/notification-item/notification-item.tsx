import { Choose, When } from '@/shared/components/conditional-rendering';
import { DropdownMenuItem } from '@/shared/components/ui/dropdown-menu';
import { useDate } from '@/shared/hooks/utils';
import { useNavigate } from '@tanstack/react-router';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import {
  NotificationDto,
  NotificationTypeEnum
} from '../../interfaces/notification-system.interfaces';

type NotificationItemProps = {
  notification: NotificationDto;
};

export const NotificationItem: FC<NotificationItemProps> = ({
  notification
}) => {
  const [t] = useTranslation();
  const { formatDate } = useDate();
  const navigate = useNavigate();

  function onNotificationClick(): void {
    switch (notification.type) {
      case NotificationTypeEnum.PROPERTY_APPROVAL:
        navigate({ to: '/moderator/property-to-approve' });
        break;
    }
  }

  return (
    <DropdownMenuItem className="flex flex-col" onClick={onNotificationClick}>
      <div className="text-sm">
        <Choose>
          <When
            condition={
              notification.type === NotificationTypeEnum.PROPERTY_APPROVAL
            }
          >
            <span>{t('a-new-property-has-been-added-updated')}</span>
          </When>

          <When
            condition={
              notification.type ===
              NotificationTypeEnum.NEW_PROPERTY_IN_SAVED_ZONE
            }
          >
            <span>
              {t(
                'one-ore-more-properties-have-been-recently-added-to-your-favorite-zone'
              )}
            </span>
          </When>
        </Choose>
      </div>
      <span className="text-muted-foreground ml-auto text-sm">
        {formatDate({
          date: notification.createdAt,
          format: 'dd MMMM yyyy HH:mm'
        })}
      </span>
    </DropdownMenuItem>
  );
};
