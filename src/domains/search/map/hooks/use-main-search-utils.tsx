import { useSetQueryFilters } from '@/shared/hooks/search-params/use-set-query-filters';
import { useMediaQuery } from '@/shared/hooks/utils/use-media-query';
import { usePropertyDetailsByIdModal } from './use-property-details-by-id-modal';
import { usePropertyDetailsModal } from './use-property-details-modal';

export const useMainSearchUtils = () => {
  const { onOpen } = usePropertyDetailsModal();
  const { onOpen: openById } = usePropertyDetailsByIdModal();
  const setQueries = useSetQueryFilters();
  const isPhone = useMediaQuery('(max-width: 768px)');

  function onViewPropertiesMobile() {
    onOpen();
  }

  const onViewPropertiesById = (ids: string[]) => {
    if (ids.length === 1) {
      setQueries({ pId: ids[0] });

      if (isPhone) {
        openById();
      }
    }
  };
  return {
    onViewPropertiesMobile,
    onViewPropertiesById
  };
};
