import {
  PropertyCommoditiesBadges,
  PropertyImageItem,
  PropertyViews,
  useFormatProperty
} from '@/domains/property';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/shared/components/ui/card';
import { PropertyTypeDef } from '@/shared/interfaces/property/property.interfaces';
import { IoLocationOutline } from 'react-icons/io5';
import { UserPropertyGridItemActions } from './user-properties-grid-item-actions';
import { EllipsisTooltip } from '@/shared/components/ui/ellipsis-tooltip';

type UserPropertiesGridItemProps = {
  property: PropertyTypeDef;
};

export const UserPropertiesGridItem: React.FC<UserPropertiesGridItemProps> = ({
  property
}) => {
  const { formatTitle } = useFormatProperty();
  return (
    <Card className="relative">
      <CardHeader className="flex flex-row gap-4">
        <div className="flex w-fit flex-col">
          <div className="flex items-center gap-1">
            <CardTitle>
              <EllipsisTooltip>{formatTitle({ property })}</EllipsisTooltip>
            </CardTitle>
            <UserPropertyGridItemActions propertyId={property.id} />
          </div>
          <CardDescription className="flex items-center gap-1">
            <IoLocationOutline className="size-5" />

            <EllipsisTooltip>{property.details.address.street}</EllipsisTooltip>

            <PropertyViews className="text-foreground" views={property.views} />
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <PropertyImageItem
          className="w-full rounded-md"
          url={property.photos[0]?.publicId}
        />
        <PropertyCommoditiesBadges
          className="h-fit w-full"
          property={property}
        />
      </CardContent>
    </Card>
  );
};
