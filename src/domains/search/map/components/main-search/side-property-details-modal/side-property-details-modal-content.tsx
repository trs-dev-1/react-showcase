import {
  Choose,
  Otherwise,
  When
} from '@/shared/components/conditional-rendering';
import { DrawerModalContent } from '@/shared/components/ui/drawer-modal/drawer-modal-content';
import { useMediaQuery } from '@/shared/hooks/utils/use-media-query';
import { useScrollRestore } from '@/shared/hooks/utils/use-scroll-restore';
import { ErrorDto } from '@/shared/interfaces/dto.interfaces';
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { usePreviewProperties } from '../../../hooks/use-preview-properties';
import { usePropertyDetailsModal } from '../../../hooks/use-property-details-modal';
import { SidePropertyView } from '../side-property-details/side-property-view/side-property-view';
import { SidePropertyDetailsMobile } from './side-property-details-mobile';

type SidePropertyDetailsModalContentProps = {
  onTitleLoaded: (title: string) => void;
};

const SidePropertyDetailsModalContent: React.FC<
  SidePropertyDetailsModalContentProps
> = ({ onTitleLoaded }) => {
  const { onClose } = usePropertyDetailsModal();

  const {
    page,
    data,
    error,
    isError,
    isFetching,
    isPlaceholderData,
    refetch,
    setPage
  } = usePreviewProperties();
  const [selectionId, setSelectionId] = useState('');
  const isNotPhone = useMediaQuery('(min-width: 768px)');
  const { ref, resetScrollValue } = useScrollRestore();

  useEffect(() => {
    resetScrollValue({
      scrollBackToTop: true,
      scrollBehavior: 'smooth'
    });
  }, [page]);

  function onItemClicked(id: string): void {
    setSelectionId(id);
    onTitleLoaded('');
  }

  function onBack() {
    setSelectionId('');
    onTitleLoaded('');
  }

  useEffect(() => {
    if (isNotPhone) {
      onClose();
    }
  }, [isNotPhone]);

  return (
    <>
      <DrawerModalContent className="mb-4">
        <Choose>
          <When condition={selectionId}>
            <SidePropertyDetailsMobile
              pId={selectionId}
              onBack={onBack}
              onTitleReady={onTitleLoaded}
            />
          </When>
          <Otherwise>
            <div className="h-full overflow-y-auto" ref={ref}>
              <SidePropertyView
                currentPage={page}
                data={data}
                error={(error as AxiosError<ErrorDto>)?.response?.data}
                isError={isError}
                isFetching={isFetching}
                isPlaceholderData={isPlaceholderData}
                onItemClicked={onItemClicked}
                refetch={refetch}
                setCurrentPage={setPage}
              />
            </div>
          </Otherwise>
        </Choose>
      </DrawerModalContent>
    </>
  );
};
export default SidePropertyDetailsModalContent;
