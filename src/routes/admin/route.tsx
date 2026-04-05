import { CanAccessRouteHandler } from '@/shared/utils/router.utils';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/admin')({
  beforeLoad: CanAccessRouteHandler({ whenLoggedIn: true, roles: ['ADMIN'] })
});
