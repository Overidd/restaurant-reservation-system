import { useForm, useStepFormContext } from '@/hook';
import { Button } from '../UI/common';
import {
   Form,
   FormItem,
   FormLabel,
   FormMessage,
   Input,
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue
} from '../UI/from';

export const ReservationStepInfo = ({
   schema,
   locationData = [],
   reasonData = []
}) => {
   const { nextStep } = useStepFormContext();

   const {
      formState: { location, reason, diners },
      formValidation: { locationValid, reasonValid, dinersValid },
      onSubmitForm,
      onValueChange,
      isFormValid,
   } = useForm({
      initialState: schema.initial,
      validations: schema.valid,
      activeValidation: true
   });

   const onSubmit = onSubmitForm((e) => {
      console.log(e)
      console.log('gaaaaa')
      nextStep();
   })

   return (
      <Form
         className='bg-white'
         onSubmit={onSubmit}
      >
         <FormItem>
            <FormLabel isError={locationValid}>
               Ubicacion
            </FormLabel>

            <Select
               defaultValue={location ?? ''}
               onValueChange={(value) => onValueChange({ name: 'location', value })}
            >
               <SelectTrigger>
                  <SelectValue placeholder="Selecione una localia" />
               </SelectTrigger>
               <SelectContent>
                  {
                     locationData.map((item) => (
                        <SelectItem key={item.id} value={item.name}>
                           {item.name}
                        </SelectItem>
                     ))
                  }
               </SelectContent>
            </Select>

            <FormMessage error={locationValid} />
         </FormItem>

         <FormItem>
            <FormLabel isError={reasonValid}>
               Motivo
            </FormLabel>
            <Select
               name='reason'
               defaultValue={reason ?? ''}
               onValueChange={(value) => onValueChange({ name: 'reason', value })}
            >
               <SelectTrigger>
                  <SelectValue placeholder="Selecione una motivo" />
               </SelectTrigger>
               <SelectContent>
                  {
                     reasonData.map((item) => (
                        <SelectItem key={item.id} value={item.name}>
                           {item.name}
                        </SelectItem>
                     ))
                  }
               </SelectContent>
            </Select>
            <FormMessage error={reasonValid} />
         </FormItem>

         <FormItem>
            <FormLabel isError={dinersValid}>
               Comenzales
            </FormLabel>
            <Input
               type='number'
               name='diners'
               value={diners ?? ''}
               min={1}
               max={12}
               onChange={onValueChange}
            />
            <FormMessage error={dinersValid} />
         </FormItem>

         <Button
            type='submit'
            disabled={!isFormValid}
         >
            Next
         </Button>
      </Form>
   )
}