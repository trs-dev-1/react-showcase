import { CanAccessRouteHandler } from '@/shared/utils/router.utils';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/moderator')({
  beforeLoad: CanAccessRouteHandler({
    whenLoggedIn: true,
    roles: ['MODERATOR', 'ADMIN']
  })
});
