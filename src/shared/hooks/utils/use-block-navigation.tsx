import { useBlocker, useNavigate } from '@tanstack/react-router';
import { useCallback, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '../../components/ui/alert-dialog';
import { I18nMessage } from '../../interfaces/i18n.interfaces';
import { mapToi18nPayload } from '../../utils/i18n.utils';

interface UseBlockNavigationOptions {
  dirty: boolean;
  title?: I18nMessage;
  description?: I18nMessage;
  cancelLabel?: I18nMessage;
  leaveLabel?: I18nMessage;
}

interface UseBlockNavigationReturn {
  LeavePageAlert: React.ReactNode;
}

export const useBlockNavigation = ({
  dirty,
  title,
  description,
  cancelLabel,
  leaveLabel
}: UseBlockNavigationOptions): UseBlockNavigationReturn => {
  const [t] = useTranslation();
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const nextLocationRef = useRef<{
    to: string;
    params?: object;
    search?: object;
  } | null>(null);

  const handleConfirmLeave = useCallback(() => {
    setIsDialogOpen(false);

    if (nextLocationRef.current?.to) {
      navigate({
        ...nextLocationRef.current,
        ignoreBlocker: true
      });
    }
  }, [navigate]);

  const handleCancelLeave = useCallback(() => {
    setIsDialogOpen(false);
  }, []);

  useBlocker({
    shouldBlockFn: ({ next }) => {
      if (!dirty) return false;

      nextLocationRef.current = {
        to: next.pathname,
        params: next.params,
        search: next.search
      };

      setIsDialogOpen(true);
      return true;
    }
  });

  const LeavePageAlert = (
    <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {t(...mapToi18nPayload(title || 'unsaved-changes'))}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {t(...mapToi18nPayload(description || 'unsaved-changes-message'))}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleCancelLeave}>
            {t(...mapToi18nPayload(cancelLabel || 'cancel'))}
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirmLeave}>
            {t(...mapToi18nPayload(leaveLabel || 'leave'))}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );

  return { LeavePageAlert };
};
