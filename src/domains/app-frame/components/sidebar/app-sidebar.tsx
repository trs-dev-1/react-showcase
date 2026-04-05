import { useIsAuthenticated } from '@/domains/auth';
import { SocketConnectionStatus } from '@/shared/components/socket/socket-connection-status/socket-connection-status';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter
} from '@/shared/components/ui/sidebar';
import { SidebarPagesContent } from './sidebar-content';
import { SidebarFooterUIMenu } from './sidebar-footer-ui-menu';
import { SidebarFooterUserMenu } from './sidebar-footer-user-menu';

export function AppSidebar() {
  const isAuthenticated = useIsAuthenticated();
  return (
    <Sidebar side="right" variant="floating">
      <SidebarContent className="relative mt-5">
        {isAuthenticated && (
          <SocketConnectionStatus className="absolute top-0 right-4" />
        )}
        <SidebarPagesContent />
      </SidebarContent>
      <SidebarFooter className="mb-2">
        <SidebarFooterUserMenu />
        <SidebarFooterUIMenu />
      </SidebarFooter>
    </Sidebar>
  );
}
