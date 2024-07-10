import { UserInfo } from './user.interface';
export interface MessageInfo {
    message_id?: number;
    user_id?: number;
    text_id?: number;
    image_id?: number;
    user?: UserInfo[]; 
    
  }