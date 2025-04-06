export interface Category {
    id: number;
    name: string;
    icon?: string;
  }
  
  export interface ServiceProvider {
    id: number;
    name: string;
    surname: string;
    city: string;
    experienceYears: number;
    avatarUrl?: string;
    rating?: number;
    gender: string;        
    isApproved: boolean;  
    serviceTypeNames: string[];
  }
  