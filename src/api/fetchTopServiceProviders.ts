import { ServiceProviderTopDto } from '../types/ServiceProvider';

export const fetchTopServiceProviders = async (): Promise<ServiceProviderTopDto[]> => {
  const res = await fetch('https://localhost:7164/api/ServiceProviderProfile/top-rated');
  if (!res.ok) {
    throw new Error('Failed to fetch top service providers');
  }

  const data = await res.json();
  return data.data; // потому что приходит { data: [...] }
};
