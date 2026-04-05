import { DropdownMenuLabel } from '@/shared/components/ui/dropdown-menu';
import { cn } from '@/shared/lib/utils';
import { useTranslation } from 'react-i18next';
import { useMarkNotificationsAsRead } from '../../hooks/use-mark-notifications-as-read';

export const NotificationsMenuHeader = () => {
  const { mutate, isPending } = useMarkNotificationsAsRead();
  const [t] = useTranslation();

  return (
    <DropdownMenuLabel className="flex items-center justify-between">
      <span>{t('notifications')}</span>

      <button
        className={cn('text-xs hover:underline focus:outline-none', {
          'animate-pulse': isPending
        })}
        disabled={isPending}
        onClick={() => mutate()}
      >
        {t('mark-all-as-read')}
      </button>
    </DropdownMenuLabel>
  );
};
