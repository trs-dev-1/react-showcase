export type AxiosEmitterPayload = Partial<{
  loggedOut: boolean;
}>;

type Listener = (payload: AxiosEmitterPayload) => void;

const listeners = new Set<Listener>();

export const axiosEmitter = {
  emit(payload: AxiosEmitterPayload) {
    listeners.forEach((listener) => listener(payload));
  },

  subscribe(listener: Listener) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
};
