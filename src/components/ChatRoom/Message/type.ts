export interface IMessageItem {
  avatar?: string;
  userId?: number;
  username?: string | undefined;
  message: string;
  send_time?: string;
  type?:string;
}
export interface IMessageData {}
