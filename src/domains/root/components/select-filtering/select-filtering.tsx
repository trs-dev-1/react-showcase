import {
  MAIN_SEARCH_PROPERTY_TYPE_OPTIONS,
  MAIN_SEARCH_PROPERTY_TYPES
} from '@/domains/search';
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
  PROPERTY_TYPE,
  RELATION_TYPE
} from '@/shared/constants/property.constants';
import { useBasicFiltersParams } from '@/shared/hooks/search-params/use-basic-filters-params';
import { useLatLngParams } from '@/shared/hooks/search-params/use-lat-lng-params';
import { useSetQueryFilters } from '@/shared/hooks/search-params/use-set-query-filters';
import { AddressAutocompleteValueDef } from '@/shared/schemas/address-autocomplete.schema';
import { useNavigate, useSearch } from '@tanstack/react-router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IoSearchOutline } from 'react-icons/io5';
import {
  SearchModeType,
  SelectSearchMode
} from '../select-search-mode/select-search-mode';

export const SelectFiltering = () => {
  const [t] = useTranslation();
  const [searchMode, setSearchMode] = useState<SearchModeType>('map');
  const city = useSearch({ from: '__root__', select: (params) => params.city });
  const setQueries = useSetQueryFilters();
  const latLng = useLatLngParams();
  const basicFilters = useBasicFiltersParams();
  const currentSearch = useSearch({ from: '__root__' });
  const navigate = useNavigate();

  const cityAddress: AddressAutocompleteValueDef = {
    inputValue: city || '',
    ...latLng
  };

  function onCityChanged({
    city,
    lat,
    lng
  }: AddressAutocompleteValueDef): void {
    if (city && lat) {
      setQueries({
        city,
        lat: lat.toString(),
        lng: lng.toString()
      });
    }
  }

  const onNavigateToSearch = () => {
    navigate({
      to: searchMode === 'map' ? '/search/map' : '/search/list',
      search: currentSearch
    });
  };

  return (
    <div className="flex w-fit max-w-3xl flex-col items-center gap-6">
      <div className="border-border bg-card/80 rounded-2xl border p-4 shadow-xl backdrop-blur-sm">
        <div className="flex flex-col gap-2 sm:flex-row">
          <div className="flex gap-2">
            <Select
              value={basicFilters.pt}
              onValueChange={(pt: PROPERTY_TYPE) => setQueries({ pt })}
            >
              <SelectTrigger className="basis-1/2 md:w-fit">
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
              <SelectTrigger className="basis-1/2 md:w-fit">
                <SelectValue placeholder={t('property-type')} />
              </SelectTrigger>
              <SelectContent>
                {MAIN_SEARCH_PROPERTY_TYPE_OPTIONS.map(
                  ({ value, labelKey }) => (
                    <SelectItem key={value} value={value}>
                      {t(labelKey)}
                    </SelectItem>
                  )
                )}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <AddressAutocomplete
              className="w-full lg:w-fit"
              placeholderKey="city"
              type="(cities)"
              defaultValue={cityAddress}
              onChange={onCityChanged}
            />
            <SelectSearchMode mode={searchMode} onModeChanged={setSearchMode} />
          </div>
        </div>
      </div>

      <Button
        className="w-full sm:w-fit"
        onClick={onNavigateToSearch}
        variant="gradient"
        size="lg"
      >
        {t('begin-searching')}
        <IoSearchOutline className="size-4" />
      </Button>
    </div>
  );
};
