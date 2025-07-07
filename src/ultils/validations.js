

export const validations = {
   email: (value) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return [emailRegex.test(value), 'Email no valido'];

   }
}