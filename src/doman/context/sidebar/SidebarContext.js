import { createContext } from 'react';

// type SidebarContextType = {
//    isExpanded: boolean;
//    isMobileOpen: boolean;
//    isHovered: boolean;
//    activeItem: string | null;
//    openSubmenu: string | null;
//    toggleSidebar: () => void;
//    toggleMobileSidebar: () => void;
//    setIsHovered: (isHovered: boolean) => void;
//    setActiveItem: (item: string | null) => void;
//    toggleSubmenu: (item: string) => void;
// };

export const SidebarContext = createContext(undefined);