import { MessageInfo } from "./message.interface";
export interface UserInfo {
    user_id?: number;
    username?: string;
    userToken?: string;
    message?: MessageInfo[];
  }