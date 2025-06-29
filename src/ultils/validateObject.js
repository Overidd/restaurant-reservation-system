

export const validateObject = (obj) => {
   if (Object.keys(obj).length === 0) {
      return false;
   }
   if (Object.values(obj).some((value) => !value)) {
      return false;
   }

   return true;
}