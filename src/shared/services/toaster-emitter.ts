import { ToastPayload } from "../hooks/utils/use-toast";

type Listener = (payload: ToastPayload) => void;

const listeners = new Set<Listener>();

export const toastEmitter = {
  emit(payload: ToastPayload) {
    listeners.forEach((listener) => listener(payload));
  },

  subscribe(listener: Listener) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  }
};
