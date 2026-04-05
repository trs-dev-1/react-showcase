import { i18nSupported } from '@/shared/constants/i18n.constants';
import { DateFnsFormatType } from '@/shared/interfaces/date-fns/date-fns.interfaces';
import { format as date_fns_format } from 'date-fns';
import { enUS, ro, ru, type Locale } from 'date-fns/locale';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

const dateFnsLocalesLiterals: Record<i18nSupported, Locale> = {
  [i18nSupported.EN]: enUS,
  [i18nSupported.RO]: ro,
  [i18nSupported.RU]: ru
};

type FormatPayload = {
  date: string | Date;
  format: DateFnsFormatType;
};

export const useDate = () => {
  const [_, i18n] = useTranslation();

  const formatDate = useCallback(
    ({ date, format }: FormatPayload): string =>
      date_fns_format(new Date(date), format, {
        locale: dateFnsLocalesLiterals[i18n.language as i18nSupported]
      }),
    [i18n.language]
  );

  return { formatDate };
};
