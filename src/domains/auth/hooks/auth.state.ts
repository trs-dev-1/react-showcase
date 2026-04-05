import { LocalStorageKeys } from '@/shared/hooks/storage/use-local-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { UserDef } from '../interfaces/user.interfaces';

export interface AuthStateDef {
  user: UserDef | null;
  setUser: (data: UserDef) => void;
  removeUser: () => void;
}

export const useAuthState = create(
  persist<AuthStateDef>(
    (set) => ({
      user: null,
      setUser: (user: UserDef) => {
        set({ user });
      },
      removeUser: () => {
        set({ user: null });
      }
    }),
    {
      name: 'user' satisfies LocalStorageKeys,
      storage: createJSONStorage(() => localStorage)
    }
  )
);

export const useUserState = () => useAuthState(({ user }) => user);
