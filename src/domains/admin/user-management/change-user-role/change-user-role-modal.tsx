import { DrawerModal } from '@/shared/components/ui/drawer-modal/drawer-modal';
import { useModal } from '@/shared/hooks/utils/use-modal';
import { lazy, Suspense } from 'react';
import { ErrorBoundary } from '@/shared/components/error-boundary/error-boundary';
import { DrawerModalFallback } from '@/shared/components/ui/drawer-modal/drawer-modal-fallback';

const ChangeUserRoleModalContent = lazy(
  () => import('./change-user-role-modal-content')
);

export const ChangeUserRoleModal = () => {
  const { isOpen, onClose, type } = useModal();

  if (isOpen && type !== 'change-user-role') {
    return;
  }

  return (
    <DrawerModal
      open={isOpen}
      onOpenChange={(open) => !open && onClose()}
      title="change-user-role"
    >
      <Suspense fallback={<DrawerModalFallback />}>
        <ErrorBoundary>
          <ChangeUserRoleModalContent />
        </ErrorBoundary>
      </Suspense>
    </DrawerModal>
  );
};
