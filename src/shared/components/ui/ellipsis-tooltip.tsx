import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/shared/components/ui/tooltip';
import { cn } from '@/shared/lib/utils';
import { useResizeObserver } from '@mantine/hooks';
import { ClassValue } from 'clsx';
import { useEffect, useState } from 'react';

type TooltipPosition = 'bottom' | 'top' | 'left' | 'right';

const isTruncated = (element: HTMLSpanElement | null): boolean => {
  if (!element) {
    return false;
  }
  return element.offsetWidth < element.scrollWidth;
};

interface EllipsisTooltipProps {
  children: string;
  className?: ClassValue;
  tooltipPosition?: TooltipPosition;
  delay?: number;
}

export function EllipsisTooltip({
  children,
  className,
  tooltipPosition = 'bottom',
  delay = 200
}: EllipsisTooltipProps) {
  const [truncated, setTruncated] = useState(false);
  const [hovered, setHovered] = useState(false);

  const [resizeRef, rect] = useResizeObserver<HTMLSpanElement>();

  useEffect(() => {
    setTruncated(isTruncated(resizeRef.current));
  }, [children, rect, setTruncated, resizeRef]);

  return (
    <Tooltip delayDuration={delay} open={truncated && hovered}>
      <TooltipTrigger asChild>
        <span className={cn('dynamic-ellipsis', className)}>
          <span
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            ref={resizeRef}
          >
            {children}
          </span>
        </span>
      </TooltipTrigger>
      <TooltipContent side={tooltipPosition}>
        <span>{children}</span>
      </TooltipContent>
    </Tooltip>
  );
}
