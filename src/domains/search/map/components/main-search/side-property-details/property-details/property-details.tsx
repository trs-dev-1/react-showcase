import {
  OpenPropertyInExternalLink,
  PropertyActions,
  useFormatProperty,
  useGetPropertyById
} from '@/domains/property';
import { TryAgainButton } from '@/shared/components/buttons/try-again-button';
import BackButton from '@/shared/components/ui/back-button';
import {
  CardContent,
  CardFooter,
  CardHeader
} from '@/shared/components/ui/card';
import { Spinner } from '@/shared/components/ui/spinner';
import { useSetQueryFilters } from '@/shared/hooks/search-params/use-set-query-filters';
import { IoLocationOutline } from 'react-icons/io5';
import { PropertyDetailsContent } from './property-details-content';

type PropertyDetailsProps = {
  pId: string;
};

export const PropertyDetails: React.FC<PropertyDetailsProps> = ({ pId }) => {
  const setQueries = useSetQueryFilters();
  const { data, isLoading, isError, refetch } = useGetPropertyById({
    pId
  });

  const { formatTitle } = useFormatProperty();

  if (isLoading) {
    return <Spinner center />;
  }

  if (isError) {
    return <TryAgainButton center onRetry={refetch} />;
  }

  if (!data) {
    return null;
  }

  return (
    <>
      <CardHeader className="gap-2">
        <BackButton
          className="relative -left-[3px]"
          onClick={() => setQueries({ pId: '' })}
        />

        <div className="flex w-full items-start justify-between gap-3">
          <h1 className="text-base leading-snug font-semibold">
            {formatTitle({ property: data })}
          </h1>
          <OpenPropertyInExternalLink pId={data.id} />
        </div>

        <div className="text-muted-foreground flex items-center gap-1">
          <IoLocationOutline className="size-4 shrink-0" />
          <span className="truncate text-sm">
            {data.details.address.street}
          </span>
        </div>
      </CardHeader>

      <CardContent className="h-[calc(100dvh-332px)] overflow-y-auto">
        <PropertyDetailsContent property={data!} />
      </CardContent>

      <CardFooter>
        <div className="w-full border-t py-2">
          <PropertyActions propertyData={data} withShareBtn />
        </div>
      </CardFooter>
    </>
  );
};
