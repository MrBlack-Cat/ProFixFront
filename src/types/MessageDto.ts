export interface MessageDto {
  id: number;
  senderUserId: number;
  receiverUserId: number;
  content: string;
  createdAt: string;
  isRead: boolean;
}
