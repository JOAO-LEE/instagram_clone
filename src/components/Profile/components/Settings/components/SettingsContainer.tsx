"use client";

import { useContext } from "react";
import PhotoAndInfo from "./PhotoAndInfo";
import { SettingsContext } from "@/context/SettingsContext/SettingsContext";
import SettingsFormFields from "./SettingsFormFields";
import ImagePreview from "./ImagePreview";
import SettingsActions from "./SettingsActions";
import PhotoSelection from "./PhotoSelection";

export default function SettingsContainer() {
    const { handleSubmit, chooseProfileImage, settingsFormState, selectedPhotoState, handleSettingsForm, handleFieldBlur, settingsFormErrorState,touchedFieldsState  } = useContext(SettingsContext);
    return (
        <section className="w-full sm:w-3/4 p-2">
            <h1 className="text-xl font-semibold pb-4 ">Edit Profile</h1> 
            <form className="flex flex-col gap-8" onSubmit={(e) => handleSubmit(e)}>
                <section className="flex justify-between items-center font-bold text-sm bg-gray-200 rounded-xl p-4">
                    <PhotoAndInfo user={settingsFormState.formSettings} />
                    <PhotoSelection chooseProfileImage={chooseProfileImage} />
                </section>
                <div className="flex justify-between items-center gap-4">
                    <SettingsFormFields
                    formErrors={settingsFormErrorState.formErrors}
                    formSettings={settingsFormState.formSettings}
                    handleFieldBlur={handleFieldBlur}
                    handleSettingsForm={handleSettingsForm}
                    touchedFields={touchedFieldsState.touchedFields}
                    />
                    <ImagePreview { ...selectedPhotoState } />
                </div>
                <SettingsActions {...settingsFormErrorState.formErrors} />
            </form>
        </section> 
    )
}

