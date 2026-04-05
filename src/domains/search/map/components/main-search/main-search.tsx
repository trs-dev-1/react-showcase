import { ErrorBoundary } from '@/shared/components/error-boundary/error-boundary';
import { Card } from '@/shared/components/ui/card';
import { Container } from '@/shared/components/ui/container';
import { Spinner } from '@/shared/components/ui/spinner';
import { useMediaQuery } from '@/shared/hooks/utils/use-media-query';
import { lazy, Suspense } from 'react';
import { useMainSearchUtils } from '../../hooks/use-main-search-utils';
import { MainSearchFilters } from './main-search-filters/main-search-filters';
import { MainSearchMap } from './main-search-map/main-search-map';

const SidePropertyDetails = lazy(
  () => import('./side-property-details/side-property-details')
);

export const MainSearch = () => {
  const { onViewPropertiesById, onViewPropertiesMobile } = useMainSearchUtils();
  const isNotPhone = useMediaQuery('(min-width: 768px)');

  return (
    <div className="flex h-full flex-col">
      <Container className="pb-1.5">
        <MainSearchFilters />
      </Container>

      <div className="h-full-safe flex w-full gap-4">
        <ErrorBoundary>
          <MainSearchMap
            onViewPropertiesMobile={onViewPropertiesMobile}
            onTagClicked={onViewPropertiesById}
          />
        </ErrorBoundary>
        {isNotPhone && (
          <Card className="relative mr-4 h-[calc(100%-16px)] w-125 min-w-125 gap-2">
            <Suspense fallback={<Spinner center />}>
              <ErrorBoundary>
                <SidePropertyDetails />
              </ErrorBoundary>
            </Suspense>
          </Card>
        )}
      </div>
    </div>
  );
};
