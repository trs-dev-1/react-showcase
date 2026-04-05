import {
  PROPERTY_TYPE,
  RELATION_TYPE
} from "@/shared/constants/property.constants";
import { PROPERTY_PREDICATE } from "@/shared/constants/query-keys.constants";
import {
  getLatLngFromPolyline,
  getMapCornersFromBounds
} from "@/shared/utils/mappers.utils";

type SearchByDrawKeyData = {
  polyline: google.maps.Polyline | null;
  pt: PROPERTY_TYPE;
  rt: RELATION_TYPE;
};

type SearchByBoundsKeyData = {
  pt: PROPERTY_TYPE;
  rt: RELATION_TYPE;
  bounds: google.maps.LatLngBounds | null;
};

type PreviewPropertiesKeyData = {
  polyline: google.maps.Polyline | null;
  pt: PROPERTY_TYPE;
  rt: RELATION_TYPE;
  bounds: google.maps.LatLngBounds | null;
  page: number;
};

export const SearchMapQueryKeys = {
  SEARCH_BY_DRAW: (data: SearchByDrawKeyData) => [
    PROPERTY_PREDICATE,
    "[PROPERTY]",
    "[SEARCH][MAP] By draw",
    data.polyline ? getLatLngFromPolyline(data.polyline) : null,
    data.pt,
    data.rt
  ],
  SEARCH_BY_BOUNDS: (data: SearchByBoundsKeyData) => [
    PROPERTY_PREDICATE,
    "[SEARCH][MAP] By bounds",
    data.bounds ? getMapCornersFromBounds(data.bounds) : null,
    data.pt,
    data.rt
  ],
  previewProperties: (data: PreviewPropertiesKeyData) => [
    PROPERTY_PREDICATE,
    "[PREVIEW PROPERTIES] [MAP]",
    data.polyline ? getLatLngFromPolyline(data.polyline) : null,
    data.bounds ? getMapCornersFromBounds(data.bounds) : null,
    data.pt,
    data.rt,
    data.page
  ]
};
