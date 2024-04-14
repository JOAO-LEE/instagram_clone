import { LoggedUser } from "@/enum/LoggedUser.enum"

type UserInfo = {
    uid: string
    username: string
}

export interface ProfileInfo {
    userInfo: UserInfo
    isLoggedUser: LoggedUser
}