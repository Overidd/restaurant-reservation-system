import { Badge, Button, CardHeader } from '../UI/common';
import { Edit2, Save, X } from 'lucide-react';
import { UserCard } from '../UI/card';

export const UserDetailHeader = ({
   isEditing,
   loading,
   selectUser,
   setIsEditing
}) => (
   <CardHeader className={'flex-row flex items-center'}>
      <div className='flex flex-row gap-4 items-center'>
         <UserCard
            size='2xl'
            className={'text-accent-foreground'}
            mustShow={['name']}
            user={selectUser}
         />
         <Badge
            variant='cristal'
            className='mt-1 capitalize'
         >
            {selectUser.role || 'Usuario'}
         </Badge>
      </div>
      {isEditing ? (
         <div className='ml-auto space-x-2'>
            <Button
               disabled={loading.updateProfile}
               className='gap-2'
               form='formUpdateUser'
               type='submit'
               size='sm'
            >
               <Save className='h-4 w-4' />
               Guardar
            </Button>
            <Button
               onClick={() => setIsEditing(false)}
               disabled={loading.updateProfile}
               className='gap-2 bg-transparent'
               variant='ghost'
               type='button'
               size='sm'
            >
               <X className='h-4 w-4' />
               Cancelar
            </Button>
         </div>
      ) : (
         <Button
            onClick={() => setIsEditing(true)}
            className='gap-2 ml-auto'
            variant='ghost'
         >
            <Edit2 className='h-4 w-4' />
            Editar
         </Button>
      )}
   </CardHeader>
);