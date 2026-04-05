import { useGetPropertyById } from '@/domains/property';
import { Spinner } from '@/shared/components/ui/spinner';
import { AddPropertyStepper } from '../add-property-stepper/add-property-stepper';

type CreateUpdatePropertyProps = { pId: string };

export const CreateUpdateProperty: React.FC<CreateUpdatePropertyProps> = ({
  pId
}) => {
  const { isLoading, data: property } = useGetPropertyById({ pId });

  if (isLoading) {
    return <Spinner center />;
  }

  return <AddPropertyStepper editMode={!!pId} property={property} />;
};
