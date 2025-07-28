export const typeStatusTable = {
   BUSY: 'busy',
   AVAILABLE: 'available',
   NOTAVAILABLE: 'notAvailable',
   CONFIRMED: 'confirmed',
   PENDING: 'pending',
   SELECTED: 'selected',
   BLOCKED: 'blocked',
   RELEASED: 'released',
   CANCELED: 'canceled',
   ACTIVE: 'active',
   COMPLETED: 'completed',
   NOSHOW: 'noShow',
};


export const translateStatus = (status) => {
   switch (status) {
      case typeStatusTable.BUSY:
         return 'Ocupado'
      case typeStatusTable.AVAILABLE:
         return 'Disponible'
      case typeStatusTable.CONFIRMED:
         return 'Confirmado'
      case typeStatusTable.PENDING:
         return 'Pendiente'
      case typeStatusTable.SELECTED:
         return 'Seleccionado'
      case typeStatusTable.BLOCKED:
         return 'Bloqueado'
      case typeStatusTable.RELEASED:
         return 'Liberado'
      case typeStatusTable.CANCELED:
         return 'Cancelado'
      case typeStatusTable.ACTIVE:
         return 'Activo'
      case typeStatusTable.COMPLETED:
         return 'Completado'
      case typeStatusTable.NOSHOW:
         return 'No presentado'
      case typeStatusTable.NOTAVAILABLE:
         return 'No disponible'
      default:
         return 'Desconocido'
   }
}