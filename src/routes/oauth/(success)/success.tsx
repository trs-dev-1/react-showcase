import { CanAccessRouteHandler } from '@/shared/utils/router.utils';
import { createFileRoute } from '@tanstack/react-router';

import { z } from 'zod';

const oauthSuccessSearchSchema = z.object({
  jwtUser: z.string().optional()
});

export const Route = createFileRoute('/oauth/(success)/success')({
  head: () => ({ meta: [{ title: 'OAuth - Success' }] }),
  validateSearch: (search) => oauthSuccessSearchSchema.parse(search),
  beforeLoad: CanAccessRouteHandler({ whenLoggedIn: false })
});
