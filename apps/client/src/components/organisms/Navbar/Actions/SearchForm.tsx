import { SearchIcon } from 'lucide-react';
import React from 'react';

export const SearchForm: React.FC = () => (
  <form
    className="hidden h-[45px] w-[282px] items-center rounded-[18px] border border-slate-400/60 bg-slate-100/70 px-5 transition focus-within:border-slate-500 xl:flex"
    role="search"
  >
    <input
      aria-label="Hledat"
      className="flex-1 bg-transparent text-[14px] outline-none placeholder:text-slate-400"
      placeholder="Hledat..."
      type="text"
    />
    <button
      aria-label="Hledat"
      className="h-5 w-5 shrink-0 cursor-pointer text-slate-400 transition hover:text-slate-600"
      type="submit"
    >
      <SearchIcon className="h-5 w-5 text-slate-400" />
    </button>
  </form>
);
