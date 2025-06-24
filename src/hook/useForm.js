import { useCallback, useEffect, useReducer } from 'react';

const defaultValidations = {
   email: [
      (value) => /^[\w.+-]+@[\w-]+\.[\w.-]+$/.test(value),
      'El correo no es válido',
   ],
   password: [
      (value) => value.trim().length >= 6,
      'La contraseña debe tener al menos 6 caracteres',
   ],
   passwordConfirm: [
      (fields) => fields.passwordConfirm === fields.password,
      'Las contraseñas no coinciden',
      true,
   ],
   title: [
      (value) => value.trim().length > 0,
      'El título es obligatorio',
   ],
};

const TYPEACTION = {
   CHANGE: 'CHANGE',
   VALIDATE_ALL: 'VALIDATE_ALL',
   VALIDATE_ONE: 'VALIDATE_ONE',
   RESET: 'RESET',
}

const validateField = (key, state, validations) => {
   const rule = validations[key];
   if (!rule) return [true, ''];
   const [fn, msg, needsWholeState] = rule;
   const valid = needsWholeState ? fn(state) : fn(state[key]);
   return [valid, msg];
};

const formReducer = (state, action) => {
   switch (action.type) {
      case TYPEACTION.CHANGE: {
         const newState = { ...state.values, [action.field]: action.value };
         return { ...state, values: newState };
      }
      case TYPEACTION.VALIDATE_ALL: {
         const errors = {};
         for (const key of Object.keys(state.values)) {
            const [valid, msg] = validateField(
               key,
               state.values,
               state.validations
            );
            errors[`${key}Valid`] = valid ? null : msg;
         }
         return { ...state, errors };
      }
      case TYPEACTION.VALIDATE_ONE: {
         const [valid, msg] = validateField(
            action.field,
            state.values,
            state.validations
         );
         return {
            ...state,
            errors: {
               ...state.errors,
               [`${action.field}Valid`]: valid ? null : msg,
            },
         };
      }
      case TYPEACTION.RESET: {
         return {
            ...state,
            values: action.initialState,
            errors: {},
         };
      }
      default:
         return state;
   }
};

export const useForm = ({ initialState = {}, activeValidation = false, validations = {} }) => {

   const mergedValidations = { ...defaultValidations, ...validations };

   const [state, dispatch] = useReducer(formReducer, {
      values: initialState,
      errors: {},
      validations: mergedValidations,
   });

   // Efecto: si activeValidation, valida todo al cambiar values
   useEffect(() => {
      if (activeValidation) {
         dispatch({ type: TYPEACTION.VALIDATE_ALL });
      }
   }, [state.values, activeValidation]);

   const onInputChange = useCallback((e) => {
      const { name, value } = e.target;
      dispatch({ type: TYPEACTION.CHANGE, field: name, value });
      if (activeValidation) {
         dispatch({ type: TYPEACTION.VALIDATE_ONE, field: name });
      }
   }, [activeValidation]);

   const validateForm = useCallback(() => {
      dispatch({ type: TYPEACTION.VALIDATE_ALL });
      const isValid = Object.values(state.errors).every((e) => e == null);
      return isValid;
   }, [state.errors]);

   const onResetForm = useCallback(() => {
      dispatch({ type: TYPEACTION.RESET, initialState });
   }, [initialState]);

   const onSubmitForm = useCallback(
      (callback) => (event) => {
         event.preventDefault();
         if (activeValidation && !validateForm()) return;
         callback(event);
      },
      [activeValidation, validateForm]
   );

   return {
      ...state.values,
      ...state.errors,
      formState: state.values,
      formValidation: state.errors,
      onInputChange,
      onResetForm,
      onSubmitForm,
   };
};