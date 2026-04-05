import { CustomPropertyMarker } from '@/domains/search/map/components/main-search/custom-property-marker/custom-property-marker';
import { Button } from '@/shared/components/ui/button';
import { useLatLngParams } from '@/shared/hooks/search-params/use-lat-lng-params';
import { useSetQueryFilters } from '@/shared/hooks/search-params/use-set-query-filters';
import { useMediaQuery } from '@/shared/hooks/utils/use-media-query';
import { cn } from '@/shared/lib/utils';
import { GoogleMapsApiLoader, CustomGoogleMap } from '@/shared/components/map';
import { debounceFn } from '@/shared/utils/debounce.utils';
import { useSearch } from '@tanstack/react-router';
import { MapCameraChangedEvent } from '@vis.gl/react-google-maps';
import { useTranslation } from 'react-i18next';
import { IoIosArrowUp } from 'react-icons/io';
import { useMapMarkersQuery } from '../../../hooks/use-map-markers-query';
import { useMapStore } from '../../../hooks/use-map-store';
import { DrawToSearchPin } from '../../../interfaces/search.interfaces';

export type MainSearchMapProps = {
  onViewPropertiesMobile: () => void;
  onTagClicked?: (ids: string[]) => void;
};

export const MainSearchMap: React.FC<MainSearchMapProps> = ({
  onViewPropertiesMobile,
  onTagClicked
}) => {
  const isPhone = useMediaQuery('(max-width: 768px)');
  const [t] = useTranslation();
  const { update, bounds, seenMap } = useMapStore();

  const { markers, isFetchingMarkers, onDrawingStarted } = useMapMarkersQuery();
  const setQueries = useSetQueryFilters();
  const latLng = useLatLngParams();
  const zoom = useSearch({
    from: '__root__',
    select: (s) => (s.zoom ? +s.zoom : 12)
  });

  const isTagSeen = (properties: DrawToSearchPin['properties']) => {
    if (properties.length > 1) {
      return false;
    }

    return seenMap.has(properties[0].propertyId);
  };

  const _onShapeChanged = (polyline: google.maps.Polyline | null) => {
    update({ polyline });
  };

  function onBoundsChanged(event: MapCameraChangedEvent) {
    const center = event.map.getCenter();
    setQueries({
      lat: center?.lat().toString(),
      lng: center?.lng().toString(),
      zoom: event.map.getZoom()?.toString()
    });
    update({
      bounds: event.map.getBounds()!
    });
  }

  const mapHeight = window.innerHeight - 125;

  return (
    <div className="relative w-full grow">
      <GoogleMapsApiLoader libraries={['drawing', 'marker']}>
        <CustomGoogleMap
          height={mapHeight}
          defaultCenter={latLng}
          center={latLng}
          freeHandShapeEnabled
          defaultZoom={zoom}
          onShapeChanged={_onShapeChanged}
          onBoundsChanged={debounceFn(onBoundsChanged, 200)}
          onDrawingStarted={onDrawingStarted}
        >
          {markers?.map((pin) => (
            <CustomPropertyMarker
              key={pin.latitude + pin.longitude}
              meta={{ bounds: bounds!, zoom }}
              pin={pin}
              seen={isTagSeen(pin.properties)}
              onTagClicked={(ids) => onTagClicked?.(ids)}
            />
          ))}
        </CustomGoogleMap>
      </GoogleMapsApiLoader>

      {isPhone && markers && markers.length > 0 && (
        <div className="absolute bottom-2 left-1/2 z-10 -translate-x-1/2 gap-2">
          <Button
            className={cn(
              'flex items-center gap-1',
              isFetchingMarkers && 'pointer-events-none animate-pulse'
            )}
            onClick={onViewPropertiesMobile}
          >
            {t('view-properties')}
            <IoIosArrowUp />
          </Button>
        </div>
      )}
    </div>
  );
};
