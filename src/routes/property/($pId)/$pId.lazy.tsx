import { TryAgainButton } from '@/shared/components/buttons/try-again-button';
import { Spinner } from '@/shared/components/ui/spinner';
import { useGetPropertyById } from '@/domains/property';
import { createLazyFileRoute, useParams } from '@tanstack/react-router';
import { lazy, Suspense } from 'react';
import { PropertyByIdView } from '@/domains/property';

export const Route = createLazyFileRoute('/property/($pId)/$pId')({
  component: RouteComponent
});

const NotFoundView = lazy(
  () =>
    import('../../../domains/property/pId/components/property-not-found-view/property-not-found-view')
);

function RouteComponent() {
  const { pId } = useParams({ from: '/property/($pId)/$pId' });

  const { isPending, isError, error, data, refetch } = useGetPropertyById({
    pId
  });

  if (isPending) {
    return <Spinner center />;
  }

  if (error?.response?.status === 404) {
    return (
      <Suspense fallback={<Spinner center />}>
        <NotFoundView />
      </Suspense>
    );
  }

  if (isError) {
    return <TryAgainButton onRetry={refetch} />;
  }

  return <PropertyByIdView property={data} />;
}
