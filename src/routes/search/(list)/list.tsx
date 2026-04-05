import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/search/(list)/list')({
  head: () => ({ meta: [{ title: 'List - Search' }] })
});
