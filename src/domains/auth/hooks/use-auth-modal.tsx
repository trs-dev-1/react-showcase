import { create } from 'zustand';
import { AuthModalData } from '../interfaces/auth-modal.interfaces';

interface ModalStore {
  data: AuthModalData;
  isOpen: boolean;
  onOpen: (data?: AuthModalData) => void;
  onClose: () => void;
}

export const useAuthModal = create<ModalStore>((set) => ({
  isOpen: false,
  data: {},
  type: null,
  onOpen: (data = {}) => set({ isOpen: true, data }),
  onClose: () => set({ isOpen: false })
}));
