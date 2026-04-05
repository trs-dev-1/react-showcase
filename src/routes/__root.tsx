import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import {
  createRootRouteWithContext,
  lazyRouteComponent,
  Outlet
} from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

import { AppFrame } from '@/domains/app-frame';
import {
  PROPERTY_CONDITIONS_TYPE,
  PROPERTY_FURNITURE_TYPE,
  PROPERTY_TYPE,
  RELATION_TYPE
} from '@/shared/constants/property.constants';
import { useProtectRouteOnLogout } from '@/shared/hooks/utils/use-protect-route-on-logout';
import { RouterContext } from '@/shared/interfaces/router/types';
import { z } from 'zod';

export type QueryFiltersSearchParams = z.infer<typeof queryFiltersSearchSchema>;

const queryFiltersSearchSchema = z.object({
  rt: z.enum(RELATION_TYPE).optional(),
  pt: z.enum(PROPERTY_TYPE).optional(),
  pc: z.enum(PROPERTY_CONDITIONS_TYPE).optional().nullable(),
  city: z.string().optional(),
  lat: z.string().optional().nullable(),
  lng: z.string().optional().nullable(),
  surface: z.string().optional().nullable(),
  rn: z.number().optional().nullable(),
  bn: z.number().optional().nullable(),
  hasElevator: z.boolean().optional().nullable(),
  pf: z.enum(PROPERTY_FURNITURE_TYPE).optional(),
  airC: z.boolean().optional().nullable(),
  balcony: z.boolean().optional().nullable(),
  cellar: z.boolean().optional().nullable(),
  garage: z.boolean().optional().nullable(),
  terrace: z.boolean().optional().nullable(),
  wotw: z.boolean().optional().nullable(),
  petF: z.boolean().optional().nullable(),
  priceF: z.string().optional(),
  priceT: z.string().optional(),
  wria: z.boolean().optional().nullable(),
  zoom: z.string().optional(),
  pId: z.string().optional().nullable(),
  page: z.string().optional()
});

export const Route = createRootRouteWithContext<RouterContext>()({
  validateSearch: (search) => queryFiltersSearchSchema.parse(search),
  component: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useProtectRouteOnLogout();

    return (
      <AppFrame>
        <Outlet />
        <TanStackRouterDevtools />
        <ReactQueryDevtools
          initialIsOpen={false}
          buttonPosition="bottom-right"
        />
      </AppFrame>
    );
  },
  notFoundComponent: lazyRouteComponent(() => import('./(root)/-404'))
});
