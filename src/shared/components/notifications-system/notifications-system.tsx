import { cn } from '@/shared/lib/utils';
import { IconBell } from '@tabler/icons-react';
import { FC, useState } from 'react';
import { ButtonProps } from 'react-day-picker';
import { useTranslation } from 'react-i18next';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Choose, Otherwise, When } from '../conditional-rendering';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '../ui/dropdown-menu';
import { EmptyDescription } from '../ui/empty';
import { Spinner } from '../ui/spinner';
import { NotificationItem } from './components/notification-item/notification-item';
import { NotificationsEmpty } from './components/notifications-empty/notifications-empty';
import { NotificationsMenuHeader } from './components/notifications-menu-header/notifications-menu-header';
import { useNotificationsInfiniteQuery } from './hooks/use-notifications-infinite-query';
import { useUnreadNotifications } from './hooks/use-unread-notifications';

export const NotificationsSystem: FC<ButtonProps> = ({
  className,
  ...props
}) => {
  const [open, setOpen] = useState(false);
  const [t] = useTranslation();

  const unreadCount = useUnreadNotifications();
  const {
    isFetching,
    refetch,
    data,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    isLoading
  } = useNotificationsInfiniteQuery(open);

  const isLastPage = !!data && data.currentPage === data.lastPage;

  return (
    <DropdownMenu onOpenChange={setOpen} open={open}>
      <DropdownMenuTrigger asChild>
        <Button
          className={cn('relative', className)}
          variant="outline"
          size="icon"
          {...props}
        >
          <IconBell className="size-4" />
          {!!unreadCount && (
            <Badge
              variant="default"
              className="absolute -top-2 left-full flex size-5 min-w-5 -translate-x-1/2 items-center justify-center rounded-full px-1 py-[1px]"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="center" className="w-80">
        <Choose>
          <When condition={data?.notifications.length === 0}>
            <NotificationsEmpty refetch={refetch} isFetching={isFetching} />
          </When>

          <Otherwise>
            <NotificationsMenuHeader />
            <DropdownMenuSeparator />

            <div
              id="notifications-grid-container"
              className="relative my-2 flex min-h-12 flex-col gap-6 overflow-y-auto"
            >
              {isFetchingNextPage && <Spinner className="mx-auto my-2" />}

              <InfiniteScroll
                dataLength={data?.notifications.length || 0}
                next={fetchNextPage}
                hasMore={hasNextPage}
                scrollableTarget="notifications-grid-container"
                loader={<></>}
              >
                {data?.notifications.map((notification) => (
                  <NotificationItem
                    key={notification.notificationId}
                    notification={notification}
                  />
                ))}

                {isLastPage && (
                  <EmptyDescription className="mt-4 text-center">
                    {t('no-more-notifications-to-load')}
                  </EmptyDescription>
                )}
              </InfiniteScroll>
              {isLoading && <Spinner center />}
            </div>
          </Otherwise>
        </Choose>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
