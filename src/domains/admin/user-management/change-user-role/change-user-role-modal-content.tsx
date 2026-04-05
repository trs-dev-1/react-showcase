import { type RoleType } from '@/domains/auth';
import { ROLE_ICON_MAP } from '@/shared/constants/role-icon-map.constant';
import { useModal } from '@/shared/hooks/utils/use-modal';
import { cn } from '@/shared/lib/utils';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/shared/components/ui/button';
import { DrawerFooter } from '@/shared/components/ui/drawer';
import { DrawerModalContent } from '@/shared/components/ui/drawer-modal/drawer-modal-content';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/shared/components/ui/select';
import { useChangeUserRoleMutation } from './use-change-user-role-mutation';

const ChangeUserRoleModalContent = () => {
  const [chosenRole, setChosenRole] = useState<RoleType>('USER');

  const [t] = useTranslation();
  const { onClose, data } = useModal();
  const { isPending, isSuccess, mutate } = useChangeUserRoleMutation();
  const roles: RoleType[] = ['MODERATOR', 'USER'];

  const onSubmit = () => {
    mutate({ role: chosenRole, userId: data.changeUserRole!.userId });
  };

  useEffect(() => {
    if (isSuccess) {
      onClose();
    }
  }, [isSuccess]);

  return (
    <>
      <DrawerModalContent>
        <div className="flex flex-col justify-center gap-2 py-2">
          <Select
            defaultValue={chosenRole}
            onValueChange={(value) => setChosenRole(value as RoleType)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={t('phone-number')} />
            </SelectTrigger>
            <SelectContent>
              {roles.map((role) => {
                const iconMeta = ROLE_ICON_MAP[role];
                return (
                  <SelectItem key={role} value={role}>
                    <div className="flex items-center gap-1">
                      {role}
                      {iconMeta && (
                        <iconMeta.Icon
                          className={cn(iconMeta.class, 'size-6')}
                        />
                      )}
                    </div>
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>
      </DrawerModalContent>
      <DrawerFooter>
        <Button onClick={onSubmit} isLoading={isPending}>
          {t('change-role')}
        </Button>
      </DrawerFooter>
    </>
  );
};
export default ChangeUserRoleModalContent;
