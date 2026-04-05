import { Card } from '@/shared/components/ui/card';
import {
  PROPERTY_TYPE,
  RELATION_TYPE
} from '@/shared/constants/property.constants';
import { useSetQueryFilters } from '@/shared/hooks/search-params/use-set-query-filters';
import { useNavigate } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

type CategoryCardProps = {
  titleKey: string;
  countKey: string;
  icon: React.ReactNode;
  propertyType: PROPERTY_TYPE;
  relationType: RELATION_TYPE;
};

export const CategoryCard = ({
  titleKey,
  countKey,
  icon,
  propertyType,
  relationType
}: CategoryCardProps) => {
  const { t } = useTranslation();
  const setQueries = useSetQueryFilters();
  const navigate = useNavigate();

  const handleClick = () => {
    setQueries({ pt: propertyType, rt: relationType });
    navigate({ to: '/search/map' });
  };

  return (
    <Card
      className="cursor-pointer p-5 transition-all hover:border-primary/40 hover:shadow-lg"
      onClick={handleClick}
    >
      <div className="flex flex-col gap-3">
        <div className="w-fit rounded-xl bg-primary/10 p-3 dark:bg-primary/20">
          {icon}
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="font-medium text-foreground">{t(titleKey)}</span>
          <span className="text-sm text-muted-foreground">{t(countKey)}</span>
        </div>
      </div>
    </Card>
  );
};
