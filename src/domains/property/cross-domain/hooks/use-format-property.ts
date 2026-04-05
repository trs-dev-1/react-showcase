import { MAIN_SEARCH_PROPERTY_KEYS } from '@/domains/search';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import {
  PROPERTY_TYPE,
  PROPERTY_TYPE_KEYS
} from '@/shared/constants/property.constants';
import {
  PropertyPreviewDef,
  PropertyTypeDef
} from '@/shared/interfaces/property/property.interfaces';

type FormatPropertyTitlePayload = {
  property: PropertyTypeDef;
  displayRelation?: boolean;
};
type FormatPropertyPreviewTitlePayload = {
  property: PropertyPreviewDef;
  propertyType: PROPERTY_TYPE;
};

export const useFormatProperty = () => {
  const [t] = useTranslation();

  const formatTitle = useCallback(
    ({ property, displayRelation }: FormatPropertyTitlePayload): string => {
      const relationValueKey =
        displayRelation &&
        property.relationType &&
        MAIN_SEARCH_PROPERTY_KEYS[property.relationType];

      return `${t(PROPERTY_TYPE_KEYS[property.details.propertyType])} ${relationValueKey ? t(relationValueKey).toLowerCase() : ''}, ${property.details.roomNumber} ${t(
        property.details.roomNumber === 1 ? 'room' : 'rooms'
      ).toLowerCase()}, ${property.details.surface}  m²`;
    },
    [t]
  );

  const formatPreviewTitle = useCallback(
    ({ property, propertyType }: FormatPropertyPreviewTitlePayload): string => {
      return `${t(PROPERTY_TYPE_KEYS[propertyType])}, ${property.details.roomNumber} ${t(
        property.details.roomNumber === 1 ? 'room' : 'rooms'
      ).toLowerCase()}, ${property.details.surface}  m²`;
    },
    [t]
  );

  const formatAddress = useCallback(
    (property: PropertyTypeDef) => {
      const streetNumber = property.details.address.streetNumber
        ? `, ${t('nr')} ${property.details.address.streetNumber}`
        : '';
      const residenceComplex = property.details.address.residenceComplex
        ? ` (${property.details.address.residenceComplex})`
        : '';
      return `${property.details.address.street}${streetNumber}, ${property.details.address.city} ${residenceComplex}`;
    },
    [t]
  );

  return {
    formatAddress,
    formatTitle,
    formatPreviewTitle
  };
};
