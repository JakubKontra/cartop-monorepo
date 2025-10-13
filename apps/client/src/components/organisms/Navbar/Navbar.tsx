import { ScaleIcon, SearchIcon, UserIcon } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

import { Logo } from '@/components/branding/Logo';

export default function Navbar() {
  return (
    <header className="w-full bg-white">
      <nav className="max-w-7xl mx-auto h-[60px] md:h-20 px-6 flex items-center justify-between gap-6">
        <Link href="/" className="shrink-0 select-none" aria-label="Cartop — home">
          <Logo className="text-primary" />
        </Link>

        <ul className="hidden lg:flex items-center gap-10 text-gunmetal font-sora font-normal text-base leading-[160%] tracking-[0.01em] flex-grow justify-center">
          <li>
            <Link
              href="#offers"
              className="inline-flex items-center gap-1 hover:text-slate-900 transition"
            >
              <span>Všechny nabídky</span>
              <span className="text-slate-400">▾</span>
            </Link>
          </li>
          <li>
            <Link href="#how" className="hover:text-slate-900 transition">
              Jak to funguje?
            </Link>
          </li>
          <li>
            <Link href="#contact" className="hover:text-slate-900 transition">
              Kontakt
            </Link>
          </li>
        </ul>

        <div className="flex items-center gap-2">
          <form
            className="hidden md:flex items-center bg-slate-100/70 border border-slate-400/60 rounded-[18px] h-[45px] px-5 focus-within:border-slate-500 transition"
            role="search"
            style={{ width: '282px' }}
          >
            <input
              type="text"
              placeholder="Hledat..."
              className="flex-1 bg-transparent outline-none placeholder:text-slate-400 text-[14px]"
              aria-label="Hledat"
            />
            <button
              type="submit"
              className="shrink-0 w-5 h-5 text-slate-400 hover:text-slate-600 transition cursor-pointer"
              aria-label="Hledat"
            >
              <SearchIcon className="text-slate-400 w-5 h-5" />
            </button>
          </form>

          <button
            type="button"
            className="h-[45px] w-[45px] rounded-[16px] hover:opacity-80 active:opacity-60 transition-opacity flex items-center justify-center cursor-pointer"
            style={{ backgroundColor: '#8CA1B2' }}
            aria-label="Akce 1"
          >
            <ScaleIcon className="text-white w-5 h-5" />
          </button>
          <button
            type="button"
            className="h-[45px] w-[45px] rounded-[16px] hover:opacity-80 active:opacity-60 transition-opacity flex items-center justify-center cursor-pointer"
            style={{ backgroundColor: '#8CA1B2' }}
            aria-label="Akce 1"
          >
            <UserIcon className="text-white w-5 h-5" />
          </button>
        </div>
      </nav>
    </header>
  );
}
