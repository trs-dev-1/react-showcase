import { Button } from '@/shared/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/shared/components/ui/dropdown-menu';
import { cn } from '@/shared/lib/utils';
import { useNavigate } from '@tanstack/react-router';
import { LucideProps, MoreHorizontal } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { FaRegEdit } from 'react-icons/fa';
import { GoEyeClosed } from 'react-icons/go';
import { IoReload } from 'react-icons/io5';

export const UserPropertyGridItemActions: React.FC<
  LucideProps & { propertyId: string }
> = ({ propertyId, className, ...props }) => {
  const [t] = useTranslation();
  const navigate = useNavigate();

  const onViewProperty = () => {
    navigate({ to: '/property/$pId', params: { pId: propertyId } });
  };

  const onEditProperty = () => {
    navigate({ to: '/property/add', search: { pId: propertyId } });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreHorizontal className={cn('size-5', className)} {...props} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>{t('actions')}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="flex items-center gap-1"
          onClick={onViewProperty}
        >
          <FaRegEdit />
          {t('view')}
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex items-center gap-1"
          onClick={onEditProperty}
        >
          <FaRegEdit />
          {t('edit')}
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center gap-1">
          <GoEyeClosed />
          {t('disable')}
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center gap-1">
          <IoReload />
          {t('re-activate')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
