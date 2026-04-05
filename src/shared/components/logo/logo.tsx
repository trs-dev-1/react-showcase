import { cn } from '@/shared/lib/utils';

export const Logo: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => {
  return (
    <div
      {...props}
      className={cn(
        'text-gradient cursor-default text-xl font-bold tracking-tight sm:text-2xl',
        className
      )}
    >
      listify
    </div>
  );
};
