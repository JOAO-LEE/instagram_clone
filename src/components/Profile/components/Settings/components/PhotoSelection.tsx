"use client"

import { ChangeEvent } from "react"

export default function PhotoSelection({chooseProfileImage}: { chooseProfileImage: (e: ChangeEvent<HTMLInputElement>) => void}) {
    return (
        <div className="">
            <input type="file" accept=".jpg, .jpeg, .png" hidden id="upload-user-image" onChange={(e) => chooseProfileImage(e)}/>
            <label htmlFor="upload-user-image" className="bg-sky-500  hover:bg-blue-500 rounded p-2 text-white text-xs cursor-pointer">Change photo</label>
        </div>
    )
}