import { environment } from '@/environment';
import { cn } from '@/shared/lib/utils';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { IconBaseProps } from 'react-icons/lib';
import { LuExternalLink } from 'react-icons/lu';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/shared/components/ui/tooltip';

type OpenPropertyInExternalLinkProps = {
  pId: string;
} & IconBaseProps;

export const OpenPropertyInExternalLink: FC<
  OpenPropertyInExternalLinkProps
> = ({ pId, className, ...props }) => {
  const [t] = useTranslation();
  const onClick = () => {
    window.open(`${environment.baseURL}property/${pId}`, '_blank');
  };

  return (
    <TooltipProvider>
      <Tooltip delayDuration={300}>
        <TooltipTrigger>
          <LuExternalLink
            data-slot="open-in-external-link"
            className={cn('size-5 min-w-5 hover:opacity-70', className)}
            {...props}
            onClick={onClick}
          />
        </TooltipTrigger>
        <TooltipContent side="bottom">
          {t('open-in-external-tab')}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
