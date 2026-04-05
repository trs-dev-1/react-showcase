import { useScrollRestore } from '@/shared/hooks/utils/use-scroll-restore';
import { useEffect } from 'react';
import { useSearchListScrollPosition } from './use-search-grid-scroll-position';

export const useSearchListScrollRestore = () => {
  const { position, setScrollPosition } = useSearchListScrollPosition();
  const { ref, scrollPosition } = useScrollRestore({
    position: position,
    scrollBehavior: 'instant'
  });

  useEffect(() => {
    setScrollPosition(scrollPosition);
  }, [scrollPosition, setScrollPosition]);

  return { ref };
};
