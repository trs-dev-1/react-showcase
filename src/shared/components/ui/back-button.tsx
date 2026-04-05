import { cn } from '@/shared/lib/utils';
import { useTranslation } from 'react-i18next';
import { IoArrowBackOutline } from 'react-icons/io5';

type Props = React.HTMLAttributes<HTMLButtonElement>;

export default function BackButton({ className, ...props }: Props) {
  const { t } = useTranslation();

  return (
    <button
      {...props}
      className={cn(
        'text-muted-foreground hover:text-foreground hover:bg-muted -ml-1 flex w-fit items-center gap-1.5 rounded-lg px-2 py-1 text-sm transition-colors',
        className
      )}
    >
      <IoArrowBackOutline className="size-4" />
      <span>{t('back')}</span>
    </button>
  );
}
