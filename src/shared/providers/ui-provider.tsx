import { useEffect } from 'react';
import { Toaster } from 'sonner';
import { useNetworkStatusNotifier } from '../hooks/utils/use-network-status-notifier';
import { ThemeMode } from '../interfaces/ui.interfaces';
import { useUIState } from '../state/use-ui-state';
import { ToastListener } from './toast-listener.provider';

type UIProviderProps = {
  children: React.ReactNode;
};

export function UIProvider({ children }: UIProviderProps) {
  const { state, setState } = useUIState();

  useNetworkStatusNotifier();

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove('light', 'dark');

    if (state.themeMode === 'system') {
      const systemTheme: ThemeMode = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches
        ? 'dark'
        : 'light';

      root.classList.add(systemTheme);
      setState({ themeMode: systemTheme });
      return;
    }

    root.classList.add(state.themeMode);
  }, [state.themeMode]);

  return (
    <>
      <Toaster richColors theme={state.themeMode} />
      <ToastListener />
      {children}
    </>
  );
}
