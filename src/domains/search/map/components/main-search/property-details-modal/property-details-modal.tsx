import { ErrorBoundary } from '@/shared/components/error-boundary/error-boundary';
import { DrawerModal } from '@/shared/components/ui/drawer-modal/drawer-modal';
import { DrawerModalFallback } from '@/shared/components/ui/drawer-modal/drawer-modal-fallback';
import { useSetQueryFilters } from '@/shared/hooks/search-params/use-set-query-filters';
import { lazy, Suspense, useState } from 'react';
import { usePropertyDetailsByIdModal } from '../../../hooks/use-property-details-by-id-modal';

const PropertyDetailsModalContent = lazy(
  () => import('./property-details-modal-content')
);

export const PropertyDetailsModal = () => {
  const { isOpen, onClose } = usePropertyDetailsByIdModal();
  const setQueries = useSetQueryFilters();
  const [title, setTitle] = useState('');

  function onCloseModal(open: boolean) {
    if (open) return;
    onClose();
    setQueries({ pId: '' });
  }

  return (
    <DrawerModal open={isOpen} onOpenChange={onCloseModal} title={title}>
      <Suspense fallback={<DrawerModalFallback />}>
        <ErrorBoundary>
          <PropertyDetailsModalContent onTitleLoaded={setTitle} />
        </ErrorBoundary>
      </Suspense>
    </DrawerModal>
  );
};
