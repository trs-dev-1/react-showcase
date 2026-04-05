import { SearchByListProvider, SearchListContainer } from '@/domains/search';
import { createLazyFileRoute, HeadContent } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/search/(list)/list')({
  component: RouteComponent
});

function RouteComponent() {
  return (
    <>
      <HeadContent />

      <SearchByListProvider />
      <SearchListContainer />
    </>
  );
}
