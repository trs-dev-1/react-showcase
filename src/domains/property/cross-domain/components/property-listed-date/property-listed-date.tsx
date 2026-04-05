import { useDate } from '@/shared/hooks/utils';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { BsCalendar2Date } from 'react-icons/bs';

type PropertyListedDateProps = {
  createdAt: string;
  updatedAt: string;
};

export const PropertyListedDate: FC<PropertyListedDateProps> = ({
  createdAt,
  updatedAt
}) => {
  const { formatDate } = useDate();
  const [t] = useTranslation();
  const hasBeenUpdated = updatedAt && createdAt !== updatedAt;

  return (
    <div className="flex w-fit items-center gap-1">
      <BsCalendar2Date className="size-3" />

      <span className="text-foreground text-xs leading-4">
        {hasBeenUpdated && t('last-updated') + ': '}
        {formatDate({
          date: hasBeenUpdated ? updatedAt : createdAt,
          format: 'dd MMMM yyyy'
        })}
      </span>
    </div>
  );
};
