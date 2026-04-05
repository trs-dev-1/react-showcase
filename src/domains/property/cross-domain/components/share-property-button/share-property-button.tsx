import { useToast } from '@/shared/hooks/utils/use-toast';
import { FC } from 'react';
import { RxShare2 } from 'react-icons/rx';
import { Button } from '@/shared/components/ui/button';

type SharePropertyButtonProps = {
  propertyId: string;
};

export const SharePropertyButton: FC<SharePropertyButtonProps> = ({
  propertyId
}) => {
  const { toast } = useToast();

  const onShare = () => {
    navigator.clipboard.writeText(
      `${window.location.origin}/property/${propertyId}`
    );

    toast({
      message: 'the-link-has-been-copied',
      type: 'info'
    });
  };
  return (
    <Button variant="outline" size="icon" onClick={onShare}>
      <RxShare2 className="size-4" />
    </Button>
  );
};
