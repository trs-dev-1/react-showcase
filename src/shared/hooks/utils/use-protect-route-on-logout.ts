import { useUserState } from '@/domains/auth';
import { useNavigate, useRouterState } from '@tanstack/react-router';
import { useEffect } from 'react';
import { Routes } from '../../interfaces/router/types';

export const useProtectRouteOnLogout = () => {
  const user = useUserState();
  const navigate = useNavigate();
  const routerState = useRouterState();

  useEffect(() => {
    const protectedRoutes: Array<Routes> = [
      '/admin/user-management',
      '/messages',
      '/moderator/property-to-approve',
      '/property/add',
      '/settings',
      '/user/properties'
    ];

    const currentPath = routerState.location.pathname;
    const isOnProtectedRoute = protectedRoutes.some((route) =>
      currentPath.startsWith(route as never)
    );

    if (!user && isOnProtectedRoute) {
      navigate({ to: '/' });
    }
  }, [user, navigate, routerState.location.pathname]);
};
