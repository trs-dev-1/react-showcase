import { MainSearchFilters } from '@/domains/search/map/components/main-search/main-search-filters/main-search-filters';
import { Container } from '@/shared/components/ui/container';
import { useSearchListScrollRestore } from '../../hooks/use-search-list-scroll-restore';
import { SearchListPagination } from '../search-list-pagination/search-list-pagination';
import { SearchList } from '../search-list/search-list';

export const SearchListContainer = () => {
  const { ref } = useSearchListScrollRestore();

  return (
    <Container className="flex flex-col gap-4 overflow-y-auto" ref={ref}>
      <MainSearchFilters />
      <SearchList />
      <SearchListPagination />
    </Container>
  );
};
