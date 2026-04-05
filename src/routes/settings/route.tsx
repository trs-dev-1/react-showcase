import { CanAccessRouteHandler } from '@/shared/utils/router.utils';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/settings')({
  head: () => ({ meta: [{ title: 'Settings' }] }),
  beforeLoad: CanAccessRouteHandler({ whenLoggedIn: true })
});
