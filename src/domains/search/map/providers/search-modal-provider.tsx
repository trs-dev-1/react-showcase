import { AdvancedFiltersModal } from '../components/advanced-filters-modal/advanced-filters-modal';
import { PropertyDetailsModal } from '../components/main-search/property-details-modal/property-details-modal';
import { SidePropertyDetailsModal } from '../components/main-search/side-property-details-modal/side-property-details-modal';

export const SearchModalProvider = () => {
  return (
    <>
      <SidePropertyDetailsModal />
      <PropertyDetailsModal />
      <AdvancedFiltersModal />
    </>
  );
};
