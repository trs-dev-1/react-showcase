import { useIsAuthenticated } from '@/domains/auth';
import { PaginationData } from '@/shared/components/custom-pagination/custom-pagination';
import { DEFAULT_CACHE_TIME } from '@/shared/constants/query-keys.constants';
import { useBasicFiltersParams } from '@/shared/hooks/search-params/use-basic-filters-params';
import { useSetQueryFilters } from '@/shared/hooks/search-params/use-set-query-filters';
import { PropertyPreviewDef } from '@/shared/interfaces/property/property.interfaces';
import {
  keepPreviousData,
  useQuery,
  useQueryClient
} from '@tanstack/react-query';
import { useSearch } from '@tanstack/react-router';
import { useEffect } from 'react';
import { SearchMapQueryKeys } from '../constants/query-keys.constants';
import { previewProperties } from '../fetchers/map.fetchers';
import { useMapStore } from './use-map-store';

export type PreviewPropertiesData = {
  list: PropertyPreviewDef[];
  pageData: PaginationData;
};

export const usePreviewProperties = () => {
  const setQueries = useSetQueryFilters();
  const { pt, rt } = useBasicFiltersParams();
  const { page } = useSearch({
    from: '__root__',
    select: ({ page }) => ({
      page: page ? +page : 0
    })
  });

  const { bounds, polyline } = useMapStore();
  const queryClient = useQueryClient();
  const isAuthenticated = useIsAuthenticated();

  const { data, isPlaceholderData, ...rest } = useQuery({
    queryFn: ({ signal }) => {
      return previewProperties({
        bounds,
        polyline,
        basicFilters: {
          rt,
          pt
        },
        page,
        signal,
        isAuthenticated
      });
    },
    queryKey: SearchMapQueryKeys.previewProperties({
      polyline,
      bounds,
      pt,
      rt,
      page
    }),
    enabled: () => !!(polyline || bounds) && !!rt && !!pt,
    placeholderData: keepPreviousData,
    staleTime: DEFAULT_CACHE_TIME
  });

  useEffect(() => {
    const shouldPrefetchNextPage =
      !isPlaceholderData &&
      !!data?.pageData.lastPage &&
      data.pageData.lastPage > page;

    if (shouldPrefetchNextPage) {
      queryClient.prefetchQuery({
        queryKey: SearchMapQueryKeys.previewProperties({
          polyline: polyline,
          bounds: bounds,
          pt: pt,
          rt: rt,
          page: page + 1
        }),
        queryFn: ({ signal }) =>
          previewProperties({
            bounds,
            polyline,
            basicFilters: {
              rt,
              pt
            },
            page: page + 1,
            signal,
            isAuthenticated
          })
      });
    }
  }, [isPlaceholderData, data?.pageData.lastPage, page]);

  return {
    data,
    page,
    setPage: (page: number) => setQueries({ page: page.toString() }),
    isPlaceholderData,
    ...rest
  };
};
