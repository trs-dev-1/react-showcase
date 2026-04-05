import { useBasicFiltersParams } from '@/shared/hooks/search-params/use-basic-filters-params';
import { useState } from 'react';
import { DrawToSearchPin } from '../interfaces/search.interfaces';
import { useMapStore } from './use-map-store';
import { useSearchPropertiesByBounds } from './use-search-properties-by-bounds';
import { useSearchPropertiesByDraw } from './use-search-properties-by-draw';

export const useMapMarkersQuery = () => {
  const { polyline, bounds } = useMapStore();
  const basicFilters = useBasicFiltersParams();

  const [isDrawing, setIsDrawing] = useState(false);

  const {
    data: dataByPolyline,
    isSuccess: isSuccessByPolyline,
    isFetching: isFetchingByPolyline
  } = useSearchPropertiesByDraw({
    basicFilters,
    polyline
  });

  const {
    data: dataByBounds,
    isSuccess: isSuccessByBounds,
    isFetching: isFetchingByBounds
  } = useSearchPropertiesByBounds({
    bounds,
    basicFilters,
    enabled: !!bounds && !polyline && !isDrawing
  });

  const mapMarkers: DrawToSearchPin[] | null = polyline
    ? dataByPolyline?.pins || null
    : dataByBounds?.pins || null;

  return {
    markers: isFetchingByPolyline || isDrawing ? null : mapMarkers,
    isFetchingMarkers: isFetchingByPolyline || isFetchingByBounds,
    isSuccess: isSuccessByPolyline || isSuccessByBounds,
    onDrawingStarted: setIsDrawing
  };
};
