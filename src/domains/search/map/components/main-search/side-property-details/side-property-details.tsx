import {
  CardContent,
  CardHeader,
  CardTitle
} from '@/shared/components/ui/card';
import { useScrollRestore } from '@/shared/hooks/utils/use-scroll-restore';
import { ErrorDto } from '@/shared/interfaces/dto.interfaces';
import { useSearch } from '@tanstack/react-router';
import { AxiosError } from 'axios';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { usePreviewProperties } from '../../../hooks/use-preview-properties';
import { PropertyDetails } from './property-details/property-details';
import { SidePropertyView } from './side-property-view/side-property-view';

const SidePropertyDetails = () => {
  const [t] = useTranslation();
  const selectionId = useSearch({ from: '__root__', select: (s) => s.pId });

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
  const { ref, resetScrollValue } = useScrollRestore();
  useEffect(() => {
    resetScrollValue({
      scrollBackToTop: true,
      scrollBehavior: 'smooth'
    });
  }, [page]);

  if (selectionId) {
    return <PropertyDetails pId={selectionId} />;
  }

  return (
    <>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">{t('properties')}</CardTitle>
          {data && data.pageData.count > 0 && (
            <span className="text-muted-foreground bg-muted rounded-full px-2 py-0.5 text-xs font-medium">
              {data.pageData.count}
            </span>
          )}
        </div>
      </CardHeader>
      <CardContent className="h-[calc(100dvh-220px)] overflow-y-auto" ref={ref}>
        <SidePropertyView
          currentPage={page}
          data={data}
          error={(error as AxiosError<ErrorDto>)?.response?.data}
          isError={isError}
          isFetching={isFetching}
          isPlaceholderData={isPlaceholderData}
          refetch={refetch}
          setCurrentPage={setPage}
        />
      </CardContent>
    </>
  );
};

export default SidePropertyDetails;
