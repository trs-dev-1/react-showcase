import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/search/(map)/map')({
  head: () => ({ meta: [{ title: 'Map - Search' }] })
});
