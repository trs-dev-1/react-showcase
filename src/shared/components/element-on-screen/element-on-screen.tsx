import { useElementOnScreen } from '@/shared/hooks/utils/use-element-on-screen';
import { cn } from '@/shared/lib/utils';

type ElementOnScreenProps = {
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

export const ElementOnScreen: React.FC<ElementOnScreenProps> = ({
  children,
  className,
  ...props
}) => {
  const { ref, isVisible } = useElementOnScreen();

  return (
    <div {...props} className={cn('relative', className)} ref={ref}>
      {isVisible ? children : null}
    </div>
  );
};
