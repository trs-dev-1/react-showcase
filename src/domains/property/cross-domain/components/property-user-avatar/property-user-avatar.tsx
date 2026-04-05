import { PropertyTypeDef } from '@/shared/interfaces/property/property.interfaces';
import { cn } from '@/shared/lib/utils';
import { AvatarFallback } from '@radix-ui/react-avatar';
import { FC } from 'react';
import { Avatar, AvatarImage } from '@/shared/components/ui/avatar';
import { EllipsisTooltip } from '@/shared/components/ui/ellipsis-tooltip';

type PropertyUserAvatarProps = {
  user: PropertyTypeDef['user'] | undefined;
} & React.HTMLAttributes<HTMLDivElement>;

export const PropertyUserAvatar: FC<PropertyUserAvatarProps> = ({
  user,
  className,
  ...props
}) => {
  const username = `${user?.firstName || ''} ${user?.lastName || ''}`;

  const usernameInitials = `${user?.firstName?.slice(0, 1) || 'N'}${user?.lastName?.slice(0, 1) || 'A'}`;
  return (
    <div className={cn('flex items-center gap-1', className)} {...props}>
      <Avatar className="flex items-center justify-center">
        <AvatarImage src={user?.picture || ''} />
        <AvatarFallback>{usernameInitials}</AvatarFallback>
      </Avatar>
      <EllipsisTooltip className="text-muted-foreground">
        {username}
      </EllipsisTooltip>
    </div>
  );
};
