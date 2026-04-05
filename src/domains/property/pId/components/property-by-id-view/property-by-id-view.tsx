import { Button } from '@/shared/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/shared/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/shared/components/ui/carousel';
import { Container } from '@/shared/components/ui/container';
import { Separator } from '@/shared/components/ui/separator';
import { useState } from 'react';

import {
  AddToFavoriteButton,
  PriceBadge,
  PropertyActions,
  PropertyCommoditiesBadges,
  PropertyContractDetailsBadges,
  PropertyImageItem,
  PropertyImageLightbox,
  PropertyListedDate,
  PropertyUserAvatar,
  PropertyViews,
  SharePropertyButton,
  useFormatProperty
} from '@/domains/property';
import { CustomGoogleMap, GoogleMapsApiLoader } from '@/shared/components/map';
import { useCarouselSlide, useCurrencyFormat } from '@/shared/hooks/utils';
import { PropertyTypeDef } from '@/shared/interfaces/property/property.interfaces';
import { IconArrowsMaximize, IconPhotoOff } from '@tabler/icons-react';
import { AdvancedMarker } from '@vis.gl/react-google-maps';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { IoLocationOutline } from 'react-icons/io5';
import { motion } from 'framer-motion';

type PropertyByIdViewProps = {
  property: PropertyTypeDef;
};

const DESC_LIMIT = 400;

export const PropertyByIdView: FC<PropertyByIdViewProps> = ({ property }) => {
  const [t] = useTranslation();
  const { formatAddress, formatTitle } = useFormatProperty();
  const { currencyFormat } = useCurrencyFormat();
  const { setApi, currentSlide } = useCarouselSlide();
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const totalSlides = property.photos.length;
  const isLongDescription = (property.description?.length ?? 0) > DESC_LIMIT;

  return (
    <div className="flex flex-col">
      {/* Hero Carousel */}
      <div className="relative h-[85dvh] w-full overflow-hidden">
        {property.photos.length > 0 ? (
          <Carousel className="h-full w-full" setApi={setApi}>
            <CarouselContent className="h-full">
              {property.photos.map(({ publicId }, index) => (
                <CarouselItem
                  className="h-[85dvh] cursor-zoom-in"
                  key={publicId}
                  onClick={() => {
                    setLightboxIndex(index);
                    setLightboxOpen(true);
                  }}
                >
                  <PropertyImageItem
                    className="rounded-none object-cover"
                    url={publicId}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselPrevious className="absolute top-1/2 left-4 z-30 -translate-y-1/2 border-white/30 bg-white/20 text-white backdrop-blur-sm hover:bg-white/30" />
            <CarouselNext className="absolute top-1/2 right-4 z-30 -translate-y-1/2 border-white/30 bg-white/20 text-white backdrop-blur-sm hover:bg-white/30" />
          </Carousel>
        ) : (
          <div className="from-muted to-background flex h-full w-full items-center justify-center bg-linear-to-br">
            <div className="-mt-16 flex flex-col items-center gap-5">
              <div className="border-border bg-muted rounded-full border p-8">
                <IconPhotoOff className="text-muted-foreground/40 size-14" />
              </div>
              <p className="text-muted-foreground/60 text-xs font-medium tracking-[0.2em] uppercase">
                {t('no-image-available')}
              </p>
            </div>
          </div>
        )}

        {/* Bottom gradient overlay */}
        <div className="pointer-events-none absolute inset-0 z-10 bg-linear-to-t from-black/70 via-black/20 to-transparent" />

        {/* Title + price overlay */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease: 'easeOut' }}
          className="absolute right-0 bottom-0 left-0 z-20 p-6 text-white sm:p-10"
        >
          <h1 className="text-2xl font-bold drop-shadow-md sm:text-3xl">
            {formatTitle({ property, displayRelation: true })}
          </h1>
          <div className="mt-2 text-3xl font-extrabold drop-shadow-md sm:text-4xl">
            {currencyFormat(property.price)}
          </div>
        </motion.div>

        {/* Photo counter + expand */}
        {totalSlides > 0 && (
          <div className="absolute right-6 bottom-6 z-20 flex items-center gap-2">
            <span className="rounded-full bg-black/40 px-3 py-1 text-xs text-white backdrop-blur-sm">
              {currentSlide} / {totalSlides}
            </span>
            <button
              className="rounded-full bg-black/40 p-1.5 text-white backdrop-blur-sm transition-colors hover:bg-black/60"
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex(currentSlide - 1);
                setLightboxOpen(true);
              }}
              aria-label="View full image"
            >
              <IconArrowsMaximize className="size-4" />
            </button>
          </div>
        )}
      </div>

      {/* Main content */}
      <Container className="py-6">
        {/* Meta bar — always full width, above the grid */}
        <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center">
          <div className="flex min-w-0 items-center gap-2">
            <PropertyListedDate
              createdAt={property.createdAt}
              updatedAt={property.updatedAt}
            />
            <div className="border-foreground h-2 rounded-md border-l border-solid" />
            <PropertyViews views={property.views} />
          </div>
          <div className="flex items-center gap-1 sm:ml-auto">
            <AddToFavoriteButton
              propertyId={property.id}
              isFavorite={property.isFavorite}
              ownerId={property.user.id}
            />
            <SharePropertyButton propertyId={property.id} />
          </div>
        </div>

        <div className="flex flex-col gap-6 lg:grid lg:grid-cols-[1fr_360px] lg:items-start lg:gap-8">
          {/* LEFT column */}
          <div className="order-2 flex min-w-0 flex-col gap-6 lg:order-1">
            {/* Description */}
            {property.description && (
              <Card>
                <CardHeader>
                  <CardTitle>{t('description')}</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-3">
                  <p className="text-sm leading-relaxed">
                    {isLongDescription && !showFullDescription
                      ? property.description.slice(0, DESC_LIMIT) + '…'
                      : property.description}
                  </p>
                  {isLongDescription && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="self-start px-0"
                      onClick={() => setShowFullDescription((prev) => !prev)}
                    >
                      {showFullDescription ? t('read-less') : t('read-more')}
                    </Button>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Commodities */}
            <Card>
              <CardHeader>
                <CardTitle>{t('commodities')}</CardTitle>
              </CardHeader>
              <CardContent>
                <PropertyCommoditiesBadges property={property} />
              </CardContent>
            </Card>

            {/* Map */}
            <div className="flex flex-col gap-2">
              <h2 className="flex items-center gap-1 leading-none tracking-tight">
                <IoLocationOutline className="size-5" />
                {formatAddress(property)}
              </h2>
              <div className="w-full overflow-hidden rounded-lg">
                <GoogleMapsApiLoader libraries={['drawing', 'marker']}>
                  <CustomGoogleMap
                    defaultCenter={{
                      lat: property.details.address.latitude,
                      lng: property.details.address.longitude
                    }}
                    defaultZoom={18}
                    width="100%"
                    height={500}
                  >
                    <AdvancedMarker
                      position={{
                        lat: property.details.address.latitude,
                        lng: property.details.address.longitude
                      }}
                    />
                  </CustomGoogleMap>
                </GoogleMapsApiLoader>
              </div>
            </div>
          </div>

          {/* RIGHT sticky sidebar */}
          <div className="order-1 flex flex-col gap-4 lg:sticky lg:top-4 lg:order-2">
            {/* Price card */}
            <Card>
              <CardContent className="flex flex-col gap-3 pt-6">
                <div className="text-3xl font-bold">
                  {currencyFormat(property.price)}
                </div>
                <div className="flex flex-wrap gap-2">
                  {!!property.contractDetails.agencyFee.amount && (
                    <PriceBadge
                      variant="outline"
                      label="agency-fee"
                      price={property.contractDetails.agencyFee}
                    />
                  )}
                  {!!property.expensesMonthly.amount && (
                    <PriceBadge
                      variant="outline"
                      label="monthly-expenses"
                      price={property.expensesMonthly}
                    />
                  )}
                </div>
                <Separator />
                <PropertyContractDetailsBadges propertyData={property} />
              </CardContent>
            </Card>

            {/* Contact card */}
            <Card>
              <CardHeader>
                <CardTitle>{t('contact-info')}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-3">
                <PropertyUserAvatar user={property.user} />
                <PropertyActions
                  propertyData={property}
                  withoutFavoriteButton
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </Container>

      <PropertyImageLightbox
        photos={property.photos}
        initialIndex={lightboxIndex}
        open={lightboxOpen}
        onOpenChange={setLightboxOpen}
      />
    </div>
  );
};
