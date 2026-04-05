import { cn } from '@/shared/lib/utils';
import { IconPhotoOff } from '@tabler/icons-react';
import { ClassValue } from 'clsx';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

type NoImageAvailablePlaceholderProps = {
  className?: ClassValue;
};

export const NoImageAvailablePlaceholder: FC<
  NoImageAvailablePlaceholderProps
> = ({ className }) => {
  const [t] = useTranslation();

  return (
    <div
      className={cn(
        'flex aspect-square size-full flex-col items-center justify-center gap-3 bg-muted/50',
        className
      )}
    >
      <div className="rounded-full border border-border bg-muted p-5">
        <IconPhotoOff className="size-8 text-muted-foreground/50" />
      </div>
      <p className="text-center text-xs font-medium uppercase tracking-widest text-muted-foreground/60">
        {t('no-image-available')}
      </p>
    </div>
  );
};
