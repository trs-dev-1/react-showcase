import { useAuthModal, useUserState } from '@/domains/auth';
import { useNavigate } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { IoIosAdd } from 'react-icons/io';
import { Button, ButtonProps } from '@/shared/components/ui/button';
import { HoverTapEffect } from '@/shared/components/ui/hover-tap-effect';

export const AddPropertyButton: React.FC<ButtonProps> = ({
  className,
  ...props
}) => {
  const navigate = useNavigate();
  const user = useUserState();
  const [t] = useTranslation();
  const { onOpen } = useAuthModal();

  const onAddProperty = () => {
    if (user) {
      navigate({ to: '/property/add' });
    } else {
      onOpen({
        redirectData: {
          to: '/property/add'
        }
      });
    }
  };
  return (
    <HoverTapEffect>
      <Button
        variant="gradient"
        className={className}
        onClick={onAddProperty}
        {...props}
      >
        {t('add-property')} <IoIosAdd className="size-6" />
      </Button>
    </HoverTapEffect>
  );
};
