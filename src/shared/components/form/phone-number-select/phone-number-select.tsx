import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/shared/components/ui/select';
import { useModal } from '@/shared/hooks/utils/use-modal';
import { useToast } from '@/shared/hooks/utils/use-toast';
import { SelectProps } from '@radix-ui/react-select';
import { useTranslation } from 'react-i18next';
import { IoIosAdd } from 'react-icons/io';
import { Button } from '../../ui/button';

type PhoneNumberSelectProps = SelectProps & {
  phoneNumberList: string[];
  withAddButton?: boolean;
  id?: string;
};

export const PhoneNumberSelect: React.FC<PhoneNumberSelectProps> = (props) => {
  const { phoneNumberList, withAddButton, ...rest } = props;
  const [t] = useTranslation();
  const { onOpen } = useModal();
  const { toast } = useToast();

  const onShowWarning = (open: boolean) => {
    if (open && phoneNumberList.length === 0) {
      toast({
        message: t('no-phone-number-added-yet'),
        type: 'warning'
      });
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Select {...rest} onOpenChange={onShowWarning}>
        <SelectTrigger id={props.id}>
          <SelectValue placeholder={t('phone-number')} />
        </SelectTrigger>
        <SelectContent>
          {phoneNumberList.map((number) => (
            <SelectItem key={number} value={number}>
              {number}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {withAddButton && (
        <Button
          variant="outline"
          size="icon"
          type="button"
          onClick={() => onOpen('add-phone-number')}
        >
          <IoIosAdd className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
};
