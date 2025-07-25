import { AdminTableToasts } from '@/toasts';
import { cn } from '@/ultils';
import { AlertTriangle, Dice1 } from 'lucide-react';
import { useRef, useState } from 'react';
import { Card2 } from '../card';
import { Button, CardContent, CardFooter, CardHeader, CardTitle, Toggle } from '../common';
import { Checkbox, Label } from '../from';


export const DialigCancelReserve = ({
   onCancelATablesReservation,
   onConfirm,
   onCancel,
   table,
   setHighlightedTableIds = () => { },
}) => {
   const [relatedTables, setRelatedTables] = useState(table.reservation?.relatedTables ?? []);
   const [localHighlightedId, setLocalHighlightedId] = useState([]);
   const [isProcessing, setIsProcessing] = useState(false);
   const contentTogglesRef = useRef(null);
   const isCheckedNoShowRef = useRef(false);

   const toggleSelected = (item) => {
      if (isProcessing) return;
      setLocalHighlightedId((prev) => {
         let updated;
         if (prev.includes(item.id)) {
            updated = prev.filter((id) => id !== item.id);
         } else {
            updated = [...prev, item.id];
         }
         setHighlightedTableIds(updated);
         return updated;
      });
   };

   const handleCheckNoShow = () => {
      if (isProcessing) return;
      isCheckedNoShowRef.current = !isCheckedNoShowRef.current;
   }
   const handleSetRelatedTables = () => {
      setRelatedTables((prev) => prev.filter(t => !localHighlightedId.includes(t.id)));
   }

   const hasSelectes = () => {
      if (localHighlightedId.length === table.reservation.relatedTables.length) {
         onConfirm({
            user: table.user,
            tables: relatedTables.filter(t => localHighlightedId.includes(t.id)),
            idReservation: table.reservation.idReservation,
            isNoShow: isCheckedNoShowRef.current,
         });
         return;
      }

      if (localHighlightedId.length > 0) {
         setIsProcessing(true);
         AdminTableToasts.cancelATablesReservation(
            onCancelATablesReservation({
               idReservation: table.reservation.idReservation,
               tables: relatedTables.filter(t => localHighlightedId.includes(t.id)),
               tablesNoSelect: relatedTables.filter(t => !localHighlightedId.includes(t.id)),
            }),
            {
               onSuccess: () => {
                  handleSetRelatedTables();
                  setIsProcessing(false);
               },
               onError: () => {
                  setIsProcessing(false);
               },
               onFinally: () => {
                  setHighlightedTableIds((prev) => prev.filter(id => !localHighlightedId.includes(id)));
               }
            }
         )
         return;
      }

      const element = contentTogglesRef.current;
      if (!element) return;
      element.classList.remove('animate__shakeX');
      void element.offsetWidth;
      element.classList.add('animate__shakeX');
   };

   const user = table.user;
   const isActiveCheck = localHighlightedId.length === relatedTables.length;

   return (
      <Card2 className={cn(
         'p-4 flex flex-col gap-4',
         'w-72'
      )}>
         <CardHeader className={'gap-2'}>
            <div className='mx-auto w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center'>
               <AlertTriangle className="w-6 h-6 text-amber-600" />
            </div>
            <CardTitle className={'text-background text-center'}>
               Cancelar la reserva
            </CardTitle>
            <strong className={'text-background/80 text-center'}>
               {user.code}
            </strong>
         </CardHeader>

         <CardContent
            ref={contentTogglesRef}
            className='flex flex-col gap-2 animate__animated'
         >
            {
               relatedTables.map((item) => (
                  <Toggle
                     key={item.id}
                     variant={'crystal'}
                     onClick={() => toggleSelected(item)}
                     className={localHighlightedId.includes(item.id) ? 'ring-2 ring-amber-400' : ''}
                     disabled={isProcessing}
                  >
                     <Dice1 />
                     {item.name}
                  </Toggle>
               ))
            }
         </CardContent>

         <CardFooter className={'gap-4 justify-center  flex-wrap '}>
            <Label
               className={'space-x-2 text-background/70 basis-full'}
            >
               <Checkbox
                  disabled={!isActiveCheck || isProcessing}
                  onChange={handleCheckNoShow}
                  className='inline-block align-middle'
               />
               <span className='inline-block align-middle'>
                  Marcar como no-show
               </span>
            </Label>

            <Button
               onClick={hasSelectes}
               disabled={isProcessing}
               size={'sm'}
            >
               Confirmar
            </Button>
            <Button
               onClick={onCancel}
               size={'sm'}
               variant='destructive'
               disabled={isProcessing}
            >
               Eliminar
            </Button>
         </CardFooter>
      </Card2>
   )
}