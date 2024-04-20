"use client"

import { SelectedPhotoState } from "@/model/Profile/Settings/SettingsContext";
import { TrashSimple } from "@phosphor-icons/react";

export default function ImagePreview({ selectedPhoto, setSelectedPhoto }: SelectedPhotoState) {
    return (
        <div className="flex flex-col items-center p-2 gap-2 w-1/2 sm:w-1/3">
            {
                selectedPhoto 
                ? 
                    (
                        <>
                            <img src={selectedPhoto} alt="" className="rounded-full border border-gray-300 p-0.5 object-cover size-36" />
                            <TrashSimple  onClick={() => setSelectedPhoto("")} className="post-buttons hover:text-red-600 hover:bg-red-200 hover:scale-[1.2] transition-all duration-700 ease-in-out"/>
                        </>
                    )
                :
                    (   
                        <>
                            <div className="rounded-full border border-gray-300 p-0.5 size-32"></div>
                            <p className="text-xs text-wrap">Your profile image will appear here!</p>
                        </>
                    )
            }
        </div>
    )
}