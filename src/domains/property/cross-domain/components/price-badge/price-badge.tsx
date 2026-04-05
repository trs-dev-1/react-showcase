import { useCurrencyFormat } from '@/shared/hooks/utils';
import { CurrencyType } from '@/shared/interfaces/currency/currency.interfaces';
import { cn } from '@/shared/lib/utils';
import { useTranslation } from 'react-i18next';
import { Badge, BadgeProps } from '@/shared/components/ui/badge';

type PriceBadgeProps = {
  price: CurrencyType;
  label?: string;
} & BadgeProps;

export const PriceBadge: React.FC<PriceBadgeProps> = ({
  price,
  label = '',
  className,
  ...props
}) => {
  const [t] = useTranslation();
  const { currencyFormat } = useCurrencyFormat();

  return (
    <Badge className={cn('w-full whitespace-nowrap', className)} {...props}>
      <span className="w-full text-center">
        {label ? t(label) + ': ' : ''}
        {currencyFormat(price)}
      </span>
    </Badge>
  );
};
