import { create } from 'zustand';

type ModalType = "upload" | "logout";

interface ModalDto {
    id: number
    modalType: ModalType
    isOpen: boolean
}

type ModalState = {
    isUploadModalOpen: Array<ModalDto>
    action: (modalType: ModalType) => void
};

const modalsInitialState: Array<ModalDto> = [
    {id: 0, isOpen: false, modalType: "logout"},
    {id: 1, isOpen: false, modalType: "upload"
}]

export const useUploadModalState = create<ModalState>()((set) => ({
    isUploadModalOpen: modalsInitialState,
    action: (modalType) => {
        set((state) => ({
            ...state,
            isUploadModalOpen: modalsInitialState.map(modal => {
                if (modal.modalType === modalType) {
                    modal.isOpen = !modal.isOpen
                }
                return modal;
            })
        }));
    }
}));
