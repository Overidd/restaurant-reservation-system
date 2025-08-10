import { useEditTables } from '@/hook/dashboard';

export const BackdropEdit = () => {
   const { isEdit, toggleIsEdit } = useEditTables();
   if (!isEdit) return null;
   return (
      <div
         role='button'
         tabIndex={0}
         onClick={() => toggleIsEdit(false)}
         onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
               () => toggleIsEdit(false)
            }
         }}
         className='fixed inset-0 z-10 bg-black/10 backdrop-blur-[5px] transition-all'
         style={{ pointerEvents: 'auto' }}
         aria-label='Cerrar fondo del modal'
      />
   )
}
