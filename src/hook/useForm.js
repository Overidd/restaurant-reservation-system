import { useCallback, useReducer, useRef } from 'react';

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

const validateField = (key, state, validations, additionalData) => {
   const rule = validations[key];
   if (!rule) return [true, ''];
   const [fn, msg, needsWholeState] = rule;
   const valid = needsWholeState ? fn(state[key], state, additionalData) : fn(state[key]);
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
               state.validations,
               state.additionalData
            );
            errors[`${key}Valid`] = valid ? null : msg;
         }
         return { ...state, errors };
      }
      case TYPEACTION.VALIDATE_ONE: {
         const [valid, msg] = validateField(
            action.field,
            state.values,
            state.validations,
            state.additionalData
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

// , isEstablishInitial = false
export const useForm = ({ initialState = {}, activeValidation = true, validations = {}, additionalData = {}, changeValueCallback = null }) => {

   const mergedValidations = { ...defaultValidations, ...validations };

   const changeValueCallbackRef = useRef(changeValueCallback);

   const [state, dispatch] = useReducer(formReducer, {
      values: initialState,
      errors: {},
      validations: mergedValidations,
      additionalData
   });

   const onInitialFrom = (newInitialState) => {
      // dispatch({ type: TYPEACTION.SET_VALIDATIONS, validations: newValidations });
      dispatch({ type: TYPEACTION.RESET, initialState: newInitialState });
   };

   const onValueChange = useCallback((e) => {
      if (!e) return;
      const name = e.name || e.target.name;
      const value = e.value || e.target.value;


      dispatch({ type: TYPEACTION.CHANGE, field: name, value });
      if (activeValidation) {
         dispatch({ type: TYPEACTION.VALIDATE_ONE, field: name });
      }

      changeValueCallbackRef.current && changeValueCallbackRef.current({ name, value });
   }, [activeValidation]);

   const setChangeValueCallback = (callback) => {
      changeValueCallbackRef.current = callback
   };

   const validateForm = useCallback(() => {
      const errors = {};
      for (const key of Object.keys(state.values)) {
         const [valid, msg] = validateField(key, state.values, state.validations, state.additionalData);
         errors[`${key}Valid`] = valid ? null : msg;
      }
      dispatch({ type: TYPEACTION.VALIDATE_ALL });
      return {
         isValid: Object.values(errors).every((e) => e == null),
         errors,
      };
   }, [state.values, state.validations, state.additionalData]);

   const onResetForm = useCallback(() => {
      dispatch({ type: TYPEACTION.RESET, initialState });
   }, [initialState]);

   const onSubmitForm = useCallback(
      (callback) => (event) => {
         event.preventDefault();
         const { isValid } = validateForm();
         if (activeValidation && !isValid) {
            // También puedes forzar un dispatch si quieres actualizar el estado de errores visualmente
            dispatch({ type: TYPEACTION.VALIDATE_ALL });
            return;
         }
         callback(state.values);
      },
      [activeValidation, validateForm, state.values]
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
      setChangeValueCallback,
   };
};