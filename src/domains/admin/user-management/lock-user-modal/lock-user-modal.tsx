import { useModal } from '@/shared/hooks/utils/use-modal';
import { lazy, Suspense } from 'react';
import { ErrorBoundary } from '@/shared/components/error-boundary/error-boundary';
import { AlertDialog, AlertDialogContent } from '@/shared/components/ui/alert-dialog';
import { DrawerModalFallback } from '@/shared/components/ui/drawer-modal/drawer-modal-fallback';

const LockUserModalContent = lazy(() => import('./lock-user-modal-content'));

export const LockUserModal = () => {
  const { isOpen, type } = useModal();

  if (isOpen && type !== 'lock-user') {
    return;
  }

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent>
        <Suspense fallback={<DrawerModalFallback />}>
          <ErrorBoundary>
            <LockUserModalContent />
          </ErrorBoundary>
        </Suspense>
      </AlertDialogContent>
    </AlertDialog>
  );
};
