import {
  AddToFavoriteButton,
  PriceBadge,
  PropertyImageItem,
  useFormatProperty
} from '@/domains/property';
import { Badge } from '@/shared/components/ui/badge';
import { PROPERTY_TYPE } from '@/shared/constants/property.constants';
import { PropertyPreviewDef } from '@/shared/interfaces/property/property.interfaces';
import { IconRulerMeasure } from '@tabler/icons-react';
import { FC } from 'react';
import { FaShower } from 'react-icons/fa6';
import { IoLocationOutline } from 'react-icons/io5';
import { MdMeetingRoom } from 'react-icons/md';

type PreviewPropertyGridItemProps = {
  property: PropertyPreviewDef;
  propertyType: PROPERTY_TYPE;
  onClick: (propertyId: string) => void;
};

export const PreviewPropertyGridItem: FC<PreviewPropertyGridItemProps> = ({
  property,
  propertyType,
  onClick
}) => {
  const { formatPreviewTitle } = useFormatProperty();

  return (
    <article
      className="border-border bg-card dark:hover:shadow-primary/5 flex h-40 w-full overflow-hidden rounded-xl border transition-all duration-200 hover:shadow-md"
      onClick={() => onClick(property.id)}
    >
      <div className="relative size-40 shrink-0 overflow-hidden">
        <PropertyImageItem
          className="size-40 transition-transform duration-300"
          url={property.photos[0]?.publicId}
        />
        <div className="absolute top-1.5 right-1.5 z-10">
          <AddToFavoriteButton
            className="size-7 min-w-0"
            propertyId={property.id}
            isFavorite={property.isFavorite}
            ownerId={property.ownerId}
          />
        </div>
      </div>

      <div className="flex min-w-0 flex-1 flex-col justify-between p-3">
        <div className="flex flex-col gap-0.5">
          <h2 className="truncate text-sm leading-snug font-semibold">
            {formatPreviewTitle({ property, propertyType })}
          </h2>
          <div className="text-muted-foreground flex items-center gap-1">
            <IoLocationOutline className="size-3.5 shrink-0" />
            <span className="truncate text-xs">
              {property.details.address.street}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <PriceBadge price={property.price} className="w-fit text-xs" />
          <div className="flex items-center gap-1">
            <Badge variant="secondary">
              <MdMeetingRoom className="size-3.5" />
              {property.details.roomNumber}
            </Badge>
            <Badge variant="secondary">
              <FaShower className="size-3.5" />
              {property.details.bathroomNumber}
            </Badge>
            <Badge variant="secondary">
              <IconRulerMeasure className="size-3.5" />
              {property.details.surface} m²
            </Badge>
          </div>
        </div>
      </div>
    </article>
  );
};
