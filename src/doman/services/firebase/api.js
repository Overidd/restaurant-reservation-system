
export class FarebaseService {
   constructor() {
   }


   async getAvailableHours({ date }) {
      console.log('getAvailableHours', date);
      return true;
   }

   async getTables({ restaurantId }) {
      console.log('getTables', restaurantId);
      return true;
   }
}