import { PropertyListMock } from '../../mocks/property.mocks';
import { SearchListItem } from './search-list-item/search-list-item';

export const SearchList = () => {
  return (
    <div className="grid grid-cols-1 gap-4">
      {PropertyListMock.map((property) => (
        <SearchListItem key={property.id} property={property} />
      ))}
    </div>
  );
};
