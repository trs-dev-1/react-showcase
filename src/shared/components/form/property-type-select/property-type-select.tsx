import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/shared/components/ui/select';
import { PROPERTY_TYPES } from '@/shared/constants/property.constants';
import { SelectProps } from '@radix-ui/react-select';
import { useTranslation } from 'react-i18next';

export const PropertyTypeSelect: React.FC<SelectProps & { id?: string }> = (
  props
) => {
  const [t] = useTranslation();

  return (
    <Select {...props}>
      <SelectTrigger id={props.id}>
        <SelectValue placeholder={t('property-type')} />
      </SelectTrigger>
      <SelectContent>
        {PROPERTY_TYPES.map(({ type, labelKey }) => (
          <SelectItem key={type} value={type}>
            {t(labelKey)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
