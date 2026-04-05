import { useFormatProperty, useGetPropertyById } from '@/domains/property';
import { TryAgainButton } from '@/shared/components/buttons/try-again-button';
import BackButton from '@/shared/components/ui/back-button';
import { Spinner } from '@/shared/components/ui/spinner';
import { useEffect } from 'react';
import { PropertyDetailsContent } from '../side-property-details/property-details/property-details-content';

type Props = {
  pId: string;
  onBack: () => void;
  onTitleReady: (title: string) => void;
};

export const SidePropertyDetailsMobile: React.FC<Props> = ({
  pId,
  onBack,
  onTitleReady
}) => {
  const { formatTitle } = useFormatProperty();
  const { data, isLoading, isError, refetch } = useGetPropertyById({
    pId
  });

  useEffect(() => {
    if (data) {
      onTitleReady(formatTitle({ property: data }));
    }
  }, [data]);

  const closeIcon = (
    <BackButton className="absolute top-0 left-3" onClick={onBack} />
  );

  if (isLoading) {
    return (
      <div className="h-full">
        {closeIcon}
        <Spinner center />
      </div>
    );
  }

  if (isError) {
    <div className="h-full">
      {closeIcon}
      <TryAgainButton onRetry={refetch} />
    </div>;
  }

  if (!data) {
    return null;
  }

  return (
    <div className="flex h-full flex-col">
      <div className="h-full overflow-y-auto">
        {closeIcon}
        <PropertyDetailsContent property={data} />
      </div>
    </div>
  );
};
