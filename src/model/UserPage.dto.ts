import { PostDTO } from "./Post.dto";

export type UserInfo = Pick<PostDTO, 'uid' | 'username'>;

export interface UserPageDTO extends UserInfo {
    following: Array<UserInfo>
    followers: Array<UserInfo>
    posts: Array<PostDTO>   
}