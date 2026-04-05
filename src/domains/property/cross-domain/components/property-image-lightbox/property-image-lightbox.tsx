import {
  Carousel,
  CarouselContent,
  CarouselItem
} from '@/shared/components/ui/carousel';
import { Dialog, DialogContent } from '@/shared/components/ui/dialog';
import { useCarouselSlide } from '@/shared/hooks/utils';
import { mapToPropertyImageSrc } from '@/shared/utils/cdn.utils';
import { IconChevronLeft, IconChevronRight, IconX } from '@tabler/icons-react';
import { FC } from 'react';

type PropertyImageLightboxProps = {
  photos: { publicId: string }[];
  initialIndex?: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export const PropertyImageLightbox: FC<PropertyImageLightboxProps> = ({
  photos,
  initialIndex = 0,
  open,
  onOpenChange
}) => {
  const { api, setApi, currentSlide } = useCarouselSlide(initialIndex + 1);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="h-[90vh] max-w-[95vw] gap-0 overflow-hidden bg-black p-0 ring-0 sm:max-w-5xl"
      >
        {/* Close button */}
        <button
          className="absolute top-3 right-3 z-50 rounded-full p-1.5 text-white transition-colors hover:bg-white/20"
          onClick={() => onOpenChange(false)}
          aria-label="Close"
        >
          <IconX className="size-5" />
        </button>

        {/* Counter pill */}
        {photos.length > 1 && (
          <div className="absolute top-3 left-1/2 z-50 -translate-x-1/2 rounded-full bg-black/50 px-3 py-1 text-xs text-white backdrop-blur-sm">
            {currentSlide} / {photos.length}
          </div>
        )}

        <Carousel
          className="h-full w-full"
          setApi={setApi}
          opts={{ startIndex: initialIndex }}
        >
          <CarouselContent className="h-full">
            {photos.map(({ publicId }) => (
              <CarouselItem
                key={publicId}
                className="flex h-[90vh] items-center justify-center"
              >
                <img
                  src={mapToPropertyImageSrc(publicId)}
                  className="max-h-[90vh] max-w-full object-contain"
                  alt=""
                />
              </CarouselItem>
            ))}
          </CarouselContent>

          {photos.length > 1 && (
            <>
              <button
                className="absolute top-1/2 left-4 z-30 -translate-y-1/2 rounded-full border border-white/30 bg-white/20 p-2 text-white backdrop-blur-sm transition-colors hover:bg-white/30"
                onClick={() => api?.scrollPrev()}
                aria-label="Previous image"
              >
                <IconChevronLeft className="size-5" />
              </button>
              <button
                className="absolute top-1/2 right-4 z-30 -translate-y-1/2 rounded-full border border-white/30 bg-white/20 p-2 text-white backdrop-blur-sm transition-colors hover:bg-white/30"
                onClick={() => api?.scrollNext()}
                aria-label="Next image"
              >
                <IconChevronRight className="size-5" />
              </button>
            </>
          )}
        </Carousel>
      </DialogContent>
    </Dialog>
  );
};
