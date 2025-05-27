export type BookingStatus =
  | 'Pending'
  | 'Approved'
  | 'Rejected'
  | 'Cancelled'
  | 'Completed'
  | 'InProgress';

export interface Booking {
  id: number;
  description?: string;
  scheduledDate: string;
  startTime: string;
  endTime: string;
  status: BookingStatus;
  serviceProviderName?: string;
  clientName?: string;
  clientProfileId?: number;
  serviceProviderProfileId?: number; 
  isConfirmedByProvider: boolean;
  isCompleted: boolean;
  createdAt: string;
  pendingDate?: string;
  confirmationDate?: string;   
  rejectedDate?: string;
  cancelledDate?: string;
  inProgressDate?: string;
  completionDate?: string;
  serviceProviderAvatarUrl?: string;
  clientAvatarUrl?: string;
}
