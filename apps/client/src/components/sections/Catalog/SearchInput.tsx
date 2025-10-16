'use client';

import { Search } from 'lucide-react';
import { useState } from 'react';

import { ButtonIcon } from '@/components/atoms/button/ButtonIcon';

export const SearchInput = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    // TODO: Implement search functionality
    console.log('Searching for:', searchTerm);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="relative w-full">
      <input
        aria-label="Hledat značku nebo model"
        className="h-14 w-full rounded-2xl border border-gray-300 px-6 text-base text-gunmetal placeholder:text-gray-400 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
        id="search-input"
        name="search-input"
        placeholder="Hledat značku nebo model"
        type="text"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <div className="absolute top-1/2 right-0 -translate-y-1/2">
        <ButtonIcon
          className="!h-14 !w-14 !p-0"
          icon={<Search className="size-6" />}
          variant="primary-inverted"
          onClick={handleSearch}
        />
      </div>
    </div>
  );
};
