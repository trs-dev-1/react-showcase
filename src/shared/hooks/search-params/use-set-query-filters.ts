import { QueryFiltersSearchParams } from '@/routes/__root';
import { useNavigate } from '@tanstack/react-router';
import { useCallback } from 'react';

const cleanSearchParams = <T extends Record<string, any>>(
  params: T
): Partial<T> => {
  return Object.fromEntries(
    Object.entries(params).filter(([_, v]) => !!v)
  ) as Partial<T>;
};

export function useSetQueryFilters() {
  const navigate = useNavigate();

  return useCallback(
    (
      newParams: Partial<QueryFiltersSearchParams>,
      options: { merge: boolean } = { merge: true }
    ) => {
      navigate({
        to: '.',
        search: (prev) =>
          cleanSearchParams({ ...(options?.merge ? prev : {}), ...newParams }),
        replace: false
      });
    },
    [navigate]
  );
}
