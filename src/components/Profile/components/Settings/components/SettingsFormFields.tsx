"use client"

import { ChangeEvent, useState } from "react";
import UsernameError from "./UsernameError";
import { TrashSimple } from "@phosphor-icons/react";
import { Session } from "next-auth";


export default function SettingsFormFields({handleFieldBlur, handleSettingsForm, touchedFields, formErrors, formSettings}) {
  
    return (
        <section className="flex flex-col gap-4 flex-1">
            <div className="flex flex-col">
                <label className={`font-light text-lg ${touchedFields.username && formErrors.username ? "text-red-600" : ""}`}>Username</label>
                <input type="text" spellCheck={false} name="username" onBlur={() => handleFieldBlur("username")} value={formSettings?.username} onChange={(e) => handleSettingsForm(e)} className={`rounded ${touchedFields.username && formErrors.username ? "border-red-500" : "border-gray-200"} focus:ring-0`} />
                {
                    formErrors.username 
                    &&
                        (
                            <UsernameError />
                        ) 
                }
            </div>
            <div className="flex flex-col">
                <label className="font-light text-lg">Name</label>
                <input type="text" spellCheck={false} name="name" value={formSettings.name!} onChange={(e) => handleSettingsForm(e)} className="rounded border-gray-200 focus:ring-0" />
            </div>
            <div className="flex flex-col">
                <label className={`font-light text-lg ${touchedFields.site && formErrors.site && "text-red-600"}`}>Website</label>
                <input type="text" name="site" value={formSettings.site} onChange={(e) => handleSettingsForm(e)} onBlur={() => handleFieldBlur("site")} className={`rounded ${touchedFields.site && formErrors.site ? "border-red-500" : "border-gray-200"} focus:ring-0`} />
                {
                    touchedFields.site && formErrors.site 
                    &&
                        (
                            <span className="mt-1 text-xs text-red-400">Website format required (eg: "https://...").</span>
                        ) 
                }
            </div>
            <div className="flex flex-col">
                <label className="font-light text-lg">Bio</label>
                    <textarea maxLength={80} name="biography" value={formSettings.biography} onChange={(e) => handleSettingsForm(e)} className="rounded border-gray-200 focus:ring-0 resize-none" />
                    <p className="text-sm  text-gray-400 self-end">{formSettings.biography?.length ?? 0} \ 80</p>
            </div>
            
        </section>
    )
}