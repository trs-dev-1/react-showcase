import { CanAccessRouteHandler } from '@/shared/utils/router.utils';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute(
  '/auth/(email-verified)/email-verified-unsuccessfully'
)({
  head: () => ({ meta: [{ title: 'Auth - Email Verified Unsuccessfully' }] }),
  beforeLoad: CanAccessRouteHandler({ whenLoggedIn: false })
});
