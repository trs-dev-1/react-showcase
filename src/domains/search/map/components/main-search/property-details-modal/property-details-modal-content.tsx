import { TryAgainButton } from '@/shared/components/buttons/try-again-button';
import {
  PropertyActions,
  useFormatProperty,
  useGetPropertyById
} from '@/domains/property';
import { DrawerFooter } from '@/shared/components/ui/drawer';
import { DrawerModalContent } from '@/shared/components/ui/drawer-modal/drawer-modal-content';
import { Spinner } from '@/shared/components/ui/spinner';
import { useSearch } from '@tanstack/react-router';
import { useEffect } from 'react';
import { PropertyDetailsContent } from '../side-property-details/property-details/property-details-content';

type PropertyDetailsModalContentProps = {
  onTitleLoaded: (title: string) => void;
};

const PropertyDetailsModalContent: React.FC<
  PropertyDetailsModalContentProps
> = ({ onTitleLoaded }) => {
  const pId = useSearch({ from: '__root__', select: (s) => s.pId });
  const {
    isLoading,
    isError,
    data: property,
    refetch
  } = useGetPropertyById({ pId });
  const { formatTitle } = useFormatProperty();

  useEffect(() => {
    if (property) {
      onTitleLoaded(formatTitle({ property }));
    }

    return () => onTitleLoaded('');
  }, [property]);

  return (
    <>
      <DrawerModalContent>
        {isLoading && <Spinner center />}
        {isError && <TryAgainButton onRetry={refetch} />}
        {!isLoading && !isError && property && (
          <div className="h-full overflow-y-auto">
            <PropertyDetailsContent className="mb-4" property={property} />
          </div>
        )}
      </DrawerModalContent>
      <DrawerFooter className="min-h-9">
        {property && <PropertyActions propertyData={property} withShareBtn />}
      </DrawerFooter>
    </>
  );
};
export default PropertyDetailsModalContent;
