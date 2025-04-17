export interface PostDto {
    id: number;
    title: string;
    content: string;
    imageUrl?: string;
    createdAt: string;
    serviceProviderProfileId: number;
    likesCount: number; 
    hasLiked?: boolean; 
  }
  