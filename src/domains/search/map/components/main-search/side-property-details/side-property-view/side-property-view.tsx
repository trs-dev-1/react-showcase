import { PreviewPropertiesData } from '@/domains/search/map/hooks/use-preview-properties';
import { TryAgainButton } from '@/shared/components/buttons/try-again-button';
import { CustomPagination } from '@/shared/components/custom-pagination/custom-pagination';
import { Spinner } from '@/shared/components/ui/spinner';
import { PROPERTY_TYPE } from '@/shared/constants/property.constants';
import { useSetQueryFilters } from '@/shared/hooks/search-params/use-set-query-filters';
import { ErrorDto } from '@/shared/interfaces/dto.interfaces';
import { useSearch } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { PreviewPropertyGrid } from '../../preview-properties-grid/preview-property-grid';

type SidePropertyViewProps = {
  error: ErrorDto | undefined;
  isError: boolean;
  refetch: () => any;
  data: PreviewPropertiesData | undefined;
  currentPage: number;
  isFetching: boolean;
  isPlaceholderData: boolean;
  setCurrentPage: (page: number) => void;
  onItemClicked?: (propertyId: string) => void;
};

export const SidePropertyView: React.FC<SidePropertyViewProps> = ({
  error,
  isError,
  refetch,
  data,
  currentPage,
  isFetching,
  setCurrentPage,
  isPlaceholderData,
  onItemClicked
}) => {
  const [t] = useTranslation();
  const setQueries = useSetQueryFilters();
  const pt = useSearch({
    from: '__root__',
    select: ({ pt }) => pt || PROPERTY_TYPE.APARTMENT
  });

  const zoneTooBigError = error?.message === 'Selected zone is too big';

  const _onItemClicked = (propertyId: string) => {
    onItemClicked?.(propertyId);
    setQueries({ pId: propertyId });
  };

  if ((!data && isFetching) || isPlaceholderData) {
    return <Spinner center />;
  }

  if (isError) {
    if (zoneTooBigError) {
      return (
        <div className="flex h-full items-center justify-center">
          <p className="text-center text-lg font-semibold">
            {t('the-selected-zone-is-too-big')}
          </p>
        </div>
      );
    } else {
      <TryAgainButton onRetry={refetch} />;
    }
  }

  return (
    <div className="flex h-full flex-col justify-between gap-2">
      <PreviewPropertyGrid
        properties={data?.list}
        onItemClicked={_onItemClicked}
        propertyType={pt}
      />
      {data && data.list.length > 0 && (
        <CustomPagination
          className="justify-end"
          count={data.pageData.count}
          page={currentPage}
          onPageChanged={({ page }) => setCurrentPage(page)}
        />
      )}
    </div>
  );
};
