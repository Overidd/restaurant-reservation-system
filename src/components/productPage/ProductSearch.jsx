import { Search } from 'lucide-react';

import { cn } from '@/ultils/cn';

import { Input } from '../UI/from';

export const ProductSearch = () => {
  return (
    <fieldset
      className={cn(
        `w-[0rem] h-[3rem] 
        bg-card text-[#4E403C] 
        flex flex-row items-center justify-end gap-2 
        shadow-xl rounded-2xl relative 
        transition-all p-2 pr-3
        fiseldset-search
      `
      )}
    >
      <Input
        className={cn(
          `w-full h-full 
          transition-all duration-1000 delay-250 
          rounded-full shadow appearance-none
          focus:rounded-sm focus:shadow-none focus:w-full
          focus:outline-none
          not-focus:border-0 not-focus:shadow-none not-focus:cursor-pointer
          input-search
          font-semibold
          !text-lg
        `
        )}
        placeholder=" "
        autoComplete="off"
        spellCheck="false"
      />
      <Search
        className="icon-search absolute pointer-events-none w-6 h-6"
      />
      <span className="caret"/>
    </fieldset>

  )
}
// focus:p-[0.75em_1em]