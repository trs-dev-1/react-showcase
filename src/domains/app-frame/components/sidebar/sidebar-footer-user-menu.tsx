import { useAuthModal, useUserState } from '@/domains/auth';
import { useAuthLogoutMutation } from '@/domains/auth';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/shared/components/ui/dropdown-menu';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from '@/shared/components/ui/sidebar';
import { ChevronUp, User2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { CiLogin, CiLogout } from 'react-icons/ci';

export const SidebarFooterUserMenu = () => {
  const [t] = useTranslation();
  const user = useUserState();
  const { mutate: logout } = useAuthLogoutMutation();
  const { onOpen } = useAuthModal();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton>
              <User2 /> {t('account')}
              <ChevronUp className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            side="top"
            className="w-[--radix-popper-anchor-width]"
          >
            {user ? (
              <DropdownMenuItem
                className="flex items-center gap-1"
                onClick={() => logout()}
              >
                <CiLogout className="size-4" />
                <span>{t('logout')}</span>
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem
                className="flex items-center gap-1"
                onClick={() => onOpen({ redirectData: 'current_path' })}
              >
                <CiLogin className="size-4" />
                <span>{t('authenticate')}</span>
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};
