export { AuthModal } from './components/auth-modal/auth-modal';

export { useAuthLogoutMutation } from './hooks/use-auth.query';

export { useAuthState, useUserState } from './hooks/auth.state';
export { useAuthModal } from './hooks/use-auth-modal';
export { useIsAuthenticated } from './hooks/use-is-authenticated';
export { usePermissions } from './hooks/use-permissions';
export { useUserRole } from './hooks/use-user-role';
export type { RoleType } from './interfaces/auth.interfaces';
export type { UserDef, UserDto } from './interfaces/user.interfaces';
