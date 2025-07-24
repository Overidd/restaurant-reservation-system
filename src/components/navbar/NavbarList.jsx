
import { cn } from '@/ultils';
import { NavLink } from 'react-router-dom';

export const NavbarList = ({ className, data = [], isMobile = false, onItemClick }) => {
  return (
    <ul
      className={cn(
        'text-accent-foreground',
        isMobile && 'flex flex-col w-full gap-4',
        !isMobile && 'flex items-center gap-6',
        className,
      )}
    >
      {data.map(({ name, path, id }, index) => (
        <li
          className={cn(
            'transition-all duration-200',
            isMobile && 'w-full',
          )}
          key={id ?? `nav-item-${index}`}
        >
          <NavLink
            className={({ isActive }) =>
              cn(
                'font-medium transition-colors duration-200 relative item-menu',
                isActive ? 'text-accent-foreground' : 'text-accent-foreground/70 hover:text-accent-foreground/90',
                !isMobile && [
                  'text-sm rounded-md',
                ],
                isMobile && [
                  'text-lg block w-full text-center py-3 px-4 rounded-lg',
                  isActive && 'bg-accent/10 text-accent-foreground',
                  'hover:bg-accent/5',
                ],
              )
            }
            to={path}
            onClick={onItemClick}
          >
            {name}
          </NavLink>
        </li>
      ))}
    </ul>
  )
}
