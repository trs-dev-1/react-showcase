import { useUnreadMessagesCountQuery } from '@/domains/app-frame';
import { useCallback, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

const useBrowserTitleNotifications = () => {
  const originalTitleRef = useRef<string | null>(null);
  const intervalIdRef = useRef<NodeJS.Timeout | null | undefined>(null);
  const { t } = useTranslation();
  const { data: count } = useUnreadMessagesCountQuery();
  const countRef = useRef(count);
  const showMessageRef = useRef(true);

  useEffect(() => {
    countRef.current = count;
  }, [count]);

  const stop = useCallback(() => {
    if (intervalIdRef.current) {
      clearInterval(intervalIdRef.current);
      intervalIdRef.current = null;
    }

    if (originalTitleRef.current) {
      document.title = originalTitleRef.current;
    }
  }, []);

  const updateTitle = useCallback(() => {
    if (intervalIdRef.current) return;

    showMessageRef.current = true;

    intervalIdRef.current = setInterval(() => {
      const currentCount = countRef.current;
      const currentShowMessage = showMessageRef.current;

      if (!originalTitleRef.current) {
        originalTitleRef.current = document.title;
      }

      if (document.hidden) {
        if (currentShowMessage && currentCount) {
          document.title = t('new-messages-notification', {
            count: currentCount
          });
        } else {
          document.title = originalTitleRef.current;
        }

        showMessageRef.current = !showMessageRef.current;
        return;
      }
      stop();
    }, 1500);
  }, [stop, t]);

  const handleVisibilityChange = useCallback(() => {
    if (document.hidden) {
      originalTitleRef.current = document.title;
      updateTitle();
      return;
    }

    stop();
  }, [stop, updateTitle]);

  const listenAndUpdateTitle = useCallback((): void => {
    document.addEventListener('visibilitychange', handleVisibilityChange);
  }, [handleVisibilityChange]);

  return {
    listenAndUpdateTitle
  };
};

export const BrowserTitleNotificationsProvider = () => {
  const { listenAndUpdateTitle } = useBrowserTitleNotifications();

  useEffect(() => {
    listenAndUpdateTitle();
  }, []);

  return null;
};

export default BrowserTitleNotificationsProvider;
