import { IncrementalInput } from '@/shared/components/form/incremental-input/incremental-input';
import { Checkbox } from '@/shared/components/ui/checkbox';

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel
} from '@/shared/components/ui/field';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/shared/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/shared/components/ui/select';
import { Textarea } from '@/shared/components/ui/textarea';
import {
  COMMODITIES_TYPES,
  MINIMUM_LEASE_TERM_TYPES,
  PROPERTY_CONDITIONS_TYPES,
  PROPERTY_FURNITURE_TYPES,
  RELATION_TYPE
} from '@/shared/constants/property.constants';
import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { AddPropertyStepperType } from '../../schemas/add-property-stepper.schema';

export const DetailsStep = () => {
  const form = useFormContext<AddPropertyStepperType>();
  const [t] = useTranslation();

  const relationTypeIsRent =
    form.getValues('basicInfoStep.relationType') === RELATION_TYPE.RENT;

  const acceptsAMaximumNumberOfTenants = !!form.getValues(
    'detailsStep.maximumNumberOfTenants.accepts'
  );

  return (
    <FieldGroup>
      <div className="flex flex-col gap-2">
        <div className="flex w-full flex-col gap-2 md:flex-row">
          <Controller
            name="detailsStep.price"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel htmlFor="priceFieldId" required>
                  {t('price')}
                </FieldLabel>
                <Input
                  id="priceFieldId"
                  {...field}
                  placeholder={t('price')}
                  type="number"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error?.message]} />
                )}
              </Field>
            )}
          />

          <Controller
            control={form.control}
            name="detailsStep.surface"
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel htmlFor="surfaceFieldId" required>
                  {t('useful-m2')}
                </FieldLabel>
                <Input
                  id="surfaceFieldId"
                  {...field}
                  placeholder={t('useful-m2')}
                  type="number"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error?.message]} />
                )}
              </Field>
            )}
          />
        </div>

        <div className="flex w-full flex-col gap-2 md:flex-row">
          <Controller
            control={form.control}
            name="detailsStep.roomsNumber"
            render={({ field, fieldState }) => (
              <Field className="flex basis-1/2 flex-col">
                <FieldLabel>{t('the-number-of-rooms')}</FieldLabel>
                <IncrementalInput
                  initialValue={field.value}
                  onChange={field.onChange}
                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error?.message]} />
                )}
              </Field>
            )}
          />

          <Controller
            control={form.control}
            name="detailsStep.bathroomsNumber"
            render={({ field, fieldState }) => (
              <Field className="flex basis-1/2 flex-col">
                <FieldLabel>{t('the-number-of-bathrooms')}</FieldLabel>
                <IncrementalInput
                  initialValue={field.value}
                  onChange={field.onChange}
                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error?.message]} />
                )}
              </Field>
            )}
          />
        </div>

        <Controller
          name="detailsStep.propertyConditions"
          control={form.control}
          render={({ field }) => (
            <Field>
              <FieldLabel>{t('status')}</FieldLabel>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex flex-col space-y-1"
              >
                {PROPERTY_CONDITIONS_TYPES.map(({ value, labelKey }) => (
                  <div key={value} className="flex items-center gap-3">
                    <RadioGroupItem
                      value={value}
                      id={`propertyConditions-${value}`}
                    />
                    <Label htmlFor={`propertyConditions-${value}`}>
                      {t(labelKey)}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </Field>
          )}
        />

        {relationTypeIsRent && (
          <div className="flex flex-col gap-2">
            <Controller
              control={form.control}
              name="detailsStep.maximumNumberOfTenants.accepts"
              render={({ field, fieldState }) => (
                <Field className="flex flex-col">
                  <FieldLabel>
                    {t('do-you-accept-a-maximum-number-of-tenants')}
                  </FieldLabel>
                  <div className="flex items-center gap-1">
                    <Checkbox
                      id="maximumNumberOfTenantsAcceptsCheckbox"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />

                    <FieldLabel htmlFor="maximumNumberOfTenantsAcceptsCheckbox">
                      {t('yes')}
                    </FieldLabel>
                  </div>

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error?.message]} />
                  )}
                </Field>
              )}
            />

            {acceptsAMaximumNumberOfTenants && (
              <Controller
                control={form.control}
                name="detailsStep.maximumNumberOfTenants.value"
                render={({ field, fieldState }) => (
                  <Field className="flex flex-col">
                    <FieldLabel>
                      {t('the-maximum-number-of-tenants')}
                    </FieldLabel>
                    <IncrementalInput
                      initialValue={field.value}
                      onChange={field.onChange}
                      max={10}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error?.message]} />
                    )}
                  </Field>
                )}
              />
            )}
          </div>
        )}

        <Controller
          control={form.control}
          name="detailsStep.hasElevator"
          render={({ field, fieldState }) => (
            <Field className="flex flex-col">
              <span>{t('does-it-have-an-elevator')}</span>
              <div className="flex items-center gap-1">
                <Checkbox
                  id="hasElevatorCheckbox"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
                <FieldLabel htmlFor="hasElevatorCheckbox">
                  {t('yes')}
                </FieldLabel>
              </div>

              {fieldState.invalid && (
                <FieldError errors={[fieldState.error?.message]} />
              )}
            </Field>
          )}
        />

        <Controller
          control={form.control}
          name="detailsStep.propertyFurniture"
          render={({ field }) => (
            <Field className="flex flex-col">
              <FieldLabel>{t('conditions')}</FieldLabel>

              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex flex-col space-y-1"
              >
                {PROPERTY_FURNITURE_TYPES.map(({ value, labelKey }) => (
                  <div key={value} className="flex items-center gap-3">
                    <RadioGroupItem
                      value={value}
                      id={`propertyFurniture-${value}`}
                    />
                    <FieldLabel
                      htmlFor={`propertyFurniture-${value}`}
                      className="font-normal"
                    >
                      {t(labelKey)}
                    </FieldLabel>
                  </div>
                ))}
              </RadioGroup>
            </Field>
          )}
        />

        <div className="flex flex-col gap-2">
          <span>{t('other-conditions')}</span>
          {COMMODITIES_TYPES.map(({ formControlName, labelKey }) => (
            <Controller
              key={formControlName}
              control={form.control}
              name={`detailsStep.${formControlName}`}
              render={({ field }) => (
                <Field className="flex flex-col">
                  <div className="flex items-center gap-1">
                    <Checkbox
                      id={`commodity-${formControlName}`}
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                    <FieldLabel htmlFor={`commodity-${formControlName}`}>
                      {t(labelKey)}
                    </FieldLabel>
                  </div>
                </Field>
              )}
            />
          ))}
        </div>

        <Controller
          name="detailsStep.petFriendly"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field className="flex flex-col">
              <span>{t('do-you-accept-pets')}</span>
              <div className="flex items-center gap-1">
                <Checkbox
                  id="petFriendlyCheckbox"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />

                <FieldLabel htmlFor="petFriendlyCheckbox">
                  {t('yes-i-accept-pets')}
                </FieldLabel>
              </div>

              {fieldState.invalid && (
                <FieldError errors={[fieldState.error?.message]} />
              )}
            </Field>
          )}
        />

        <Controller
          control={form.control}
          name="detailsStep.description"
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel htmlFor="descriptionFieldId">
                {t('property-description')}
              </FieldLabel>
              <Textarea
                id="descriptionFieldId"
                placeholder={`${t('property-description')}...`}
                rows={4}
                className="resize-none"
                {...field}
              />

              {fieldState.invalid && (
                <FieldError errors={[fieldState.error?.message]} />
              )}
            </Field>
          )}
        />

        <div className="flex w-full flex-col gap-2 md:flex-row">
          <Controller
            control={form.control}
            name="detailsStep.condominiumExpenses"
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel htmlFor="condominiumExpensesFieldId">
                  {t('monthly-condominium-expenses')} €
                </FieldLabel>
                <Input
                  id="condominiumExpensesFieldId"
                  {...field}
                  placeholder={t('monthly-condominium-expenses')}
                  type="number"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error?.message]} />
                )}
              </Field>
            )}
          />

          <Controller
            control={form.control}
            name="detailsStep.agencyFee"
            render={({ field, fieldState }) => (
              <Field className="basis-1/2">
                <FieldLabel htmlFor="agencyFeeFieldId">
                  {t('agency-fee')} €
                </FieldLabel>
                <Input
                  id="agencyFeeFieldId"
                  {...field}
                  placeholder={t('agency-fee')}
                  type="number"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error?.message]} />
                )}
              </Field>
            )}
          />
        </div>

        <div className="flex w-full flex-col gap-2 md:flex-row">
          {relationTypeIsRent && (
            <>
              <Controller
                control={form.control}
                name="detailsStep.rentInAdvance"
                render={({ field, fieldState }) => (
                  <Field className="basis-1/2">
                    <FieldLabel htmlFor="rentInAdvanceFieldId">
                      {t('security-deposit')}
                    </FieldLabel>
                    <Input
                      id="rentInAdvanceFieldId"
                      {...field}
                      placeholder={t('security-deposit')}
                      type="number"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error?.message]} />
                    )}
                  </Field>
                )}
              />

              <div className="mt-2 flex basis-1/2 flex-col space-y-2">
                <FieldLabel
                  htmlFor="minimumLeaseTermValueFieldId"
                  className="mb-0.5"
                >
                  {t('minimum-lease-term')}
                </FieldLabel>
                <div className="flex gap-2">
                  <Controller
                    name="detailsStep.minimumLeaseTerm.value"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field>
                        <Input
                          id="minimumLeaseTermValueFieldId"
                          {...field}
                          placeholder={t('minimum-lease-term')}
                          type="number"
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error?.message]} />
                        )}
                      </Field>
                    )}
                  />

                  <Controller
                    control={form.control}
                    name="detailsStep.minimumLeaseTerm.type"
                    render={({ field, fieldState }) => (
                      <Field className="basis-1/2">
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {MINIMUM_LEASE_TERM_TYPES.map(
                              ({ value, labelKey }) => (
                                <SelectItem key={value} value={value}>
                                  {t(labelKey)}
                                </SelectItem>
                              )
                            )}
                          </SelectContent>
                        </Select>

                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error?.message]} />
                        )}
                      </Field>
                    )}
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </FieldGroup>
  );
};
