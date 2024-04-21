import { ChangeEvent } from "react"
import { FormErrors } from "./SettingsContext";
import { Session } from "next-auth";

export interface FormFields {
    handleFieldBlur: (name: string) => void
    handleSettingsForm: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
    touchedFields: Record<string, boolean>
    formErrors: FormErrors
    formSettings: Session["user"]
}