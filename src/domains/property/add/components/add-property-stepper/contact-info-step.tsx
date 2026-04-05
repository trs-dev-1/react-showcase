import { PhoneNumberSelect } from '@/shared/components/form/phone-number-select/phone-number-select';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel
} from '@/shared/components/ui/field';
import { Label } from '@/shared/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/shared/components/ui/radio-group';
import {
  CONTACT_TYPE,
  CONTACT_TYPES
} from '@/shared/constants/property.constants';
import { Controller, useFormContext, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { AddPropertyStepperType } from '../../schemas/add-property-stepper.schema';

export const ContactInfoStep = () => {
  const form = useFormContext<AddPropertyStepperType>();
  const [t] = useTranslation();
  const contactType = useWatch({
    control: form.control,
    name: 'contactInfoStep.contactType'
  });
  const contactTypeIsNotJustChat = contactType !== CONTACT_TYPE.JUST_CHAT;

  return (
    <FieldGroup>
      <div className="flex flex-col gap-2">
        <div className="flex w-full flex-col gap-2 md:flex-row">
          <Controller
            control={form.control}
            name="contactInfoStep.contactType"
            render={({ field }) => (
              <Field>
                <Label>{t('how-would-you-like-to-be-contacted')}</Label>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  {CONTACT_TYPES.map(({ value, labelKey }) => (
                    <div key={labelKey} className="flex items-center gap-3">
                      <RadioGroupItem
                        value={value}
                        id={`contactInfoStep.contactType.${value}`}
                      />
                      <Label htmlFor={`contactInfoStep.contactType.${value}`}>
                        {t(labelKey)}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </Field>
            )}
          />

          {contactTypeIsNotJustChat && (
            <Controller
              name="contactInfoStep.phone"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field className="basis-1/2">
                  <FieldLabel htmlFor="contactInfoStep.phone" required>
                    {t('phone-number')}
                  </FieldLabel>
                  <PhoneNumberSelect
                    id="contactInfoStep.phone"
                    phoneNumberList={[]}
                    withAddButton
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error?.message]} />
                  )}
                </Field>
              )}
            />
          )}
        </div>
      </div>
    </FieldGroup>
  );
};
