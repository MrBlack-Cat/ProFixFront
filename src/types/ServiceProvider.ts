export interface ServiceProviderTopDto {
    id: number;
    name: string;
    surname: string;
    city?: string;
    age?: number;
    experienceYears?: number;
    avatarUrl?: string;
    averageRating: number;
    parentCategoryName?: string;
    createdByUserId: number;
    createdByUserName: string;
    genderName?: string;
    approvalDate?: string;
    parentCategoryId?: number;
    serviceTypeIds: number[];
    serviceTypes: string[];
    rating?: number;
  }
  