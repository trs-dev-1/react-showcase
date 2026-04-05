import { AddressAutocomplete } from '@/shared/components/form/address-autocomplete/address-autocomplete';
import { PropertyTypeSelect } from '@/shared/components/form/property-type-select/property-type-select';
import { RelationTypeSelect } from '@/shared/components/form/relation-type-select/relation-type-select';
import { Checkbox } from '@/shared/components/ui/checkbox';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel
} from '@/shared/components/ui/field';
import { Input } from '@/shared/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/shared/components/ui/select';
import {
  APARTMENT_FLOOR_TYPES,
  HOUSE_FLOOR_TYPES,
  PROPERTY_TYPE
} from '@/shared/constants/property.constants';
import { useEffect } from 'react';
import { Controller, useFormContext, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { AddPropertyStepperType } from '../../schemas/add-property-stepper.schema';

export const BasicInfoStep = () => {
  const form = useFormContext<AddPropertyStepperType>();
  const [t] = useTranslation();

  const propertyType = useWatch({
    control: form.control,
    name: 'basicInfoStep.type'
  });
  const isApartment = propertyType === PROPERTY_TYPE.APARTMENT;

  useEffect(() => {
    if (propertyType && !isApartment) {
      const maxValue = HOUSE_FLOOR_TYPES[HOUSE_FLOOR_TYPES.length - 1].value;
      const fieldValue = form.getValues('basicInfoStep.floor') as string;

      if (fieldValue > maxValue) {
        form.resetField('basicInfoStep.floor');
      }
    }
  }, [propertyType]);

  return (
    <FieldGroup>
      <div className="flex flex-col gap-2">
        <div className="flex w-full flex-col gap-2 md:flex-row">
          <Controller
            name="basicInfoStep.type"
            control={form.control}
            render={({ field }) => (
              <Field className="basis-1/2">
                <FieldLabel htmlFor="propertyTypeField">
                  {t('property-type')}
                </FieldLabel>

                <PropertyTypeSelect
                  id="propertyTypeField"
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                />
              </Field>
            )}
          />
          <Controller
            name="basicInfoStep.relationType"
            control={form.control}
            render={({ field }) => (
              <Field className="mt-auto basis-1/2">
                <RelationTypeSelect
                  id="relationTypeField"
                  defaultValue={field.value}
                  onValueChange={field.onChange}
                />
              </Field>
            )}
          />
        </div>

        <div className="flex w-full flex-col gap-2 md:flex-row">
          <Controller
            name="basicInfoStep.address"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field className="basis-1/2">
                <FieldLabel htmlFor="addressField" required>
                  {t('address')}
                </FieldLabel>
                <AddressAutocomplete
                  id="addressField"
                  defaultValue={field.value}
                  onChange={field.onChange}
                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error?.message]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="basicInfoStep.residentialComplex"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field className="basis-1/2">
                <FieldLabel htmlFor="residentialComplexField">
                  {t('residential-complex')}
                </FieldLabel>
                <Input
                  id="residentialComplexField"
                  {...field}
                  placeholder={t('residential-complex')}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error?.message]} />
                )}
              </Field>
            )}
          />
        </div>

        <div className="flex w-full flex-col gap-2 md:w-1/2">
          <Controller
            name="basicInfoStep.floor"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel htmlFor="floorField" required>
                  {t(isApartment ? 'floor' : 'house-floors')}
                </FieldLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger id="floorField">
                    <SelectValue placeholder={t('floor')} />
                  </SelectTrigger>
                  <SelectContent>
                    {(isApartment
                      ? APARTMENT_FLOOR_TYPES
                      : HOUSE_FLOOR_TYPES
                    ).map(({ value, labelKey }) => (
                      <SelectItem key={value} value={value}>
                        {t(labelKey)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error?.message]} />
                )}
              </Field>
            )}
          />

          {isApartment && (
            <Controller
              name="basicInfoStep.lastFloor"
              control={form.control}
              render={({ field }) => (
                <Field className="justify-end" orientation="horizontal">
                  <FieldLabel
                    htmlFor="lastBuildingCheckbox"
                    className="max-w-fit"
                  >
                    {t('the-top-floor-of-the-building')}
                  </FieldLabel>
                  <Checkbox
                    id="lastBuildingCheckbox"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </Field>
              )}
            />
          )}
        </div>
      </div>
    </FieldGroup>
  );
};
