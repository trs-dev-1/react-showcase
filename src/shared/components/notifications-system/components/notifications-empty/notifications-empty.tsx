import { Button } from '@/shared/components/ui/button';
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle
} from '@/shared/components/ui/empty';
import { IconBell } from '@tabler/icons-react';
import { RefreshCcwIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';

type NotificationsEmptyProps = {
  refetch: () => void;
  isFetching: boolean;
};

export const NotificationsEmpty = ({
  refetch,
  isFetching
}: NotificationsEmptyProps) => {
  const [t] = useTranslation();

  return (
    <Empty className="from-muted/50 to-background h-full bg-gradient-to-b from-30%">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <IconBell />
        </EmptyMedia>
        <EmptyTitle>{t('no-notifications')}</EmptyTitle>
        <EmptyDescription>{t('all-caught-up')}</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button
          variant="outline"
          size="sm"
          onClick={() => refetch()}
          disabled={isFetching}
        >
          <RefreshCcwIcon className={isFetching ? 'animate-spin' : ''} />
          {t('refresh')}
        </Button>
      </EmptyContent>
    </Empty>
  );
};
