import { useMapStore } from '@/domains/search';
import { ENDPOINTS } from '@/shared/constants/endpoints.constants';
import { useToast } from '@/shared/hooks/utils/use-toast';
import { Dto } from '@/shared/interfaces/dto.interfaces';
import { axiosInstance } from '@/shared/lib/axios';
import { getLatLngFromPolyline } from '@/shared/utils/mappers.utils';
import { useMutation } from '@tanstack/react-query';
import { AddRegionToFavoriteDto } from './map.interfaces';

export const useAddZoneToFavoritesMutation = () => {
  const { polyline } = useMapStore();
  const { toast } = useToast();

  return useMutation({
    mutationFn: () => {
      const dto: Dto<AddRegionToFavoriteDto> = {
        data: {
          name: Math.random().toString(),
          locations: getLatLngFromPolyline(polyline!).map(({ lat, lng }) => ({
            latitude: lat,
            longitude: lng
          }))
        }
      };
      return axiosInstance.post(ENDPOINTS.USER.ADD_REGION_TO_FAVORITE, dto);
    },
    onSuccess: () =>
      toast({
        message: 'your-selected-region-has-been-added-to-favorite',
        type: 'success'
      })
  });
};
