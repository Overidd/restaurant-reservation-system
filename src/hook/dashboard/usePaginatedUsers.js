import { useMemo, useState } from 'react';

// interface Cliente {
//    nombre: string
//    email: string
//    telefono: string
//    [key: string]: any
// }

// interface UsePaginatedClientesProps {
//    users: Cliente[]
//    itemsPerPage?: number
// }ss

export const usePaginatedUsers = ({ users, itemsPerPage = 10 }) => {
   const [searchTerm, setSearchTerm] = useState('')
   const [currentPage, setCurrentPage] = useState(1)

   const { data, totalPages, totalItems } = useMemo(() => {
      const filtered = users.filter(
         (user) => {
            return user?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
               user?.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
               user?.phone && user.phone && String(user.phone).includes(searchTerm)
         }
      )

      const totalPages = Math.ceil(filtered.length / itemsPerPage)
      const startIndex = (currentPage - 1) * itemsPerPage
      const paginatedData = filtered.slice(startIndex, startIndex + itemsPerPage)

      return {
         data: paginatedData,
         totalPages,
         totalItems: filtered.length
      }
   }, [users, searchTerm, currentPage, itemsPerPage])

   return {
      searchTerm,
      setSearchTerm,
      currentPage,
      setCurrentPage,
      filteredClientes: data,
      totalPages,
      totalItems
   }
}
