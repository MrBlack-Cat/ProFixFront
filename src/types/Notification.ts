export interface Notification {
    id: number;
    userId: number;
    typeId: number;
    message: string;
    isRead: boolean;
    createdAt: string;
    createdBy: number;
  }
  