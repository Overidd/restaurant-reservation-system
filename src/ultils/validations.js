
export class Validations {
   static email(value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return [emailRegex.test(value), 'Email no valido'];
   }

   static urlImage(value) {
      // eslint-disable-next-line
      const urlRegex = /^(https?:\/\/)?([\w\-]+(\.[\w\-]+)+)(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)?\.(jpg|jpeg|png|gif|bmp|webp|svg)$/i;
      return urlRegex.test(value)
   }

}

export const validateObject = (obj) => {
   if (Object.keys(obj).length === 0) {
      return false;
   }
   if (Object.values(obj).some((value) => !value)) {
      return false;
   }

   return true;
}

export const isObject = (varObj) => {
   return Object.prototype.toString.call(varObj) === '[object Object]';
}

export const isObjetError = (err) => {
   if (err instanceof Error) {
      return true;
   }
   return false;
}