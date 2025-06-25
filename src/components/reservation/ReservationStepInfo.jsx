import { useForm, useStepFormContext } from '@/hook';
import { Button } from '../UI/common';
import {
   Form,
   FormItem,
   Input,
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue
} from '../UI/from';
import { cn } from '@/ultils/cn';

export const ReservationStepInfo = ({
   className,
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

   const onSubmit = onSubmitForm((value) => {
      console.log(value)
      nextStep();
   })

   return (
      <Form
         className={cn(
            'w-[50%] h-full mx-auto',
            className
         )}
         onSubmit={onSubmit}
      >
         <FormItem>
            <Select
               defaultValue={location ?? ''}
               onValueChange={(value) => onValueChange({ name: 'location', value })}
            >
               <SelectTrigger
                  className={'w-full'}
                  isError={!!locationValid}
                  variant='crystal'
               >
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
         </FormItem>

         <FormItem>
            <Select
               name='reason'
               defaultValue={reason ?? ''}
               onValueChange={(value) => onValueChange({ name: 'reason', value })}
            >
               <SelectTrigger
                  className={'w-full'}
                  isError={!!reasonValid}
                  variant='crystal'
               >
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
         </FormItem>

         <FormItem>
            <Input
               max={12}
               min={1}
               type='number'
               name='diners'
               variant='crystal'
               value={diners ?? ''}
               onChange={onValueChange}
               isError={!!dinersValid}
               className={'!text-lg'}
            />
         </FormItem>

         <Button
            type='submit'
            disabled={!isFormValid}
         >
            Siguiente
         </Button>
      </Form >
   )
}