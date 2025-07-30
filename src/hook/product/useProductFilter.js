import { useEffect, useState } from 'react'

export const useProductFilter = (productsData) => {
   const [products] = useState(productsData)
   const [filteredProducts, setFilteredProducts] = useState(productsData)
   const [searchTerm, setSearchTerm] = useState('')
   const [selectedCategory, setSelectedCategory] = useState('Todos')
   const [sortBy, setSortBy] = useState('popular')
   const [viewMode, setViewMode] = useState('grid')

   useEffect(() => {
      filterProducts(searchTerm, selectedCategory, sortBy)
   }, [searchTerm, selectedCategory, sortBy])

   const handleSearch = (term) => {
      setSearchTerm(term)
   }

   const handleCategoryFilter = (category) => {
      setSelectedCategory(category)
   }

   const handleSort = (sort) => {
      setSortBy(sort)
   }

   const filterProducts = (search, category, sort) => {
      let filtered = [...products]

      if (search) {
         filtered = filtered.filter(
            (product) =>
               product.name.toLowerCase().includes(search.toLowerCase()) ||
               product.description.toLowerCase().includes(search.toLowerCase()),
         )
      }

      if (category !== 'all') {
         filtered = filtered.filter((product) => product.category === category.name)
      }

      switch (sort) {
         case 'price-low':
            filtered.sort((a, b) => a.price - b.price)
            break
         case 'price-high':
            filtered.sort((a, b) => b.price - a.price)
            break
         case 'rating':
            filtered.sort((a, b) => b.rating - a.rating)
            break
         case 'popular':
         default:
            filtered.sort((a, b) => {
               if (a.isPopular && !b.isPopular) return -1
               if (!a.isPopular && b.isPopular) return 1
               return b.reviewCount - a.reviewCount
            })
            break
      }

      setFilteredProducts(filtered)
   }


   return {
      products,
      filteredProducts,
      searchTerm,
      selectedCategory,
      sortBy,
      viewMode,
      setViewMode,
      handleSearch,
      handleCategoryFilter,
      handleSort,
   }
}
