import { create } from 'zustand';

type UpdateStoreData = {
  polyline?: google.maps.Polyline | null;
  bounds?: google.maps.LatLngBounds | null;
};

interface MapStore {
  polyline: google.maps.Polyline | null;
  bounds: google.maps.LatLngBounds | null;
  update: (value: UpdateStoreData) => void;
  seenMap: Map<string, boolean>;
  setSeenMap: (pId: string) => void;
}

export const useMapStore = create<MapStore>((set, get) => ({
  bounds: null,
  polyline: null,
  seenMap: new Map<string, boolean>(),
  update: (value: UpdateStoreData) => set({ ...get(), ...value }),
  setSeenMap(pId: string) {
    const { seenMap, ...state } = get();
    const newSeenMap = new Map(seenMap);
    newSeenMap.set(pId, true);
    set({ ...state, seenMap: newSeenMap });
  }
}));
