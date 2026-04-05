import { useSearch } from '@tanstack/react-router';
import { useEffect } from 'react';
import { useMapStore } from '../hooks/use-map-store';

export const MarkersProvider = () => {
  const pId = useSearch({ from: '__root__', select: ({ pId }) => pId });
  const { setSeenMap } = useMapStore();

  useEffect(() => {
    if (pId) {
      setSeenMap(pId);
    }
  }, [pId]);

  return null;
};
