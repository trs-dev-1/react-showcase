import {
  AddToFavoriteButton,
  PropertyImageDemo,
  useFormatProperty
} from '@/domains/property';
import { Badge } from '@/shared/components/ui/badge';
import { Card } from '@/shared/components/ui/card';
import { Separator } from '@/shared/components/ui/separator';
import { RELATION_TYPE } from '@/shared/constants/property.constants';
import { useCurrencyFormat } from '@/shared/hooks/utils';
import { useDate } from '@/shared/hooks/utils/use-date';
import { PropertyTypeDef } from '@/shared/interfaces/property/property.interfaces';
import {
  IconBath,
  IconBed,
  IconCalendar,
  IconMapPin,
  IconRuler2
} from '@tabler/icons-react';
import { useNavigate } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

type OverviewSuggestionsGridItemProps = {
  property: PropertyTypeDef;
};

export const OverviewSuggestionsGridItem: React.FC<
  OverviewSuggestionsGridItemProps
> = ({ property }) => {
  const { formatTitle, formatAddress } = useFormatProperty();
  const { formatDate } = useDate();
  const { currencyFormat } = useCurrencyFormat();
  const [t] = useTranslation();
  const navigate = useNavigate();

  const isRent = property.relationType === RELATION_TYPE.RENT;

  const onClick = () => {
    navigate({ to: '/property/$pId', params: { pId: property.id } });
  };

  return (
    <Card
      onClick={onClick}
      className="overflow-hidden p-0 hover:shadow-lg"
    >
      <div className="relative">
        <PropertyImageDemo className="aspect-video w-full rounded-none object-cover" />

        <div className="absolute top-3 right-3">
          <AddToFavoriteButton
            propertyId={property.id}
            isFavorite={property.isFavorite}
            ownerId={property.user.id}
          />
        </div>

        <div className="absolute bottom-3 left-3">
          <Badge
            variant="secondary"
            className="bg-background/90 text-foreground backdrop-blur-sm"
          >
            {isRent ? t('for-rent') : t('for-sale')}
          </Badge>
        </div>
      </div>

      <div className="flex flex-col gap-2 p-4">
        <div className="flex items-start justify-between gap-2">
          <span className="text-lg font-bold text-foreground">
            {currencyFormat(property.price)}
          </span>
        </div>

        <p className="line-clamp-1 text-sm font-medium text-foreground">
          {formatTitle({ property })}
        </p>

        <div className="flex items-center gap-1 text-muted-foreground">
          <IconMapPin className="size-3.5 shrink-0" />
          <span className="line-clamp-1 text-xs">
            {formatAddress(property)}
          </span>
        </div>

        <Separator />

        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <IconBed className="size-3.5" />
            {property.details.roomNumber}
          </span>
          <span className="flex items-center gap-1">
            <IconBath className="size-3.5" />
            {property.details.bathroomNumber}
          </span>
          <span className="flex items-center gap-1">
            <IconRuler2 className="size-3.5" />
            {property.details.surface} m²
          </span>
          <span className="ml-auto flex items-center gap-1">
            <IconCalendar className="size-3.5" />
            {formatDate({ date: property.createdAt, format: 'dd MMMM yyyy' })}
          </span>
        </div>
      </div>
    </Card>
  );
};
