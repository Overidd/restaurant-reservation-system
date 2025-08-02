import { cn } from '@/ultils';
import {
   AlignLeft,
   ChevronDown,
   Menu,
   X,
} from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router';
import { navItemsData } from '.';
import { Button } from '../UI/common';


function useSidebar() {
   const [isExpanded, setIsExpanded] = useState(true)
   const [isMobileOpen, setIsMobileOpen] = useState(false)
   const [isHovered, setIsHovered] = useState(false)
   const [isMobile, setIsMobile] = useState(false)

   useEffect(() => {
      const checkMobile = () => {
         setIsMobile(window.innerWidth < 768)
         if (window.innerWidth >= 768) {
            setIsMobileOpen(false)
         }
      }

      checkMobile()
      window.addEventListener('resize', checkMobile)
      return () => window.removeEventListener('resize', checkMobile)
   }, [])

   const toggleSidebar = useCallback(() => {
      if (isMobile) {
         setIsMobileOpen(!isMobileOpen)
      } else {
         setIsExpanded(!isExpanded)
      }
   }, [isMobile, isMobileOpen, isExpanded])

   const closeMobileSidebar = useCallback(() => {
      if (isMobile) {
         setIsMobileOpen(false)
      }
   }, [isMobile])

   return {
      isExpanded,
      isMobileOpen,
      isHovered,
      isMobile,
      setIsHovered,
      toggleSidebar,
      closeMobileSidebar,
   }
}

export function Sidebar() {
   const {
      isExpanded,
      isMobileOpen,
      isHovered,
      isMobile,
      setIsHovered,
      toggleSidebar,
      closeMobileSidebar
   } = useSidebar()

   const location = useLocation()
   const [openSubmenu, setOpenSubmenu] = useState(null)
   const [subMenuHeight, setSubMenuHeight] = useState({})
   const subMenuRefs = useRef({})

   const isActive = useCallback(
      (path) => {
         return (
            location.pathname === path ||
            (path.startsWith('/client-profile') && location.pathname.startsWith('/client-profile'))
         )
      },
      [location.pathname],
   )

   useEffect(() => {
      if (openSubmenu !== null && subMenuRefs.current[openSubmenu]) {
         setSubMenuHeight((prev) => ({
            ...prev,
            [openSubmenu]: subMenuRefs.current[openSubmenu]?.scrollHeight || 0,
         }))
      }
   }, [openSubmenu])

   const handleSubmenuToggle = (index) => {
      setOpenSubmenu((prev) => (prev === index ? null : index))
   }

   const handleLinkClick = () => {
      closeMobileSidebar()
   }

   // Cerrar sidebar móvil al hacer click fuera
   useEffect(() => {
      const handleClickOutside = (event) => {
         if (isMobileOpen && isMobile) {
            const sidebar = document.getElementById('sidebar')
            const mobileButton = document.getElementById('mobile-toggle')

            if (
               sidebar &&
               !sidebar.contains(event.target) &&
               mobileButton &&
               !mobileButton.contains(event.target)
            ) {
               closeMobileSidebar()
            }
         }
      }

      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
   }, [isMobileOpen, isMobile, closeMobileSidebar])

   const sidebarWidth = isExpanded || isHovered || isMobileOpen ? 'w-64' : 'w-20'
   const showLabels = isExpanded || isHovered || isMobileOpen


   return (
      <div
         className='h-full relative'
      >
         <button
            id='mobile-toggle'
            onClick={toggleSidebar}
            className={cn(
               'fixed top-4 left-4 z-50 md:hidden',
               'rounded-lg shadow-lg p-2 transition-all duration-200',
               'focus:outline-none focus:ring-2',
               'backdrop-blur-sm border',
               'bg-sidebar-background text-sidebar-foreground',
               isMobileOpen && 'left-[272px]',
            )}
            aria-label='Toggle Menu'
         >
            {isMobileOpen
               ? <X className='h-5 w-5' />
               : <Menu className='h-5 w-5' />
            }
         </button>

         {/* {isMobileOpen && isMobile && (
            <div
               role='presentation'
               className='fixed inset-0 z-40 md:hidden transition-opacity duration-300'
               onClick={closeMobileSidebar}
            />
         )} */}

         <aside
            id='sidebar'
            onMouseEnter={() => !isExpanded && !isMobile && setIsHovered(true)}
            onMouseLeave={() => !isMobile && setIsHovered(false)}
            className={cn(
               'fixed top-0 z-20 h-dvh transition-all duration-300 ease-in-out',
               'flex flex-col shadow-lg backdrop-blur-2xl',
               'bg-sidebar-background text-sidebar-foreground',
               isMobile ? (isMobileOpen ? 'translate-x-0' : '-translate-x-full') : 'translate-x-0',
               !isMobile && 'md:translate-x-0',
               sidebarWidth,
            )}
         >
            <Button
               onClick={toggleSidebar}
               size='icon'
               variant='ghost'
               className={cn(
                  'hidden md:flex absolute -right-3 top-6 z-10 rounded-full',
                  'bg-sidebar-background text-sidebar-foreground',
                  ' backdrop-blur-lg',
               )}
            >
               <AlignLeft className='h-4 w-4' />
            </Button>

            <div className={cn('p-4')}>
               {showLabels ? (
                  <img className='h-16 w-auto' src='/logo-while.png' alt='Logo' />
               ) : (
                  <img className='h-10 mx-auto' src='/logo-while.png' alt='Logo' />
               )}
            </div>

            <nav className='flex-1 overflow-y-auto overflow-x-hidden p-4 space-y-2'>
               {navItemsData.map((item, index) => {
                  const isOpen = openSubmenu === index
                  const hasActiveSubItem = item.subItems?.some((subItem) => isActive(subItem.path))
                  const isItemActive = item.path ? isActive(item.path) : hasActiveSubItem

                  return (
                     <div
                        key={item.name}
                     >
                        {item.subItems ? (
                           <div>
                              <Button
                                 variant={'ghost'}
                                 onClick={() => handleSubmenuToggle(index)}
                                 className={cn(
                                    'w-full flex items-center transition-all duration-200',
                                    'text-left',
                                    isItemActive && 'bg-accent',
                                    !isItemActive && 'hover:bg-transparent',
                                 )}
                              >
                                 <span className='flex-shrink-0'>
                                    {item.icon}
                                 </span>
                                 {showLabels && (
                                    <>
                                       <span className='flex-1 font-medium'>
                                          {item.name}
                                       </span>
                                       <ChevronDown
                                          className={cn('h-4 w-4 transition-transform duration-200', isOpen && 'rotate-180')}
                                       />
                                    </>
                                 )}
                              </Button>

                              {/* Submenu */}
                              {item.subItems && showLabels && (
                                 <div
                                    className='overflow-hidden transition-all duration-300 ease-in-out'
                                    style={{
                                       height: isOpen ? `${subMenuHeight[index] || 0}px` : '0px',
                                    }}
                                    ref={(el) => {
                                       subMenuRefs.current[index] = el
                                    }}
                                 >
                                    <div className='mt-1 ml-8 space-y-1'>
                                       {item.subItems.map((subItem) => (
                                          <Link
                                             key={subItem.name}
                                             to={subItem.path}
                                             onClick={handleLinkClick}
                                          >
                                             <Button
                                                variant={'ghost'}
                                                className={cn(
                                                   'w-full text-left justify-start',
                                                   isActive(subItem.path) && 'bg-accent',
                                                   !isActive(subItem.path) && 'hover:bg-transparent',
                                                )}
                                             >
                                                <span className='flex-shrink-0'>
                                                   {subItem.icon}
                                                </span>
                                                <span>
                                                   {subItem.name}
                                                </span>
                                             </Button>
                                          </Link>
                                       ))}
                                    </div>
                                 </div>
                              )}
                           </div>
                        ) : (
                           <Link
                              to={item.path}
                              onClick={handleLinkClick}
                           >
                              <Button
                                 variant={'ghost'}
                                 className={cn(
                                    'w-full text-left justify-start',
                                    isItemActive && 'bg-accent',
                                    !isItemActive && 'hover:bg-transparent',
                                 )}
                              >
                                 <span className='flex-shrink-0'>
                                    {item.icon}
                                 </span>
                                 {showLabels && <span className='font-medium'>
                                    {item.name}
                                 </span>}
                              </Button>
                           </Link>
                        )}
                     </div>
                  )
               })}
            </nav>

            {/* Footer */}
            {/* {showLabels && (
               <div
                  className='p-4 border-t'
                  style={{
                     borderColor: 'var(--sidebar-border)',
                     color: 'var(--sidebar-foreground)',
                  }}
               >
                  <div className='text-xs opacity-70 text-center'>© 2024 Tu Empresa</div>
               </div>
            )} */}
         </aside>

         {/* Main content spacer for desktop */}
         <div className={cn('hidden md:block transition-all duration-300', sidebarWidth)} />
      </div>
   )
}
