import { PropertyTypeDef } from '@/shared/interfaces/property/property.interfaces';

import {
  PriceBadge,
  PropertyCommoditiesBadges,
  PropertyContractDetailsBadges,
  PropertyImageSlider,
  PropertyListedDate,
  PropertyUserAvatar,
  PropertyViews
} from '@/domains/property';
import { Separator } from '@/shared/components/ui/separator';
import { cn } from '@/shared/lib/utils';
import { IconRulerMeasure } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import { FaShower } from 'react-icons/fa6';
import { MdMeetingRoom } from 'react-icons/md';

type Props = {
  property: PropertyTypeDef;
  className?: string;
};

export const PropertyDetailsContent: React.FC<Props> = ({
  property,
  className
}) => {
  const [t] = useTranslation();

  return (
    <article className={cn('flex flex-col gap-4', className)}>
      <PropertyImageSlider
        className="xs:h-[300px] h-[400px] select-none sm:h-[300px]"
        images={property.photos}
      />

      {/* Key stats strip */}
      <div className="grid grid-cols-3 divide-x divide-border rounded-xl border border-border bg-muted/40 py-2">
        <div className="flex flex-col items-center gap-0.5 px-2">
          <MdMeetingRoom className="size-5" />
          <span className="text-sm font-semibold">
            {property.details.roomNumber}
          </span>
          <span className="text-muted-foreground text-[10px] uppercase tracking-wide">
            {t('rooms')}
          </span>
        </div>
        <div className="flex flex-col items-center gap-0.5 px-2">
          <FaShower className="size-4" />
          <span className="text-sm font-semibold">
            {property.details.bathroomNumber}
          </span>
          <span className="text-muted-foreground text-[10px] uppercase tracking-wide">
            {t('bathrooms')}
          </span>
        </div>
        <div className="flex flex-col items-center gap-0.5 px-2">
          <IconRulerMeasure className="size-5" />
          <span className="text-sm font-semibold">
            {property.details.surface} m²
          </span>
          <span className="text-muted-foreground text-[10px] uppercase tracking-wide">
            {t('surface')}
          </span>
        </div>
      </div>

      {/* Meta: listed date + views */}
      <div className="text-muted-foreground flex items-center gap-2 text-xs">
        <PropertyListedDate
          createdAt={property.createdAt}
          updatedAt={property.updatedAt}
        />
        <div className="bg-border h-3 w-px rounded-full" />
        <PropertyViews views={property.views} />
      </div>

      {/* Price section */}
      <div className="flex flex-col gap-2">
        <PriceBadge
          className="w-full text-sm font-semibold"
          label="price"
          price={property.price}
        />
        {(!!property.contractDetails.agencyFee.amount ||
          !!property.expensesMonthly.amount) && (
          <div className="flex flex-wrap gap-2">
            {!!property.contractDetails.agencyFee.amount && (
              <PriceBadge
                className="flex-1 text-xs"
                label="agency-fee"
                variant="outline"
                price={property.contractDetails.agencyFee}
              />
            )}
            {!!property.expensesMonthly.amount && (
              <PriceBadge
                className="flex-1 text-xs"
                variant="outline"
                label="monthly-expenses"
                price={property.expensesMonthly}
              />
            )}
          </div>
        )}
      </div>

      {/* Agent */}
      <PropertyUserAvatar user={property.user} />

      <Separator />

      {/* Contract details */}
      <div className="flex flex-col gap-2">
        <span className="text-muted-foreground text-xs font-medium uppercase tracking-wide">
          {t('contract-details')}
        </span>
        <PropertyContractDetailsBadges propertyData={property} />
      </div>

      {/* Commodities */}
      <div className="flex flex-col gap-2">
        <span className="text-muted-foreground text-xs font-medium uppercase tracking-wide">
          {t('commodities')}
        </span>
        <PropertyCommoditiesBadges property={property} />
      </div>

      {/* Description */}
      {property.description && (
        <div className="flex flex-col gap-1.5">
          <span className="text-muted-foreground text-xs font-medium uppercase tracking-wide">
            {t('description')}
          </span>
          <p className="text-foreground/80 line-clamp-4 text-sm leading-relaxed">
            {property.description}
          </p>
        </div>
      )}
    </article>
  );
};
