import { useUserState } from '@/domains/auth';
import { routeTree } from '@/routeTree.gen';
import {
  createRouter,
  RouterProvider as TSRouterProvider
} from '@tanstack/react-router';

const router = createRouter({
  routeTree,
  context: {
    user: null
  },
  scrollRestoration: true
});

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export const RouterProvider = () => {
  const user = useUserState();

  return <TSRouterProvider router={router} context={{ user }} />;
};
