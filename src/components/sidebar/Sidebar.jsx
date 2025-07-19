import { useCallback, useEffect, useRef, useState } from 'react';

import { Link, useLocation } from 'react-router';

import { AlignLeft, Bookmark, CalendarCheck, ChartColumnStacked, ChevronDown, Dice1, X } from 'lucide-react';

import { useSidebar } from '@/hook';
import { cn } from '@/ultils';

const navItems = [
   {
      icon: <Bookmark className='text-inherit' />,
      name: 'Reservas',
      subItems: [
         {
            name: 'Calendario',
            path: '/dashboard/calendar',
            icon: <CalendarCheck />,
         },
         {
            name: 'Mesas',
            path: '/dashboard/tables',
            icon: <Dice1 />,
         }
      ],
   },

   {
      name: 'Estadisticas',
      icon: <ChartColumnStacked className='text-inherit' />,
      path: '/dashboard/statistic',
   },
];

export const Sidebar = ({
   widthDesktop,
   widthHover,
   widthMobile,
   className,
}) => {
   const { isExpanded, isMobileOpen, isHovered, setIsHovered, toggleMobileSidebar, toggleSidebar } = useSidebar();
   const location = useLocation();

   const [openSubmenu, setOpenSubmenu] = useState(null); // < { type: 'main' | 'others'; index: number } | null > 
   const [subMenuHeight, setSubMenuHeight] = useState({});
   const subMenuRefs = useRef({});

   const isActive = useCallback((path) => (
      location.pathname === path || path.startsWith('/client-profile') && location.pathname.startsWith('/client-profile')
   ), [location.pathname]);


   useEffect(() => {
      if (openSubmenu !== null) {
         const key = `${openSubmenu.type}-${openSubmenu.index}`;
         if (subMenuRefs.current[key]) {
            setSubMenuHeight((prevHeights) => ({
               ...prevHeights,
               [key]: subMenuRefs.current[key]?.scrollHeight || 0,
            }));
         }
      }
   }, [openSubmenu]);

   const handleSubmenuToggle = (index, menuType) => { // menuType: 'main' | 'others'
      setOpenSubmenu((prevOpenSubmenu) => {
         if (
            prevOpenSubmenu &&
            prevOpenSubmenu.type === menuType &&
            prevOpenSubmenu.index === index
         ) {
            return null;
         }
         return { type: menuType, index };
      });
   };

   const handleToggle = () => {
      if (window.innerWidth >= 991) {
         toggleSidebar();
      } else {
         toggleMobileSidebar();
      }
   };

   const renderMenuItems = (items = [], menuType) => (
      <ul className='flex flex-col gap-4'>
         {items.map((nav, index) => {
            const isOpen = openSubmenu?.type === menuType && openSubmenu?.index === index;
            const isItemActive = nav.subItems ? isOpen : isActive(nav.path);
            const subItem = nav.subItems?.find((item) => isActive(item.path));

            return (
               <li key={nav.name}>
                  {nav.subItems ? (
                     <button
                        onClick={() => handleSubmenuToggle(index, menuType)}
                        className={cn(
                           'cursor-pointer flex flex-row gap-2 p-2 rounded-2xl items-center',
                           'transition-all w-full',
                           !isExpanded && !isHovered ? 'lg:justify-center' : 'lg:justify-start',
                           isItemActive || subItem
                              ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                              : 'bg-sidebar text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                        )}
                     >
                        <span
                           className={cn(
                              isItemActive || subItem
                                 ? 'text-sidebar-primary-foreground'
                                 : 'text-sidebar-foreground group-hover:text-sidebar-accent-foreground'
                           )}
                        >
                           {nav.icon}
                        </span>
                        {(isExpanded || isHovered || isMobileOpen) && (
                           <span className={cn(
                              'menu-item-text text-left',
                           )}>
                              {nav.name}
                           </span>
                        )}

                        {(isExpanded || isHovered || isMobileOpen) && (
                           <ChevronDown
                              className={cn(
                                 'ml-auto w-5 h-5 transition-transform duration-200',
                                 isOpen ? 'rotate-180 text-sidebar-primary-foreground' : 'text-sidebar-primary-foreground'
                              )}
                           />
                        )}
                     </button>
                  ) : (
                     // Main items, No tiene sub items
                     nav.path && (
                        <Link
                           to={nav.path}
                           className={cn(
                              'menu-item group transition-all flex flex-row gap-2 p-2 rounded-2xl items-center',
                              isItemActive
                                 ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                                 : 'bg-sidebar text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                           )}
                        >
                           <span
                              className={cn(
                                 isItemActive
                                    ? 'text-sidebar-primary-foreground'
                                    : 'text-sidebar-foreground group-hover:text-sidebar-accent-foreground'
                              )}
                           >
                              {nav.icon}
                           </span>
                           {(isExpanded || isHovered || isMobileOpen) && (
                              <span className=''>
                                 {nav.name}
                              </span>
                           )}
                        </Link>
                     )
                  )}

                  {/* Sub items */}
                  {nav.subItems && (isExpanded || isHovered || isMobileOpen) && (
                     <div
                        ref={el => { subMenuRefs.current[`${menuType}-${index}`] = el; }}
                        className='overflow-hidden transition-all duration-300'
                        style={{
                           height: isOpen ? `${subMenuHeight[`${menuType}-${index}`]}px` : '0px',
                        }}
                     >
                        <ul className='mt-2 space-y-1 ml-5'>
                           {nav.subItems.map(subItem => (
                              <li key={subItem.name}>
                                 <Link
                                    to={subItem.path}
                                    className={cn(
                                       'menu-dropdown-item transition-all flex flex-row gap-2 p-2 px-3 rounded-2xl items-center',
                                       isActive(subItem.path)
                                          ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                                          : 'bg-sidebar text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                                    )}
                                 >
                                    <span>
                                       {subItem.icon}
                                    </span>
                                    {subItem.name}
                                 </Link>
                              </li>
                           ))}
                        </ul>
                     </div>
                  )}
               </li>
            );
         })}
      </ul>
   );


   return (
      <aside
         onMouseEnter={() => !isExpanded && setIsHovered(true)}
         onMouseLeave={() => setIsHovered(false)}
         className={cn(
            'lg:translate-x-0',
            `bg-sidebar-background`,
            'backdrop-blur-lg rounded-r-lg',
            `fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 h-screen transition-all duration-300 ease-in-out z-50`,
            isExpanded || isMobileOpen ? widthDesktop : isHovered ? widthHover : widthMobile,
            isMobileOpen ? 'translate-x-0' : '-translate-x-full',
            className
         )}
      >
         <button
            className="bg-tertiary-light-100 flex items-center justify-center w-10 h-10 text-gray-500 rounded-lg z-50 lg:h-11 lg:w-11"
            onClick={handleToggle}
            aria-label="Toggle Sidebar"
         >
            {isMobileOpen ? (
               <X className="teXt-secondary-light-200" />
            ) : <AlignLeft className="text-secondary-light-200" />}
         </button>

         {/* <div
            className={cn(
               'py-8 flex',
               !isExpanded && !isHovered ? 'lg:justify-center' : 'justify-start'
            )}
         >
            <Link to='/'>
               {isExpanded || isHovered || isMobileOpen ? (
                  <>
                     <img
                        className='dark:hidden'
                        src='/logo/TextLogo2.png'
                        alt='Logo'
                        width={240}
                        height={40}
                     />
                     <img
                        className='hidden dark:block'
                        src='/images/logo/logo-dark.svg'
                        alt='Logo 1'
                        width={150}
                        height={40}
                     />
                  </>
               ) : (
                  <img
                     className='object-contain'
                     src='/logo/logoSmall.png'
                     alt='Logo'
                     width={32}
                     height={32}
                  />
               )}
            </Link>
         </div> */}

         <div className='flex flex-col overflow-y-auto duration-300 ease-linear overflow-hidden'>
            {renderMenuItems(navItems, 'main')}
         </div>
      </aside>
   );
};