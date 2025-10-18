import { ButtonIcon } from '@/components/atoms/button/ButtonIcon';
import { cn } from '@/utils/cv';
import { SearchIcon } from 'lucide-react';
import React from 'react';

export const SearchForm: React.FC<{ className?: string }> = ({ className }) => {
  const handleSearch = () => {
    console.log('Searching...');
  };

  return (
    <form
      className={cn(
        'flex h-11 w-full items-center rounded-2xl border border-slate-400/60 bg-slate-100/70 pl-5 transition focus-within:border-slate-500',
        className,
      )}
      role="search"
    >
      <input
        aria-label="Hledat"
        className="flex-1 bg-transparent text-[14px] outline-none placeholder:text-slate-400"
        placeholder="Hledat..."
        type="text"
      />
      <ButtonIcon
        aria-label="Hledat"
        size="small"
        icon={<SearchIcon className="h-5 w-5" />}
        variant="cadet-grey"
        onClick={handleSearch}
      />
    </form>
  );
};
