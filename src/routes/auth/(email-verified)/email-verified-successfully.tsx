import { CanAccessRouteHandler } from '@/shared/utils/router.utils';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute(
  '/auth/(email-verified)/email-verified-successfully'
)({
  head: () => ({ meta: [{ title: 'Auth - Email Verified Successfully' }] }),
  beforeLoad: CanAccessRouteHandler({ whenLoggedIn: false })
});
