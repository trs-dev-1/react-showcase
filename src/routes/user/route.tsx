import { CanAccessRouteHandler } from '@/shared/utils/router.utils';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/user')({
  beforeLoad: CanAccessRouteHandler({ whenLoggedIn: true })
});
