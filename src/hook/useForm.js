import { useCallback, useReducer } from 'react';

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
   SET_VALIDATIONS: 'SET_VALIDATIONS',
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

      case TYPEACTION.SET_VALIDATIONS:
         return {
            ...state,
            validations: action.validations,
         };

      default:
         return state;
   }
};

export const useForm = ({ initialState = {}, activeValidation = true, validations = {} }) => {
   const mergedValidations = { ...defaultValidations, ...validations };

   const [state, dispatch] = useReducer(formReducer, {
      values: initialState,
      errors: {},
      validations: mergedValidations,
   });

   const onInitialFrom = (newInitialState, newValidations) => {
      dispatch({ type: TYPEACTION.SET_VALIDATIONS, validations: newValidations });
      dispatch({ type: TYPEACTION.RESET, initialState: newInitialState });
   };

   const onValueChange = useCallback((e) => {
      const name = e.name || e.target.name;
      const value = e.value || e.target.value;

      dispatch({ type: TYPEACTION.CHANGE, field: name, value });
      if (activeValidation) {
         dispatch({ type: TYPEACTION.VALIDATE_ONE, field: name });
      }
   }, [activeValidation]);

   const validateForm = useCallback(() => {
      const errors = {};
      for (const key of Object.keys(state.values)) {
         const [valid, msg] = validateField(key, state.values, state.validations);
         errors[`${key}Valid`] = valid ? null : msg;
      }
      dispatch({ type: TYPEACTION.VALIDATE_ALL });
      return {
         isValid: Object.values(errors).every((e) => e == null),
         errors,
      };
   }, [state.values, state.validations]);

   const onResetForm = useCallback(() => {
      dispatch({ type: TYPEACTION.RESET, initialState });
   }, [initialState]);

   const onSubmitForm = useCallback(
      (callback) => (event) => {
         event.preventDefault();
         const { isValid, errors } = validateForm();
         if (activeValidation && !isValid) {
            // También puedes forzar un dispatch si quieres actualizar el estado de errores visualmente
            dispatch({ type: TYPEACTION.VALIDATE_ALL });
            return;
         }
         callback(errors);
      },
      [activeValidation, validateForm]
   );

   const isFormValid = useCallback(() => {
      return Object.values(state.errors).every((e) => e == null);
   }, [state.errors]);

   return {
      ...state.values,
      ...state.errors,
      formState: state.values,
      formValidation: state.errors,
      validateForm,
      onValueChange,
      onResetForm,
      onSubmitForm,
      onInitialFrom,
      isFormValid,
   };
};