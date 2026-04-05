import { LatLngType } from '@/shared/interfaces/forms/address-autocomplete.interfaces';
import { useSearch } from '@tanstack/react-router';

export const useLatLngParams = (): LatLngType => {
  return useSearch({
    from: '__root__',
    select: (s) => ({
      lat: s.lat ? +s.lat : 0,
      lng: s.lng ? +s.lng : 0
    })
  });
};
