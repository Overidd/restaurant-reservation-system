import { useEffect, useRef, useState } from 'react';

export const useUserSearch = ({
   getUserByEmail,
   clearUser,
   isFoundUser,
}) => {
   const btnSearchRef = useRef(null);
   const [isBlockedFields, setIsBlockedFields] = useState(true);
   const [hasSearched, setHasSearched] = useState(false);

   const handleGetUserByEmail = (email) => {
      setHasSearched(true);
      getUserByEmail(email);
   };

   const animateSearchButton = () => {
      const element = btnSearchRef.current;
      if (!element) return;
      element.classList.remove('animate__shakeX');
      void element.offsetWidth;
      element.classList.add('animate__shakeX');
   };

   useEffect(() => {
      setIsBlockedFields(hasSearched && !isFoundUser ? false : true);
   }, [isFoundUser, hasSearched]);

   const onChangeEmailOrClear = ({ name, value }) => {
      if (name === 'email' || !value) {
         clearUser();
         setIsBlockedFields(true);
         setHasSearched(false);
      }
   };

   return {
      isBlockedFields,
      hasSearched,
      handleGetUserByEmail,
      onChangeEmailOrClear,
      animateSearchButton,
      btnSearchRef,
   };
}