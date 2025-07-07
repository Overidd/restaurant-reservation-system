
export const generateCode = ({
   prefix,
   existingCodesSet,
   length = 8
}) => {
   if (existingCodesSet instanceof Set) {

      let newCode = prefix;

      do {
         newCode += Math.random().toString(36).substring(2, length).toUpperCase();

      } while (existingCodesSet.has(newCode));

      return newCode;
   }
   throw new Error('existingCodesSet debe ser un Set');
}