import { cn } from '@/shared/lib/utils';
import { MdOutlineClose } from 'react-icons/md';
import { Badge, BadgeProps } from './badge';

type QuickChipProps = {
  withRemoveButton?: boolean;
  children: React.ReactNode;
  onRemove?: () => void;
} & BadgeProps;

export const QuickChip: React.FC<QuickChipProps> = ({
  children,
  className,
  withRemoveButton,
  onRemove,
  variant,
  ...props
}) => {
  const onRemoveClicked: React.MouseEventHandler = (event): void => {
    event.stopPropagation();
    onRemove?.();
  };

  return (
    <Badge
      className={cn('h-9 font-light whitespace-nowrap', className)}
      variant={variant}
      {...props}
    >
      {children}
      {withRemoveButton && (
        <div onClick={onRemoveClicked}>
          <MdOutlineClose className="size-3.5" />
        </div>
      )}
    </Badge>
  );
};
