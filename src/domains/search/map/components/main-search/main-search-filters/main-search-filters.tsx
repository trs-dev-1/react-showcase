import { AddressAutocomplete } from '@/shared/components/form/address-autocomplete/address-autocomplete';
import { Button } from '@/shared/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/shared/components/ui/select';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/shared/components/ui/tooltip';
import {
  PROPERTY_TYPE,
  RELATION_TYPE
} from '@/shared/constants/property.constants';
import { useBasicFiltersParams } from '@/shared/hooks/search-params/use-basic-filters-params';
import { useLatLngParams } from '@/shared/hooks/search-params/use-lat-lng-params';
import { useSetQueryFilters } from '@/shared/hooks/search-params/use-set-query-filters';
import { useMediaQuery } from '@/shared/hooks/utils/use-media-query';
import { AddressAutocompleteValueDef } from '@/shared/interfaces/forms/address-autocomplete.interfaces';
import { useSearch } from '@tanstack/react-router';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { FaFilter } from 'react-icons/fa';
import {
  MAIN_SEARCH_PROPERTY_TYPE_OPTIONS,
  MAIN_SEARCH_PROPERTY_TYPES
} from '../../../constants/main-search.constants';
import { useAdvancedFiltersModal } from '../../../hooks/use-advanced-filters-modal';
import { MainSearchQuickFilters } from './main-search-quick-filters';

export const MainSearchFilters = () => {
  const [t] = useTranslation();
  const { onOpen } = useAdvancedFiltersModal();
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const basicFilters = useBasicFiltersParams();
  const latLng = useLatLngParams();
  const city = useSearch({ from: '__root__', select: (params) => params.city });

  const setQueries = useSetQueryFilters();

  const cityAddress: AddressAutocompleteValueDef = {
    inputValue: city || '',
    ...latLng
  };

  const onCityChanged = useCallback(
    ({ city, lat, lng }: AddressAutocompleteValueDef): void => {
      if (city && lat) {
        setQueries({
          city,
          lat: lat.toString(),
          lng: lng.toString()
        });
      }
    },
    [setQueries]
  );

  return (
    <div className="flex gap-2">
      {isDesktop && (
        <div className="flex gap-2">
          <Select
            value={basicFilters.pt}
            onValueChange={(pt: PROPERTY_TYPE) => setQueries({ pt })}
          >
            <SelectTrigger className="w-fit">
              <SelectValue placeholder={t('property-type')} />
            </SelectTrigger>
            <SelectContent>
              {MAIN_SEARCH_PROPERTY_TYPES.map(({ type, labelKey }) => (
                <SelectItem key={type} value={type}>
                  {t(labelKey)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={basicFilters.rt}
            onValueChange={(relationType) =>
              setQueries({
                rt: relationType as RELATION_TYPE
              })
            }
          >
            <SelectTrigger className="w-fit">
              <SelectValue placeholder={t('property-type')} />
            </SelectTrigger>
            <SelectContent>
              {MAIN_SEARCH_PROPERTY_TYPE_OPTIONS.map(({ value, labelKey }) => (
                <SelectItem key={value} value={value}>
                  {t(labelKey)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <AddressAutocomplete
            className="w-full lg:w-fit"
            placeholderKey="city"
            type="(cities)"
            defaultValue={cityAddress}
            onChange={onCityChanged}
          />
        </div>
      )}
      <div className="flex h-[46px] snap-x snap-mandatory gap-2 overflow-x-auto lg:snap-none">
        <MainSearchQuickFilters isDesktop={isDesktop} />
      </div>
      <TooltipProvider>
        <Tooltip delayDuration={100}>
          <TooltipTrigger asChild>
            <Button
              className="ml-auto lg:ml-0"
              type="button"
              variant="outline"
              size="icon"
              onClick={() => onOpen()}
            >
              <FaFilter />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">{t('filters')}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};
