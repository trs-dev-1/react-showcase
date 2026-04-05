import { useTranslation } from 'react-i18next';

export const useNumberFormat = (props?: Intl.NumberFormatOptions) => {
  const { i18n } = useTranslation();

  const numberFormat = (number: number) => {
    const formatter = new Intl.NumberFormat(i18n.language, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
      ...(props ?? {})
    });

    return formatter.format(number);
  };

  return { numberFormat };
};
