import { cn } from '@/ultils';
import { ChevronDown, Dice1, LoaderCircle, X } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Button } from '../common';

export const MultiSelect = ({
   onChange,
   options = [],
   selected = [],
   className = '',
   placeholder = 'Selecciona',
   isLoading = false,
   disabled = false
}) => {
   const [isOpen, setIsOpen] = useState(false);
   const [searchTerm, setSearchTerm] = useState('');
   const dropdownRef = useRef(null);
   const inputRef = useRef(null);
   const valueSelectRef = useRef(null);

   useEffect(() => {
      if (disabled) return;

      const handleClickOutside = (event) => {
         if (
            dropdownRef.current &&
            !dropdownRef.current.contains(event.target)
         ) {
            setIsOpen(false);
            setSearchTerm('');
         }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
   }, [disabled]);

   const availableOptions = useMemo(
      () => options.filter(
         (option) => !selected.some((s) => s.id === option.id)
      ), [options, selected]
   );

   const filteredOptions = useMemo(
      () => availableOptions.filter((option) =>
         option.name.toLowerCase().includes(searchTerm.toLowerCase())
      ), [availableOptions, searchTerm]
   );

   const handleOptionSelect = (option) => {
      if (disabled) return;
      onChange([...selected, valueSelectRef.current ?? option]);
      setSearchTerm('');
      valueSelectRef.current = null;
      inputRef.current?.focus();
   };

   const handleOptionRemove = (optionToRemove) => {
      if (disabled) return;
      onChange(selected.filter((option) => option.id !== optionToRemove.id));
   };

   const handleKeyDown = (e) => {
      if (e.key === 'Backspace' && searchTerm === '' && selected.length > 0) {
         handleOptionRemove(selected[selected.length - 1]);
      } else if (e.key === 'Escape') {
         setIsOpen(false);
         setSearchTerm('');
      } else if (e.key === 'Enter' && filteredOptions.length > 0) {
         e.preventDefault();
         handleOptionSelect(filteredOptions[0]);
      }
   };

   const handleOpenDropdown = () => {
      if (disabled) return;
      setIsOpen(true);
      inputRef.current?.focus();
   };

   const toggleDropdown = (e) => {
      if (disabled) return;
      e.stopPropagation();
      setIsOpen((prev) => !prev);
   };

   return (
      <div
         ref={dropdownRef}
         className={cn(
            'relative',
            disabled && 'cursor-not-allowed opacity-50',
            className
         )}
      >
         <div
            role='button'
            tabIndex={0}
            onClick={handleOpenDropdown}
            onKeyDown={(e) => e.key === 'Enter' && handleOpenDropdown()}
            className={cn(
               'min-h-[44px] w-full rounded-lg p-2 flex items-center input-style-class'
            )}
         >
            <div className='flex-1 flex flex-wrap items-center gap-1'>
               {selected.map((option) => (
                  <Button
                     type='button'
                     key={option.id}
                     variant='crystal'
                     onClick={(e) => {
                        e.stopPropagation();
                        handleOptionRemove(option);
                     }}
                     className='group relative'
                  >
                     <Dice1 /> {option.name} (sillas: {option.chairs})
                     <X className='opacity-50 transition-opacity duration-300 group-hover:opacity-100 ml-1' />
                  </Button>
               ))}
               <input
                  ref={inputRef}
                  type='text'
                  value={searchTerm}
                  disabled={disabled}
                  onChange={(e) => {
                     setSearchTerm(e.target.value);
                     setIsOpen(true);
                  }}
                  onKeyDown={handleKeyDown}
                  onFocus={() => setIsOpen(true)}
                  placeholder={selected.length === 0 ? placeholder : ''}
                  className='flex-1 outline-none bg-transparent'
               />
            </div>
            <button type='button' onClick={toggleDropdown}>
               {
                  isLoading ? (
                     <LoaderCircle className='animate-spin' />
                  ) : (
                     <ChevronDown
                        className={cn(
                           'h-4 w-4 transition-transform',
                           isOpen && 'rotate-180'
                        )}
                     />
                  )
               }
            </button>
         </div>

         {isOpen && (
            <div className='absolute z-10 mt-1 w-full rounded-lg border shadow-lg bg-background text-foreground'>
               {filteredOptions.length > 0 ? (
                  <ul className='max-h-60 overflow-auto py-1 [&::-webkit-scrollbar]:h-0 [&::-webkit-scrollbar]:w-0'>
                     {filteredOptions.map((option) => (
                        <li key={option.id}>
                           <button
                              type='button'
                              tabIndex={0}
                              className='w-full px-3 py-2 text-left hover:bg-secondary hover:text-secondary-foreground'
                              onClick={() => handleOptionSelect(option)}
                              onMouseOver={() => (valueSelectRef.current = option)}
                              onFocus={() => (valueSelectRef.current = option)}
                           >
                              <Dice1 className='inline-block align-middle mr-2' />
                              <span className='align-middle'>
                                 {option.name} (sillas: {option.chairs})
                              </span>
                           </button>
                        </li>
                     ))}
                  </ul>
               ) : (
                  <p className='px-3 py-2'>
                     {searchTerm ? 'No hay resultados' : 'No hay más opciones'}
                  </p>
               )}
            </div>
         )}
      </div>
   );
}