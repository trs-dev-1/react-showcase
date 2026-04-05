import { useIsAuthenticated } from '@/domains/auth';
import { AddPropertyButton } from '@/domains/property';
import { Logo } from '@/shared/components/logo/logo';
import { NotificationsSystem } from '@/shared/components/notifications-system/notifications-system';
import { ThemeToggle } from '@/shared/components/theme-toggle/theme-toggle';
import { SidebarTrigger } from '@/shared/components/ui/sidebar';
import { cn } from '@/shared/lib/utils';
import { useNavigate } from '@tanstack/react-router';
import { useUnreadMessagesCountQuery } from '../../hooks/use-unread-messages-count-query';

export const Navbar: React.FC<React.HTMLAttributes<HTMLElement>> = ({
  className,
  ...props
}) => {
  const navigate = useNavigate();
  const { data } = useUnreadMessagesCountQuery();

  const isAuthenticated = useIsAuthenticated();

  return (
    <nav
      className={cn(
        'bg-background flex min-h-14 items-center gap-2 border border-x-0 border-t-0 border-b px-4 sm:px-6 md:px-8 lg:px-12',
        className
      )}
      {...props}
    >
      <Logo onClick={() => navigate({ to: '/' })} />

      <div className="flex w-full justify-between">
        <ul>
          <li></li>
        </ul>
        <div className="flex items-center justify-center gap-2">
          {isAuthenticated && <NotificationsSystem />}
          <ThemeToggle className="hidden sm:flex" />
          <AddPropertyButton />
          <SidebarTrigger notificationsCount={data} />
        </div>
      </div>
    </nav>
  );
};
