import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute(
  '/moderator/(property-to-approve)/property-to-approve'
)({
  head: () => ({ meta: [{ title: 'Moderator - Property To Approve' }] })
});
