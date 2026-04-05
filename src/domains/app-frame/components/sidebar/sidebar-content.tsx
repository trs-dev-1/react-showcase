import { useUserState, useUserRole } from '@/domains/auth';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from '@/shared/components/ui/collapsible';
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar
} from '@/shared/components/ui/sidebar';
import { Routes } from '@/shared/interfaces/router/types';
import { Link } from '@tanstack/react-router';
import { ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { BsHouseCheckFill, BsPersonBoundingBox } from 'react-icons/bs';
import { FaHome } from 'react-icons/fa';
import { IconType } from 'react-icons/lib';
import { MdApartment } from 'react-icons/md';
import { TbMessage } from 'react-icons/tb';
import { useUnreadMessagesCountQuery } from '../../hooks/use-unread-messages-count-query';

type NavItem = {
  title: string;
  url: Routes;
  icon: IconType;
  requiresAuth?: boolean;
};

const propertyItems: NavItem[] = [
  {
    title: 'my-properties',
    url: '/user/properties',
    icon: MdApartment,
    requiresAuth: true
  }
];

const adminItems: NavItem[] = [
  {
    title: 'user-management',
    url: '/admin/user-management',
    icon: BsPersonBoundingBox
  }
];

const moderatorItems: NavItem[] = [
  {
    title: 'properties-to-approve',
    url: '/moderator/property-to-approve',
    icon: BsHouseCheckFill
  }
];

export const SidebarPagesContent = () => {
  const [t] = useTranslation();
  const { toggleSidebar } = useSidebar();
  const user = useUserState();
  const { isAdmin, isModerator } = useUserRole();
  const { data } = useUnreadMessagesCountQuery();

  return (
    <SidebarGroup>
      <SidebarGroup>
        <SidebarMenu>
          <SidebarMenuItem className="mt-2">
            <SidebarMenuButton asChild onClick={() => toggleSidebar()}>
              <Link to={'/'}>
                <FaHome />
                {t('home')}
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>

      {user && (
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem className="mt-2">
              <SidebarMenuButton asChild onClick={() => toggleSidebar()}>
                <Link className="flex justify-between" to={'/messages'}>
                  <div className="flex items-center gap-2">
                    <TbMessage />
                    {t('messages')}
                  </div>
                  {!!data && <span className="text-red-500">+{data}</span>}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      )}

      <Collapsible className="group/collapsible">
        <SidebarGroup>
          <CollapsibleTrigger>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <span>
                    {t('properties')}
                    <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                  </span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </CollapsibleTrigger>

          <CollapsibleContent>
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  {propertyItems
                    .filter((item) =>
                      item.requiresAuth && !user ? false : true
                    )
                    .map((item) => (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton
                          asChild
                          onClick={() => toggleSidebar()}
                        >
                          <Link to={item.url}>
                            <item.icon />
                            <span>{t(item.title)}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </CollapsibleContent>
        </SidebarGroup>
      </Collapsible>

      {isAdmin && (
        <Collapsible className="group/collapsible">
          <SidebarGroup>
            <CollapsibleTrigger>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <span>
                      {t('admin-dashboard')}
                      <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                    </span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </CollapsibleTrigger>

            <CollapsibleContent>
              <SidebarGroup>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {adminItems.map((item) => (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton
                          asChild
                          onClick={() => toggleSidebar()}
                        >
                          <Link to={item.url}>
                            <item.icon />
                            <span>{t(item.title)}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>
      )}

      {(isAdmin || isModerator) && (
        <Collapsible className="group/collapsible">
          <SidebarGroup>
            <CollapsibleTrigger>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <span>
                      {t('moderator-dashboard')}
                      <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                    </span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </CollapsibleTrigger>

            <CollapsibleContent>
              <SidebarGroup>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {moderatorItems.map((item) => (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton
                          asChild
                          onClick={() => toggleSidebar()}
                        >
                          <Link to={item.url}>
                            <item.icon />
                            <span>{t(item.title)}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>
      )}
    </SidebarGroup>
  );
};
