import { useAuthModal, useUserState } from '@/domains/auth';
import { AddToFavoriteButton, SharePropertyButton } from '@/domains/property';
import { Button } from '@/shared/components/ui/button';
import { CONTACT_TYPE } from '@/shared/constants/property.constants';
import { PropertyTypeDef } from '@/shared/interfaces/property/property.interfaces';
import { cn } from '@/shared/lib/utils';
import { useNavigate } from '@tanstack/react-router';
import { HTMLAttributes } from 'react';
import { useTranslation } from 'react-i18next';
import { AiFillMessage } from 'react-icons/ai';
import { IoCall } from 'react-icons/io5';

type PropertyActionsProps = {
  propertyData: PropertyTypeDef;
  withoutFavoriteButton?: boolean;
  withShareBtn?: boolean;
} & HTMLAttributes<HTMLDivElement>;

export const PropertyActions: React.FC<PropertyActionsProps> = ({
  propertyData,
  withShareBtn,
  withoutFavoriteButton,
  className,
  ...props
}) => {
  const user = useUserState();
  const [t] = useTranslation();
  const navigate = useNavigate();
  const { onOpen } = useAuthModal();
  const contactType = propertyData.contactPreference;
  const canMessageProperty = propertyData.user.id !== user?.id;

  const onPrivateMessage = () => {
    if (!user?.id) {
      return onOpen({ redirectData: 'current_path' });
    }

    if (canMessageProperty) {
      navigate({
        to: '/messages/$pId/$userId',
        params: { pId: propertyData.id, userId: propertyData.user.id }
      });
    }
  };

  return (
    <div className={cn('flex w-full items-center gap-2', className)} {...props}>
      {contactType === CONTACT_TYPE.ALL && (
        <>
          <Button
            className="flex w-fit grow items-center gap-1"
            variant="outline"
          >
            <IoCall />
            {t('call')}
          </Button>
          <span className="h-4 border-l-2"></span>
        </>
      )}

      <Button
        className="flex w-fit grow items-center gap-1"
        variant="outline"
        onClick={onPrivateMessage}
        disabled={!canMessageProperty}
      >
        <AiFillMessage />
        {t('message')}
      </Button>

      {!withoutFavoriteButton && (
        <>
          <span className="h-4 border-l-2"></span>
          <AddToFavoriteButton
            propertyId={propertyData.id}
            isFavorite={propertyData.isFavorite}
            ownerId={propertyData.user.id}
          />
        </>
      )}

      {withShareBtn && (
        <>
          <span className="h-4 border-l-2"></span>
          <SharePropertyButton propertyId={propertyData.id} />
        </>
      )}
    </div>
  );
};
