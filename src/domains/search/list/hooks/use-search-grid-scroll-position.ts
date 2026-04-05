import { create } from "zustand";

type SearchListScrollPositionDef = {
  position: number;
  setScrollPosition: (position: number) => void;
};

export const useSearchListScrollPosition = create<SearchListScrollPositionDef>(
  (set) => ({
    position: 0,
    setScrollPosition: (position: number) => set({ position })
  })
);
