import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/user/(properties)/properties')({
  head: () => ({ meta: [{ title: 'User - Properties' }] })
});
