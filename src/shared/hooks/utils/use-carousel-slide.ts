import { useState, useEffect } from 'react';
import { type CarouselApi } from '@/shared/components/ui/carousel';

export const useCarouselSlide = (initialSlide = 1) => {
  const [api, setApi] = useState<CarouselApi>();
  const [currentSlide, setCurrentSlide] = useState(initialSlide);

  useEffect(() => {
    if (!api) return;
    const onSelect = () => {
      setCurrentSlide(api.selectedScrollSnap() + 1);
    };
    api.on('select', onSelect);
    return () => {
      api.off('select', onSelect);
    };
  }, [api]);

  return { api, setApi, currentSlide };
};
