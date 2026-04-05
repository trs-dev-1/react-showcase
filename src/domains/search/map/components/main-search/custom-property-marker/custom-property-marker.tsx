import { DrawToSearchPin } from '@/domains/search/map/interfaces/search.interfaces';
import { useCurrencyFormat } from '@/shared/hooks/utils';
import { CustomPropertyMarkerMeta } from '@/shared/interfaces/map/custom-property-marker.interfaces';
import { useMap } from '@vis.gl/react-google-maps';
import { useEffect, useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import './custom-property-marker.scss';

const MARKER_CLASSES = {
  favorite: 'custom-property-marker__favorite',
  detailsView: 'custom-property-marker__details-view',
  seen: 'custom-property-marker__seen'
};

const ZOOM_THRESHOLD = 15;

type CustomPropertyMarkerProps = {
  pin: DrawToSearchPin;
  meta: CustomPropertyMarkerMeta | null;
  onTagClicked: (ids: string[]) => void;
  seen?: boolean;
};

const toggleClass = ({
  className,
  element,
  shouldAdd
}: {
  element: HTMLElement | null;
  className: string;
  shouldAdd: boolean;
}) => {
  if (!element) return;

  if (shouldAdd) {
    element.classList.add(className);
  } else {
    element.classList.remove(className);
  }
};

export const CustomPropertyMarker: React.FC<CustomPropertyMarkerProps> = ({
  meta,
  pin,
  seen,
  onTagClicked
}) => {
  const [t] = useTranslation();
  const mapInstance = useMap();
  const { currencyFormat } = useCurrencyFormat();

  const firstProperty = pin.properties[0];
  const hasMultipleProperties = useMemo(
    () => pin.properties.length > 1,
    [pin.properties.length]
  );
  const isFavorite = useMemo(
    () => pin.properties.some((property) => !!property.isFavorite),
    [pin.properties]
  );

  const contentRef = useRef<HTMLDivElement | null>(null);
  const markerRef = useRef<google.maps.marker.AdvancedMarkerElement | null>(
    null
  );
  const clickListenerRef = useRef<google.maps.MapsEventListener | null>(null);
  const onTagClickedRef = useRef(onTagClicked);

  useEffect(() => {
    onTagClickedRef.current = onTagClicked;
  }, [onTagClicked]);

  useEffect(() => {
    toggleClass({
      element: contentRef.current,
      className: MARKER_CLASSES.seen,
      shouldAdd: !!seen
    });
  }, [seen]);

  useEffect(() => {
    if (!mapInstance) return;

    const marker = document.createElement('div');
    marker.className = 'custom-property-marker';

    toggleClass({
      element: marker,
      className: MARKER_CLASSES.favorite,
      shouldAdd: isFavorite
    });
    toggleClass({
      element: marker,
      className: MARKER_CLASSES.seen,
      shouldAdd: !!seen
    });

    contentRef.current = marker;

    markerRef.current = new google.maps.marker.AdvancedMarkerElement({
      map: mapInstance,
      position: {
        lat: pin.latitude,
        lng: pin.longitude
      },
      content: contentRef.current
    });

    clickListenerRef.current = google.maps.event.addListener(
      markerRef.current,
      'click',
      () => {
        onTagClickedRef.current(
          pin.properties.map(({ propertyId }) => propertyId)
        );
      }
    );

    return () => {
      if (markerRef.current) {
        markerRef.current.map = null;
      }
      if (clickListenerRef.current) {
        google.maps.event.removeListener(clickListenerRef.current);
      }
    };
  }, [mapInstance, isFavorite, seen]);

  // Update favorite state
  useEffect(() => {
    toggleClass({
      element: markerRef.current,
      className: MARKER_CLASSES.favorite,
      shouldAdd: isFavorite
    });
  }, [isFavorite]);

  // Update details view based on zoom and bounds
  useEffect(() => {
    const isInBounds = meta?.bounds?.contains(
      new google.maps.LatLng(pin.latitude, pin.longitude)
    );

    const shouldShowDetails =
      typeof meta?.zoom === 'number' &&
      meta.zoom >= ZOOM_THRESHOLD &&
      isInBounds;

    if (shouldShowDetails && contentRef.current) {
      contentRef.current.classList.add(MARKER_CLASSES.detailsView);
      contentRef.current.textContent = hasMultipleProperties
        ? `+${pin.properties.length} ${t('properties')}`.toLowerCase()
        : currencyFormat(firstProperty.price);
    } else {
      contentRef.current?.classList.remove(MARKER_CLASSES.detailsView);
      if (contentRef.current) {
        contentRef.current.textContent = '';
      }
    }
  }, [
    meta,
    hasMultipleProperties,
    pin,
    currencyFormat,
    t,
    firstProperty.price
  ]);

  return null;
};
