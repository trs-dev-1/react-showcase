import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/shared/components/ui/select';
import { RelationOptions } from '@/shared/constants/property.constants';
import { SelectProps } from '@radix-ui/react-select';
import { useTranslation } from 'react-i18next';

export const RelationTypeSelect: React.FC<SelectProps & { id?: string }> = (
  props
) => {
  const [t] = useTranslation();

  return (
    <Select {...props}>
      <SelectTrigger id={props.id}>
        <SelectValue placeholder={t('property-type')} />
      </SelectTrigger>
      <SelectContent>
        {RelationOptions.map(({ value, labelKey }) => (
          <SelectItem key={value} value={value}>
            {t(labelKey)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
