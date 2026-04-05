import { QueryFiltersSearchParams } from '@/routes/__root';
import { AddressAutocomplete } from '@/shared/components/form/address-autocomplete/address-autocomplete';
import { IncrementalInput } from '@/shared/components/form/incremental-input/incremental-input';
import { RelationTypeSelect } from '@/shared/components/form/relation-type-select/relation-type-select';
import { Button } from '@/shared/components/ui/button';
import { Checkbox } from '@/shared/components/ui/checkbox';
import { DrawerFooter } from '@/shared/components/ui/drawer';
import { DrawerModalContent } from '@/shared/components/ui/drawer-modal/drawer-modal-content';
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
import {
  COMMODITIES_TYPE,
  COMMODITIES_TYPES,
  PROPERTY_CONDITIONS_TYPE,
  PROPERTY_CONDITIONS_TYPES,
  PROPERTY_FURNITURE_TYPE,
  PROPERTY_FURNITURE_TYPES,
  PROPERTY_TYPE,
  RELATION_TYPE
} from '@/shared/constants/property.constants';
import { useLatLngParams } from '@/shared/hooks/search-params/use-lat-lng-params';
import { useSetQueryFilters } from '@/shared/hooks/search-params/use-set-query-filters';
import { useScrollIntoView } from '@/shared/hooks/utils/use-scroll-into-view';
import { QueryFiltersParamsKeys } from '@/shared/interfaces/property/property.interfaces';
import { AddressAutocompleteValueDefSchema } from '@/shared/schemas/address-autocomplete.schema';
import { numberGreaterThanZeroValidator } from '@/shared/validators/number-greater-than-zero.validator';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSearch } from '@tanstack/react-router';
import { useEffect, useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import * as z from 'zod';
import { MAIN_SEARCH_PROPERTY_TYPES } from '../../constants/main-search.constants';
import { useAdvancedFiltersModal } from '../../hooks/use-advanced-filters-modal';
import { usePatchAddFormFromQueries } from '../../hooks/use-patch-add-form-from-queries';

const formSchema = z.object({
  type: z.enum(PROPERTY_TYPE),
  relationType: z.enum(RELATION_TYPE),
  city: AddressAutocompleteValueDefSchema,
  priceFrom: z.string().superRefine(numberGreaterThanZeroValidator),
  priceUpTo: z.string().superRefine(numberGreaterThanZeroValidator),
  surface: z.string().superRefine(numberGreaterThanZeroValidator),
  withoutRentInAdvance: z.boolean().optional(),
  propertyConditions: z.enum(PROPERTY_CONDITIONS_TYPE).optional(),
  propertyFurniture: z.enum(PROPERTY_FURNITURE_TYPE).optional(),
  roomsNumber: z.coerce.number(),
  bathroomsNumber: z.coerce.number(),
  hasElevator: z.boolean().optional(),
  petFriendly: z.boolean().optional(),
  [COMMODITIES_TYPE.AIR_CONDITIONING]: z.boolean().optional(),
  [COMMODITIES_TYPE.BALCONY]: z.boolean().optional(),
  [COMMODITIES_TYPE.CELLAR]: z.boolean().optional(),
  [COMMODITIES_TYPE.GARAGE]: z.boolean().optional(),
  [COMMODITIES_TYPE.TERRACE]: z.boolean().optional(),
  [COMMODITIES_TYPE.WARDROBE_ON_THE_WALL]: z.boolean().optional()
});

export type AdvancedFiltersType = z.infer<typeof formSchema>;

export const addFiltersDefaultValues: AdvancedFiltersType = {
  type: PROPERTY_TYPE.APARTMENT,
  relationType: RELATION_TYPE.RENT,
  city: {
    inputValue: '',
    lat: 0,
    lng: 0
  },
  priceFrom: '',
  priceUpTo: '',
  surface: '',
  withoutRentInAdvance: false,
  propertyConditions: undefined,
  propertyFurniture: undefined,
  bathroomsNumber: 0,
  roomsNumber: 0,
  petFriendly: false,
  hasElevator: false,
  [COMMODITIES_TYPE.AIR_CONDITIONING]: false,
  [COMMODITIES_TYPE.BALCONY]: false,
  [COMMODITIES_TYPE.CELLAR]: false,
  [COMMODITIES_TYPE.GARAGE]: false,
  [COMMODITIES_TYPE.TERRACE]: false,
  [COMMODITIES_TYPE.WARDROBE_ON_THE_WALL]: false
};

const AdvancedFiltersModalContent = () => {
  const { isOpen, onClose, data } = useAdvancedFiltersModal();
  const [t] = useTranslation();
  const form = useForm<AdvancedFiltersType>({
    resolver: zodResolver(formSchema) as any,
    defaultValues: addFiltersDefaultValues
  });
  const formRef = useRef<HTMLFormElement | null>(null);
  const latLng = useLatLngParams();
  const setQueries = useSetQueryFilters();
  const city = useSearch({ from: '__root__', select: (params) => params.city });
  const patchFormFromQueries = usePatchAddFormFromQueries();
  const scrollIntoView = useScrollIntoView();

  function getDataAutomation(key: QueryFiltersParamsKeys): string {
    return `AdvancedFiltersModal-${key}`;
  }

  useEffect(() => {
    if (isOpen) {
      if (data.focusFieldKey) {
        scrollIntoView(
          `[data-automation='${getDataAutomation(data.focusFieldKey)}']`
        );
      }
      patchFormFromQueries(form);
    }
  }, [isOpen]);

  function onSubmit(data: AdvancedFiltersType) {
    const filters: QueryFiltersSearchParams = {
      lat: data.city.lat.toString(),
      lng: data.city.lng.toString(),
      city: data.city.inputValue,
      rt: data.relationType as RELATION_TYPE,
      pt: data.type as PROPERTY_TYPE,
      pc: data.propertyConditions as PROPERTY_CONDITIONS_TYPE,
      pf: data.propertyFurniture as PROPERTY_FURNITURE_TYPE,
      airC: data.air_conditioning,
      wotw: data.wardrobe_on_the_wall,
      balcony: data.balcony,
      cellar: data.cellar,
      terrace: data.terrace,
      garage: data.garage,
      hasElevator: data.hasElevator,
      page: '0',
      petF: data.petFriendly,
      bn: data.bathroomsNumber,
      priceF: data.priceFrom,
      priceT: data.priceUpTo,
      rn: data.roomsNumber,
      surface: data.surface,
      wria: data.withoutRentInAdvance
    };
    setQueries(filters, { merge: false });
    onClose();
  }

  function removeFilters() {
    const filters: QueryFiltersSearchParams = {
      lat: latLng.lat.toString(),
      lng: latLng.lng.toString(),
      city,
      rt: addFiltersDefaultValues.relationType as RELATION_TYPE,
      pt: addFiltersDefaultValues.type as PROPERTY_TYPE,
      pc: addFiltersDefaultValues.propertyConditions as PROPERTY_CONDITIONS_TYPE,
      pf: addFiltersDefaultValues.propertyFurniture as PROPERTY_FURNITURE_TYPE
    };
    setQueries(filters, { merge: false });
    onClose();
  }

  function triggerSubmit() {
    formRef.current?.requestSubmit();
  }

  const operationTypeIsRent =
    form.getValues('relationType') === RELATION_TYPE.RENT;

  return (
    <>
      <DrawerModalContent>
        <form
          className="flex flex-col gap-2 p-2"
          onSubmit={form.handleSubmit(onSubmit)}
          ref={formRef}
        >
          <FieldGroup>
            <div className="flex w-full flex-col gap-2 sm:flex-row">
              <Controller
                control={form.control}
                name="type"
                render={({ field }) => (
                  <Field className="basis-1/2">
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger data-automation={getDataAutomation('pt')}>
                        <SelectValue placeholder={t('property-type')} />
                      </SelectTrigger>
                      <SelectContent>
                        {MAIN_SEARCH_PROPERTY_TYPES.map(
                          ({ type, labelKey }) => (
                            <SelectItem key={type} value={type}>
                              {t(labelKey)}
                            </SelectItem>
                          )
                        )}
                      </SelectContent>
                    </Select>
                  </Field>
                )}
              />

              <Controller
                control={form.control}
                name="relationType"
                render={({ field }) => (
                  <Field>
                    <RelationTypeSelect
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                      data-automation={getDataAutomation('rt')}
                    />
                  </Field>
                )}
              />
            </div>

            <Controller
              control={form.control}
              name="city"
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>{t('city')}</FieldLabel>
                  <AddressAutocomplete
                    type="(cities)"
                    placeholderKey="city"
                    defaultValue={field.value}
                    onChange={field.onChange}
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error?.message]} />
                  )}
                </Field>
              )}
            />

            <div className="flex flex-col gap-2 sm:flex-row">
              <Controller
                control={form.control}
                name="priceFrom"
                render={({ field, fieldState }) => (
                  <Field className="w-full md:w-1/2">
                    <FieldLabel>{t('price-from')}</FieldLabel>
                    <Input
                      {...field}
                      placeholder={t('price-from')}
                      type="number"
                      data-automation={getDataAutomation('priceF')}
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error?.message]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                control={form.control}
                name="priceUpTo"
                render={({ field, fieldState }) => (
                  <Field className="w-full md:w-1/2">
                    <FieldLabel>{t('price-up-to')}</FieldLabel>
                    <Input
                      {...field}
                      placeholder={t('price-up-to')}
                      type="number"
                      data-automation={getDataAutomation('priceT')}
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error?.message]} />
                    )}
                  </Field>
                )}
              />
            </div>

            <div className="flex flex-col gap-2 sm:flex-row">
              <Controller
                control={form.control}
                name="surface"
                render={({ field, fieldState }) => (
                  <Field className={operationTypeIsRent ? '' : 'w-full'}>
                    <FieldLabel>{t('useful-m2')}</FieldLabel>
                    <Input
                      {...field}
                      placeholder={t('useful-m2')}
                      type="number"
                      data-automation={getDataAutomation('surface')}
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error?.message]} />
                    )}
                  </Field>
                )}
              />

              {operationTypeIsRent && (
                <Controller
                  name="withoutRentInAdvance"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-automation={getDataAutomation('wria')}>
                      <FieldLabel>{t('rent-in-advance')}</FieldLabel>
                      <div className="flex items-center gap-1">
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                        <FieldLabel>// TO BE REPLACED</FieldLabel>
                      </div>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error?.message]} />
                      )}
                    </Field>
                  )}
                />
              )}
            </div>

            <Controller
              control={form.control}
              name="propertyConditions"
              render={({ field, fieldState }) => (
                <Field className="w-full">
                  <FieldLabel>{t('status')}</FieldLabel>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    {PROPERTY_CONDITIONS_TYPES.map(({ value, labelKey }) => (
                      <div key={value} className="flex items-center gap-3">
                        <RadioGroupItem value={value} />
                        <Label className="font-normal">{t(labelKey)}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error?.message]} />
                  )}
                </Field>
              )}
            />

            <Controller
              control={form.control}
              name="propertyFurniture"
              render={({ field }) => (
                <Field data-automation={getDataAutomation('pf')}>
                  <FieldLabel>{t('conditions')}</FieldLabel>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    {PROPERTY_FURNITURE_TYPES.map(({ value, labelKey }) => (
                      <div key={value} className="flex items-center gap-3">
                        <RadioGroupItem value={value} />
                        <Label className="font-normal">{t(labelKey)}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </Field>
              )}
            />

            <Controller
              control={form.control}
              name="roomsNumber"
              render={({ field, fieldState }) => (
                <Field
                  className="flex flex-col"
                  data-automation={getDataAutomation('rn')}
                >
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
              name="bathroomsNumber"
              render={({ field, fieldState }) => (
                <Field data-automation={getDataAutomation('bn')}>
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

            <Controller
              control={form.control}
              name="hasElevator"
              render={({ field, fieldState }) => (
                <Field data-automation={getDataAutomation('hasElevator')}>
                  <FieldLabel>{t('with-elevator')}</FieldLabel>
                  <div className="flex items-center gap-1">
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                    <FieldLabel>{t('yes')}</FieldLabel>
                  </div>

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error?.message]} />
                  )}
                </Field>
              )}
            />

            <Controller
              control={form.control}
              name="petFriendly"
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>{t('pets')}</FieldLabel>
                  <div className="flex items-center gap-1">
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                    <FieldLabel>{t('pet-friendly')}</FieldLabel>
                  </div>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error?.message]} />
                  )}
                </Field>
              )}
            />

            <div className="flex flex-col gap-2">
              <FieldLabel>{t('other-conditions')}</FieldLabel>
              {COMMODITIES_TYPES.map(
                ({ formControlName, labelKey, paramKey }) => (
                  <Controller
                    key={formControlName}
                    control={form.control}
                    name={formControlName}
                    render={({ field }) => (
                      <Field
                        className="flex flex-col"
                        data-automation={getDataAutomation(paramKey)}
                      >
                        <div className="flex items-center gap-1">
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                          <FieldLabel>{t(labelKey)}</FieldLabel>
                        </div>
                      </Field>
                    )}
                  />
                )
              )}
            </div>
          </FieldGroup>
        </form>
      </DrawerModalContent>
      <DrawerFooter>
        <Button className="w-full" onClick={triggerSubmit}>
          {t('apply')}
        </Button>

        <Button className="w-full" variant="outline" onClick={removeFilters}>
          {t('reset-filters')}
        </Button>
      </DrawerFooter>
    </>
  );
};
export default AdvancedFiltersModalContent;
