import { useIsAuthenticated } from '@/domains/auth';
import { QueryKeys } from '@/shared/constants/query-keys.constants';
import { ErrorDto } from '@/shared/interfaces/dto.interfaces';
import { PropertyTypeDef } from '@/shared/interfaces/property/property.interfaces';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { getPropertyById } from '../fetchers/property.fetchers';

type UseGetPropertyByIdProps = {
  pId: string | null | undefined;
};

export const useGetPropertyById = ({ pId }: UseGetPropertyByIdProps) => {
  const isAuthenticated = useIsAuthenticated();
  return useQuery<PropertyTypeDef, AxiosError<ErrorDto>>({
    queryFn: () => getPropertyById(pId!, isAuthenticated),
    queryKey: QueryKeys.PROPERTY.propertyById(pId!),
    enabled: !!pId
  });
};
