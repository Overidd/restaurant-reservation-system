import { Card2 } from '../UI/card';
import { Button, CardTitle, SlideOver } from '../UI/common';
import { Checkbox, Form, FormItem, FormLabel, FromGroup, Input } from '../UI/from';

export const EditDimensionRestaurantModal = ({
   name,
   rows,
   columns,
   isOpen = false
}) => {

   return (
      <SlideOver
         isOpen={isOpen}
         direction='topleft'
      >
         <Card2 className={'w-80'}>
            <CardTitle>
               {name}
            </CardTitle>
            <Form>
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
                        // value={rows}
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
                        // value={columns}
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
                  <Button>
                     Actualizar
                  </Button>
               </FormItem>
            </Form>
         </Card2>
      </SlideOver>
   )
}