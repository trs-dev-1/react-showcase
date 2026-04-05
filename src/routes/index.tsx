import { createFileRoute, lazyRouteComponent } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  head: () => ({ meta: [{ title: 'Listify' }] }),
  component: lazyRouteComponent(() => import('./(root)/-route'))
});
