import { useTranslation } from 'react-i18next';

export const usePluralize = () => {
  const [t] = useTranslation();

  const pluralizeRoom = (count: number) =>
    count === 1 ? t('room') : t('rooms');

  const pluralizeBathroom = (count: number) =>
    count === 1 ? t('bathroom') : t('bathrooms');

  const pluralizeMonth = (count: number) =>
    count === 1 ? t('month') : t('months');

  const pluralizeDay = (count: number) => (count === 1 ? t('day') : t('days'));

  return { pluralizeRoom, pluralizeBathroom, pluralizeMonth, pluralizeDay };
};
