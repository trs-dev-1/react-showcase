import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/shared/components/ui/dropdown-menu';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar
} from '@/shared/components/ui/sidebar';
import { i18nOptions, i18nSupported } from '@/shared/constants/i18n.constants';
import { ThemeMode } from '@/shared/interfaces/ui.interfaces';
import { useUIState } from '@/shared/state/use-ui-state';
import { useNavigate } from '@tanstack/react-router';
import { ChevronUp, Moon, Sun } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { CiSettings } from 'react-icons/ci';
import RoFlag from '../../../../assets/svg/flags/ro.svg';
import RuFlag from '../../../../assets/svg/flags/ru.svg';
import USFlag from '../../../../assets/svg/flags/us.svg';
import { useIsAuthenticated } from '@/domains/auth';

const themeOptions: { title: string; value: ThemeMode; Icon: any }[] = [
  {
    title: 'dark',
    value: 'dark',
    Icon: <Moon className="size-4" />
  },
  {
    title: 'light',
    value: 'light',
    Icon: <Sun className="size-4" />
  }
];

const flagsMap: Record<i18nSupported, string> = {
  ro: RoFlag,
  en: USFlag,
  ru: RuFlag
};

export const SidebarFooterUIMenu = () => {
  const { setState } = useUIState();
  const [t, i18n] = useTranslation();
  const navigate = useNavigate();
  const { toggleSidebar } = useSidebar();
  const isAuthenticated = useIsAuthenticated();

  const changeLanguage = (value: i18nSupported) => {
    i18n.changeLanguage(value);
    setState({ language: value });
  };

  const navigateToSettings = () => {
    navigate({ to: '/settings' });
    toggleSidebar();
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton>
              <CiSettings /> {t('settings')}
              <ChevronUp className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            side="top"
            className="w-[--radix-popper-anchor-width]"
          >
            <DropdownMenuLabel>{t('theme')}</DropdownMenuLabel>
            {themeOptions.map(({ title, value, Icon }) => (
              <DropdownMenuItem
                key={value}
                className="flex items-center gap-1"
                onClick={() =>
                  setState({
                    themeMode: value
                  })
                }
              >
                {Icon}
                {t(title)}
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuLabel>{t('language')}</DropdownMenuLabel>
            {i18nOptions.map((option) => (
              <DropdownMenuItem
                key={option.key}
                className="flex items-center gap-1"
                onClick={() => changeLanguage(option.value)}
              >
                <img className="size-4" src={flagsMap[option.value]} />
                {t(option.key)}
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />

            {isAuthenticated && (
              <>
                <DropdownMenuLabel>{t('others')}</DropdownMenuLabel>
                <DropdownMenuItem
                  className="flex items-center gap-1"
                  onClick={navigateToSettings}
                >
                  <CiSettings />
                  {t('settings')}
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};
