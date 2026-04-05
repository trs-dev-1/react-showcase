import demoImage from '@/assets/images/apartament_demo.jpg';
import { cn } from '@/shared/lib/utils';

export const PropertyImageDemo: React.FC<
  React.HTMLAttributes<HTMLImageElement>
> = ({ className, ...props }) => {
  return (
    <img
      {...props}
      src={demoImage}
      loading="lazy"
      className={cn(
        'aspect-square size-full cursor-grabbing rounded-md object-cover',
        className
      )}
    />
  );
};
