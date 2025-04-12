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
    genderName: string;        
    isApproved: boolean;  
    serviceTypes: string[];
    age: number;
  }
  