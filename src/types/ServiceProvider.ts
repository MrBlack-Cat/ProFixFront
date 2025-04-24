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
  }
  