import { defaultUIState } from '@/shared/constants/ui.constants';
import { UIState } from '@/shared/interfaces/ui.interfaces';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { LocalStorageKeys } from '../hooks/storage/use-local-storage';

export interface UIStateDef {
  state: UIState;
  setState: (data: Partial<UIState>) => void;
}

export const useUIState = create(
  persist<UIStateDef>(
    (set, get) => ({
      state: defaultUIState,
      setState: (partialState: Partial<UIState>) => {
        set({ state: { ...get().state, ...partialState } });
      }
    }),
    {
      name: 'ui_preferences' satisfies LocalStorageKeys,
      storage: createJSONStorage(() => localStorage)
    }
  )
);
