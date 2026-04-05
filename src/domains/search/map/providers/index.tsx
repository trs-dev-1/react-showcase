import { MarkersProvider } from './markers-provider';
import { SearchModalProvider } from './search-modal-provider';

export const MapProviders = () => {
  return (
    <>
      <MarkersProvider />
      <SearchModalProvider />
    </>
  );
};
