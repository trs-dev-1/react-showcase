import {
  AddToFavoriteButton,
  PriceBadge,
  PropertyCommoditiesBadges,
  PropertyImageDemo,
  useFormatProperty
} from '@/domains/property';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/shared/components/ui/card';
import { useDate } from '@/shared/hooks/utils/use-date';
import { PropertyTypeDef } from '@/shared/interfaces/property/property.interfaces';
import { useNavigate } from '@tanstack/react-router';
import { CiCalendar } from 'react-icons/ci';
import { IoLocationOutline } from 'react-icons/io5';

type SearchListItemProps = {
  property: PropertyTypeDef;
};

export const SearchListItem: React.FC<SearchListItemProps> = ({ property }) => {
  const navigate = useNavigate();
  const { formatTitle, formatAddress } = useFormatProperty();
  const { formatDate } = useDate();

  const onClick = () => {
    navigate({ to: '/property/$pId', params: { pId: property.id } });
  };
  return (
    <Card
      className="flex flex-col overflow-hidden md:flex-row"
      onClick={onClick}
    >
      <PropertyImageDemo className="h-full w-full md:w-64 md:rounded-tr-none md:rounded-br-none" />
      <div className="flex flex-col">
        <CardHeader className="py-2">
          <CardTitle className="inline-block truncate font-semibold">
            <div className="flex items-center justify-between gap-2">
              <CardTitle>{formatTitle({ property })}</CardTitle>

              <AddToFavoriteButton
                propertyId={property.id}
                isFavorite={property.isFavorite}
                ownerId={property.user.id}
              />
            </div>
          </CardTitle>
          <CardDescription className="flex items-center gap-1">
            <IoLocationOutline className="size-5 min-w-5" />
            <span className="truncate">{formatAddress(property)}</span>
            <PriceBadge price={property.price} className="ml-auto w-fit" />
          </CardDescription>
        </CardHeader>
        <CardContent className="h-full pb-2">
          <article className="flex h-full flex-col gap-2 md:flex-row">
            <div className="flex w-full flex-col gap-2">
              <PropertyCommoditiesBadges property={property} />

              <div className="mt-auto flex items-center justify-end gap-1">
                <CiCalendar className="size-5" />
                <span className="text-muted-foreground text-sm leading-3">
                  {formatDate({
                    date: property.createdAt,
                    format: 'dd MMMM yyyy'
                  })}
                </span>
              </div>
            </div>
          </article>
        </CardContent>
      </div>
    </Card>
  );
};
