import { Link } from 'react-router';

// interface DropdownItemProps {
//   tag?: 'a' | 'button';
//   href?: string;
//   onClick?: () => void;
//   onItemClick?: () => void;
//   baseClassName?: string;
//   className?: string;
//   children: React.ReactNode;
// }

export const DropdownItem = ({
  tag = 'button',
  href,
  onClick,
  onItemClick,
  baseClassName = 'block w-full text-left px-4 py-2 text-sm cursor-pointer',
  className = '',
  children,
}) => {
  const combinedClasses = `${baseClassName} ${className}`.trim();

  const handleClick = () => {
    if (onClick) onClick();
    if (onItemClick) onItemClick();
  };

  if (tag === 'a' && href) {
    return (
      <Link to={href} className={combinedClasses} onClick={handleClick}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={handleClick} className={combinedClasses}>
      {children}
    </button>
  );
};
