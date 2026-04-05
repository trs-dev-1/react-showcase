import {
  PROPERTY_TYPE,
  RELATION_TYPE
} from '@/shared/constants/property.constants';
import { useSearch } from '@tanstack/react-router';

export const useBasicFiltersParams = () => {
  return useSearch({
    from: '__root__',
    select: (s) => ({
      pt: s.pt || PROPERTY_TYPE.APARTMENT,
      rt: s.rt || RELATION_TYPE.RENT
    })
  });
};
