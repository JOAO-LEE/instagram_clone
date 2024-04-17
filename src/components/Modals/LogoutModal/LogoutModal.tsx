"use cLient"

import ReactModal from "react-modal";
import { useUploadModalState } from "../../../../store/modalState";
import { signOut } from "next-auth/react";


export function LogoutModal() {
    const { isUploadModalOpen, action } = useUploadModalState();

    return (
        <>
            <ReactModal
            className="bg-white shadow-md shadow-gray-800 flex flex-col focus:outline-none border border-gray-300 rounded-lg w-72 h-40 p-4"
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
                <div className="flex flex-col gap-4  items-center px-2 w-full text-sm h-full">
                    <div className="flex-1">
                        <p >Would you like to logout?</p>
                    </div>
                    <div className="flex flex-col gap-2 text-xs border-t border-t-gray-300 rounded-t-md border-b border-b-gray-300 rounded-b-md p-2 w-full">
                        <button onClick={() => signOut({callbackUrl: "/sign-in", redirect: true})} className="font-bold text-red-600 hover:text-red-400 transition duration-100">Yes</button>
                        <hr />
                        <button onClick={() => action("logout")} className="font-bold hover:text-gray-300 transition duration-100">Cancel</button>
                    </div>
                </div>
            </ReactModal>
        </>
    )
}