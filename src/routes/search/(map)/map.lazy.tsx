import { MainSearch, MapProviders } from '@/domains/search';
import { createLazyFileRoute, HeadContent } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/search/(map)/map')({
  component: RouteComponent
});

function RouteComponent() {
  return (
    <>
      <HeadContent />

      <MainSearch />
      <MapProviders />
    </>
  );
}
