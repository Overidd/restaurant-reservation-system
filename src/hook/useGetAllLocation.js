import { fetcher, serviceProvider } from '@/doman/services';
export const locationsResource = fetcher(serviceProvider.getAllocation());

export const useGetAllLocation = () => {
   return {
      locations: locationsResource.read(),
   };
};