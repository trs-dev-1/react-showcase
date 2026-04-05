import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute(
  '/admin/(user-management)/user-management'
)({
  head: () => ({ meta: [{ title: 'Admin - User Management' }] })
});
