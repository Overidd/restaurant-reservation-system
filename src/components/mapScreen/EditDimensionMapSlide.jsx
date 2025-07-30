import { useForm } from '@/hook/common';
import { useDimensionMap } from '@/hook/dashboard';
import { AdminTableToasts } from '@/toasts';
import { BetweenHorizontalStart, BetweenVerticalStart } from 'lucide-react';
import { memo } from 'react';
import { Card2 } from '../UI/card';
import { Button, CardTitle, SlideOver } from '../UI/common';
import { Form, FormItem, FormLabel, FromGroup, NumberInput } from '../UI/from';

export const EditDimensionMapSlide = memo(({ className, restaurant, isOpen = false }) => {

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
                  <FormItem>
                     <FormLabel>
                        Filas
                     </FormLabel>
                     <NumberInput
                        min={1}
                        axis='y'
                        name={'rows'}
                        value={rows}
                        onChange={onValueChange}
                        sensitivity={0.03}
                        prefix={
                           <BetweenHorizontalStart
                              size={14}
                              className={'-mr-2'}
                           />
                        }
                     />
                  </FormItem>
                  <FormItem>
                     <FormLabel>
                        Columnas
                     </FormLabel>
                     <NumberInput
                        min={1}
                        axis='x'
                        name={'columns'}
                        value={columns}
                        onChange={onValueChange}
                        sensitivity={0.03}
                        prefix={
                           <BetweenVerticalStart
                              size={14}
                              className={'-mr-2'}
                           />
                        }
                     />
                  </FormItem>
               </FromGroup>

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
})

EditDimensionMapSlide.displayName = 'EditDimensionMapSlide';
