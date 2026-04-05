import { cn } from '@/shared/lib/utils';

type DrawerModalContentContainerProps = {
  dismissible?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

export const DrawerModalContent: React.FC<DrawerModalContentContainerProps> = ({
  className,
  ...props
}) => {
  return (
    <div
      className={cn(
        'scroll-pt-6 overflow-y-auto md:h-102.5',
        className
      )}
      {...props}
    ></div>
  );
};
