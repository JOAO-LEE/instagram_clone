import { PostDTO } from "./Post.dto"

export interface ProfilePostDTO extends PostDTO {
    likesAmount: number
    commentsAmount: number
    stats: boolean
}