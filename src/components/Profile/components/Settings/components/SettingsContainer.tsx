"use client";

import { useContext } from "react";
import PhotoAndInfo from "./PhotoAndInfo";
import { SettingsContext } from "@/context/SettingsContext/SettingsContext";
import SettingsFormFields from "./SettingsFormFields";
import ImagePreview from "./ImagePreview";
import SettingsActions from "./SettingsActions";
import PhotoSelection from "./PhotoSelection";
import { Session } from "next-auth";

export default function SettingsContainer({session}: {session: Session}) {
    const {
        settingsFormState, 
        settingsFormErrorState, 
        selectedPhotoState,
        touchedFieldState, 
        handleSubmit, 
        chooseProfileImage, 
        handleSettingsForm, 
        handleFieldBlur, 

    } = useContext(SettingsContext);

    return (
        <section className="w-full lg:w-3/4 p-2">
            <h1 className="text-xl font-semibold">Edit Profile</h1> 
            <form className="flex flex-col gap-4 w-full p-2" onSubmit={(e) => handleSubmit(e)}>
                <section className="flex justify-between items-center font-bold text-sm bg-gray-200 rounded-xl p-4">
                    <PhotoAndInfo {...session} />
                    <PhotoSelection chooseProfileImage={chooseProfileImage} />
                </section>
                <div className="flex flex-col-reverse sm:flex-row items-center gap-2 w-full p-1 ">
                    <SettingsFormFields
                    formErrors={settingsFormErrorState.formErrors}
                    formSettings={settingsFormState.formSettings}
                    handleFieldBlur={handleFieldBlur}
                    handleSettingsForm={handleSettingsForm}
                    touchedFields={touchedFieldState.touchedFields}
                    />
                    <ImagePreview { ...selectedPhotoState } />
                </div>
                <SettingsActions {...settingsFormErrorState.formErrors} />
            </form>
        </section> 
    )
}

