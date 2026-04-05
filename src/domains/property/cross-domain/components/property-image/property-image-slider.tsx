import { PropertyPhotoDto } from '@/shared/interfaces/property/property.interfaces';
import { cn } from '@/shared/lib/utils';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/shared/components/ui/carousel';
import { NoImageAvailablePlaceholder } from '../no-image-available-placeholder/no-image-available-placeholder';
import { PropertyImageItem } from './property-image-item';

type PropertyImageSlider = {
  images: PropertyPhotoDto[];
} & React.HTMLAttributes<HTMLElement>;

export const PropertyImageSlider: React.FC<PropertyImageSlider> = ({
  className,
  images
}) => {
  return (
    <Carousel>
      <CarouselContent className="h-81.25">
        {images.map((img) => (
          <CarouselItem
            key={img.publicId}
            className={cn('relative rounded-md', className)}
          >
            <PropertyImageItem url={img.publicId} />
          </CarouselItem>
        ))}
        {!images.length && <NoImageAvailablePlaceholder className="h-72" />}
      </CarouselContent>
      {!!images.length && (
        <>
          <CarouselPrevious className="absolute top-auto right-10 -bottom-7 left-auto" />
          <CarouselNext className="absolute top-auto right-1 -bottom-7" />
        </>
      )}
    </Carousel>
  );
};
