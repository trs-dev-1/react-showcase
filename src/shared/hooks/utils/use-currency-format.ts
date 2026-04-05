import { CurrencyType } from '@/shared/interfaces/currency/currency.interfaces';
import { useTranslation } from 'react-i18next';

export const useCurrencyFormat = () => {
  const [_, i18n] = useTranslation();

  const currencyFormat = ({ amount, currency }: CurrencyType) =>
    new Intl.NumberFormat(i18n.language, {
      style: 'currency',
      currency,
      maximumFractionDigits: 0
    }).format(+amount);

  return { currencyFormat };
};
