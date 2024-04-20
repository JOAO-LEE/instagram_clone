import { Session } from "next-auth";
import { ChangeEvent, Dispatch, FormEvent, SetStateAction, createContext } from "react";

interface FormErrors {
    [key: string]: boolean;
}

interface SettingsFormState {
    formSettings: Session["user"]
    setFormSettings: Dispatch<SetStateAction<any>> 
}

interface FormErrorState {
    formErrors: FormErrors;
    setFormErrors: Dispatch<SetStateAction<any>> 
}

interface TouchedFieldState {
    touchedFields: Record<string, boolean>
    setTouchedFields: Dispatch<SetStateAction<Record<string, boolean>>>
}

interface SelectedPhotoState {
    selectedPhoto: string
    setSelectedPhoto: Dispatch<SetStateAction<string>>
}

interface SettingsFormProps {
    chooseProfileImage: (e: ChangeEvent<HTMLInputElement>) => void
    handleSettingsForm: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void 
    handleSubmit: (e: FormEvent<HTMLFormElement>) => void
    handleFieldBlur: (name: string) => void
    settingsFormState: SettingsFormState
    settingsFormErrorState: FormErrorState
    selectedPhotoState: SelectedPhotoState
    touchedFieldState: TouchedFieldState
}

export type { FormErrors, SettingsFormState, TouchedFieldState, SelectedPhotoState, SettingsFormProps };
