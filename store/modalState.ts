import { state } from 'minifaker';
import { create } from 'zustand';

type ModalState = {
    isOpen: boolean
    action: () => void
}

export const useModalState = create<ModalState>()((set) => ({
    isOpen: false,
    action: () => {
        set((state) => ({
            ...state,
            isOpen: !state.isOpen
        }))
    }
}));