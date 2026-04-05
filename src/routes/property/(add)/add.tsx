import { CanAccessRouteHandler } from '@/shared/utils/router.utils';
import { createFileRoute } from '@tanstack/react-router';

import { z } from 'zod';

const AddPSearchSchema = z.object({
  pId: z.string().optional()
});

export const Route = createFileRoute('/property/(add)/add')({
  head: () => ({ meta: [{ title: 'Add Property' }] }),
  validateSearch: (search) => AddPSearchSchema.parse(search),
  beforeLoad: CanAccessRouteHandler({
    whenLoggedIn: true
  })
});
