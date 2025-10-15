'use client';

import { Search } from 'lucide-react';
import { useState } from 'react';

import Button from '@/components/atoms/button/Button';

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
    <div className="flex w-full gap-2">
      <input
        className="flex-1 rounded-2xl border border-gray-300 px-6 py-5 text-base text-gunmetal placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        placeholder="Značka nebo model"
        type="text"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <Button icon={<Search className="size-5" />} size="narrow" variant="primary" onClick={handleSearch}>
        Hledat
      </Button>
    </div>
  );
};
