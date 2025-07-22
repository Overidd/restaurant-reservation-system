import { createContext, useContext, useState } from 'react'

// Context para manejar el estado de las tabs
// interface TabsContextType {
//    activeTab: string
//    setActiveTab: (value: string) => void
// }

const TabsContext = createContext(undefined)

// Hook para usar el context
const useTabs = () => {
   const context = useContext(TabsContext)
   if (!context) {
      throw new Error('useTabs must be used within a Tabs component')
   }
   return context
}

// Componente principal Tabs
// interface TabsProps {
//    defaultValue: string
//    children: ReactNode
//    className?: string
// }

export function Tabs({ defaultValue, children, className = '' }) {
   const [activeTab, setActiveTab] = useState(defaultValue)

   return (
      <TabsContext.Provider value={{ activeTab, setActiveTab }}>
         <div className={`${className}`}>{children}</div>
      </TabsContext.Provider>
   )
}

// Lista de tabs (botones)
// interface TabsListProps {
//    children: ReactNode
//    className?: string
// }

export function TabsList({ children, className = '' }) {
   return (
      <div
         className={`mx-auto w-fit ${className}`}
      >
         {children}
      </div>
   )
}

// Trigger individual (botón de cada tab)
// interface TabsTriggerProps {
//    value: string
//    children: ReactNode
//    className?: string
// }

export function TabsTrigger({ value, children, className = '' }) {
   const { activeTab, setActiveTab } = useTabs()
   const isActive = activeTab === value

   return (
      <button
         className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${isActive ? 'bg-primary text-primary-foreground shadow-sm' : 'hover:bg-primary/5 hover:text-accent-foreground cursor-pointer'
            } ${className}`}
         onClick={() => setActiveTab(value)}
         type='button'
      >
         {children}
      </button>
   )
}

// interface TabsContentProps {
//    value: string
//    children: ReactNode
//    className?: string
// }

export function TabsContent({ value, children, className = '' }) {
   const { activeTab } = useTabs()

   if (activeTab !== value) {
      return null
   }

   return (
      <div
         className={`mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${className}`}
      >
         {children}
      </div>
   )
}