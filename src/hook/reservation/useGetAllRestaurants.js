import { fetcher, serviceProvider } from '@/doman/services';
export const restaurantResource = fetcher(serviceProvider.getAllRestaurants());

export const useGetAllRestaurants = () => {
   return {
      restaurants: restaurantResource.read(),
   };
};