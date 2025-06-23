import { Link, NavLink } from 'react-router-dom';

export const NavbarList = ({ data = [] }) => {
  return (
    <ul className='text-accent-foreground space-x-5'>
      {
        data.map(({ name, path, id }, index) => (
          <li
            className='inline-block align-middle item-menu'
            key={id ?? new Date().getTime() + index}
          >
            <NavLink
              className={({ isActive }) => (isActive ? 'text-accent-foreground' : 'text-accent-foreground/80')}
              to={path}
            >
              {name}
            </NavLink>
          </li>
        ))
      }
    </ul>
  )
}

