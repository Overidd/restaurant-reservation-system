import { dasboardServiceProvider, fetcher } from '@/doman/services';
export const hourResource = fetcher(dasboardServiceProvider.getAllHours());

export const useGetAlLHour = () => {
   return {
      hours: hourResource.read()
   }
}
