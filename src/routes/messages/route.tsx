import { CanAccessRouteHandler } from '@/shared/utils/router.utils';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/messages')({
  head: () => ({ meta: [{ title: 'Messages' }] }),
  beforeLoad: CanAccessRouteHandler({ whenLoggedIn: true })
});
