import { useForm } from '@/hook';
import { useDimensionMap } from '@/hook/dashboard';
import { AdminTableToasts } from '@/toasts';
import { Card2 } from '../UI/card';
import { Button, CardTitle, SlideOver } from '../UI/common';
import { Checkbox, Form, FormItem, FormLabel, FromGroup, Input } from '../UI/from';

export const EditDimensionMapSlide = ({
   className,
   restaurant,
   isOpen = false
}) => {
   const {
      updateDimension,
      changeValueDimension,
      isLoddingUpdate,
   } = useDimensionMap();

   const {
      onSubmitForm,
      onValueChange,
      formState: {
         rows,
         columns
      },
   } = useForm({
      activeValidation: true,
      initialState: {
         rows: restaurant?.rows || 1,
         columns: restaurant?.columns || 1
      },

      changeValueCallback: ({ name, value }) => {
         if (!name || !value) return;
         changeValueDimension({ name, value })
      }
   });

   const onSubmit = onSubmitForm((value) => {
      AdminTableToasts.updateDimension(
         updateDimension({
            ...restaurant,
            rows: value.rows,
            columns: value.columns
         })
      )
   })

   return (
      <SlideOver
         isOpen={isOpen}
         direction='topleft'
      >
         <Card2 className={className}>
            <CardTitle>
               {restaurant?.name}
            </CardTitle>
            <Form
               onSubmit={onSubmit}
            >
               <FormLabel className={'mt-2'}>
                  Plano
               </FormLabel>
               <FromGroup
                  className={'flex flex-row gap-4'}
               >
                  <FormItem className={'flex flex-row gap-2 items-center'}>
                     <FormLabel>
                        X
                     </FormLabel>
                     <Input
                        size='sm'
                        type='number'
                        variant={'crystal'}
                        name='rows'
                        value={rows}
                        onChange={onValueChange}
                     />
                  </FormItem>
                  <FormItem className={'flex flex-row gap-2 items-center'}>
                     <FormLabel>
                        Y
                     </FormLabel>
                     <Input
                        size='sm'
                        type='number'
                        variant={'crystal'}
                        name='columns'
                        value={columns}
                        onChange={onValueChange}
                     />
                  </FormItem>
               </FromGroup>
               <FormItem
                  className={'flex flex-row gap-2 items-center'}
               >
                  <Checkbox size='sm' />
                  <FormLabel>
                     Mostrar lineas
                  </FormLabel>
               </FormItem>

               <FormItem>
                  <Button
                     type='submit'
                     disabled={isLoddingUpdate}
                     isLoading={isLoddingUpdate}
                  >
                     Actualizar
                  </Button>
               </FormItem>
            </Form>
         </Card2>
      </SlideOver>
   )
}