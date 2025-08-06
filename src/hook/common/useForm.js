import { useCallback, useEffect, useReducer, useRef } from 'react';

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
   DATA_RESET: 'DATA_RESET',
   DATA_RESET_VALUE: 'DATA_RESET_VALUE',
}

const validateField = (key, state, validations, additionalData, disabledMap) => {
   if (disabledMap && disabledMap.current.has(key)) return [true, ''];
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
               state.additionalData,
               state.disabledMap
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
            state.additionalData,
            state.disabledMap
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

      case TYPEACTION.DATA_RESET_VALUE: {

         return {
            ...state,
            values: {
               ...state.values,
               ...action.initialState
            }
            
         };
      }

      case TYPEACTION.DATA_RESET: {
         const resetSate = Object.entries(state.values).map(([key, value]) => {
            const reset = Object.keys(action.dataReset).find((keyReset) => keyReset === key);
            if (reset) {
               return [key, action.initialState[key]]
            }
            return [key, value]
         });

         const resetError = Object.entries(state.errors).map(([key, value]) => {
            const reset = Object.keys(action.dataReset).find((keyReset) => keyReset === key);
            if (reset) {
               return [key, '']
            }
            return [key, value]
         })

         return {
            ...state,
            values: Object.fromEntries(resetSate),
            errors: Object.fromEntries(resetError),
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
export const useForm = ({
   initialState = {},
   activeValidation = true,
   validations = {},
   additionalData = {},
   changeValueCallback = null
}) => {

   const mergedValidations = { ...defaultValidations, ...validations };

   const changeValueCallbackRef = useRef(changeValueCallback);
   const disabledMap = useRef(new Map());

   const userChangedFields = useRef(new Set());
   const isInitialForm = useRef(false);

   const [state, dispatch] = useReducer(formReducer, {
      values: initialState,
      errors: {},
      validations: mergedValidations,
      additionalData,
      disabledMap
   });

   useEffect(() => {
      if (!changeValueCallback) return;
      changeValueCallbackRef.current = changeValueCallback;
   }, [changeValueCallback]);

   // const [disabledMap, setDisabledMap] = useState({});

   const onInitialFrom = (newInitialState) => {
      isInitialForm.current = true;
      userChangedFields.current.clear();
      dispatch({ type: TYPEACTION.RESET, initialState: newInitialState });
      window.requestAnimationFrame(() => {
         isInitialForm.current = false;
      });
   };

   const onInitialValues = (initialValue) => {
      if (!initialValue) return;
      isInitialForm.current = true;
      userChangedFields.current.clear();
      dispatch({ type: TYPEACTION.DATA_RESET_VALUE, initialState: initialValue });
      window.requestAnimationFrame(() => {
         isInitialForm.current = false;
      });
   };

   const onValueChange = useCallback((e) => {
      if (!e) return;
      const name = e?.target?.name ?? e.name;
      let value = e?.target?.value ?? e.value;
      const type = e?.target?.type ?? e.type;

      if (type === 'number' && value !== '') {
         const num = Number(value);
         value = isNaN(num) ? '' : num;
      }

      if (disabledMap.current.has(name)) {
         disabledMap.current.delete(name);
      };

      dispatch({ type: TYPEACTION.CHANGE, field: name, value });

      if (activeValidation) {
         dispatch({ type: TYPEACTION.VALIDATE_ONE, field: name });
      }

      if (!isInitialForm.current) {
         userChangedFields.current.add(name);
         changeValueCallbackRef.current?.({ name, value });
      }
   }, [activeValidation]);

   const isFieldChangedByUser = (field) => {
      return userChangedFields.current.has(field);
   };

   const isAnyFieldChangedByUser = () => {
      return userChangedFields.current.size > 0;
   };

   const setChangeValueCallback = (callback) => {
      changeValueCallbackRef.current = callback
   };

   const validateForm = useCallback(() => {
      const errors = {};
      for (const key of Object.keys(state.values)) {
         const [valid, msg] = validateField(key, state.values, state.validations, state.additionalData, disabledMap);
         errors[`${key}Valid`] = valid ? null : msg;
      }

      dispatch({ type: TYPEACTION.VALIDATE_ALL });
      return {
         isValid: Object.values(errors).every((e) => e == null),
         errors,
      };
   }, [state.values, state.validations, state.additionalData, disabledMap]);

   const onResetForm = useCallback((dataReset) => {
      if (!dataReset) {
         dispatch({ type: TYPEACTION.RESET, initialState });
         return;
      };

      dispatch({ type: TYPEACTION.DATA_RESET, dataReset: dataReset, initialState });

   }, [initialState]);

   const onSubmitForm = useCallback(
      (callback) => (event) => {
         event.preventDefault();
         // event.stopPropagation();
         const inputDisables = event.target.querySelectorAll('input:disabled');
         if (inputDisables) {
            for (const element of inputDisables) {
               const { name, disabled } = element;
               disabledMap.current.set(name, disabled);
            }
         } else {
            disabledMap.current.clear()
         }

         const { isValid } = validateForm();
         if (activeValidation && !isValid) {
            // dispatch({ type: TYPEACTION.VALIDATE_ALL });
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
      // ...state.values,
      // ...state.errors,
      formState: state.values,
      formValidation: state.errors,
      validateForm,
      onValueChange,
      onResetForm,
      onSubmitForm,
      onInitialFrom,
      onInitialValues,
      isFormValid,
      setChangeValueCallback,
      isAnyFieldChangedByUser,
      isFieldChangedByUser
   };
};