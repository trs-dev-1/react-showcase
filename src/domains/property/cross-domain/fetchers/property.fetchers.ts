import { AxiosError, AxiosResponse } from 'axios';
import { ENDPOINTS } from '@/shared/constants/endpoints.constants';
import { Dto, ErrorDto } from '@/shared/interfaces/dto.interfaces';
import {
  PropertyTypeDef,
  PropertyTypeDto
} from '@/shared/interfaces/property/property.interfaces';
import { axiosInstance } from '@/shared/lib/axios';
import { mapPropertyDtoToDef } from '@/shared/utils/mappers.utils';

export async function getPropertyById(
  propertyId: string,
  isAuthenticated: boolean
): Promise<PropertyTypeDef> {
  return axiosInstance
    .get<
      AxiosError<ErrorDto>,
      AxiosResponse<Dto<PropertyTypeDto>>
    >(ENDPOINTS.PROPERTY.GET_PROPERTY_BY_ID(propertyId, isAuthenticated))
    .then((data) => mapPropertyDtoToDef(data.data.data));
}
