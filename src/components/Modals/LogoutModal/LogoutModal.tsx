"use cLient"

import ReactModal from "react-modal";
import { useUploadModalState } from "../../../../store/modalState";
import { signOut } from "next-auth/react";


export function LogoutModal() {
    const { isUploadModalOpen, action } = useUploadModalState();

    return (
        <>
            <ReactModal
            className="bg-white shadow-md shadow-gray-800 focus:outline-none rounded-lg w-72 h-40"
            isOpen={isUploadModalOpen.find(modal => (modal.isOpen === true) && modal.modalType === "logout")?.isOpen!}
            ariaHideApp={false}

            onRequestClose={() => {
              action("logout");
            }}
            shouldCloseOnEsc={true}
            style={{
            overlay: {
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "hsla(0, 0%, 0%, 0.7)"
            },
            }}
            >
                <div className="flex flex-col items-center w-full text-sm h-full">
                    <div className="flex-1 p-4">
                        <p >Would you like to logout?</p>
                    </div>
                        <button onClick={() => signOut({callbackUrl: "/sign-in", redirect: true})} className="font-bold text-red-600 hover:bg-gray-200 transition-all duration-200 p-2 w-full rounded-lg border-t border-t-gray-100">Yes</button>
                        <button onClick={() => action("logout")} className="font-bold hover:bg-gray-200 transition duration-100 p-2 w-full rounded-lg border-t border-t-gray-100">Cancel</button>
                </div>
            </ReactModal>
        </>
    )
}