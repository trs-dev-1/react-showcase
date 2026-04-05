import { cn } from '@/shared/lib/utils';
import { useTranslation } from 'react-i18next';

type SeparatorWithTextProps = {
  textKey: string;
  lowercaseText?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

export const SeparatorWithText: React.FC<SeparatorWithTextProps> = ({
  textKey,
  className,
  lowercaseText,
  ...props
}) => {
  const [t] = useTranslation();

  return (
    <div
      className={cn(
        'after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t',
        className
      )}
      {...props}
    >
      <span className="bg-background text-muted-foreground relative z-10 px-2">
        {lowercaseText ? t(textKey).toLowerCase() : t(textKey)}
      </span>
    </div>
  );
};
