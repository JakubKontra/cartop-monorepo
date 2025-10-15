import { ScaleIcon, SearchIcon, UserIcon } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

import { Logo } from '@/components/branding/Logo';

const Navbar = () => {
  return (
    <header className="w-full bg-white">
      <nav className="mx-auto flex h-[60px] max-w-7xl items-center justify-between gap-6 px-6 md:h-20">
        <Link aria-label="Cartop — home" className="shrink-0 select-none" href="/">
          <Logo className="text-primary" />
        </Link>

        <ul className="font-sora hidden flex-grow items-center justify-center gap-10 text-base leading-[160%] font-normal tracking-[0.01em] text-gunmetal lg:flex">
          <li>
            <Link
              className="inline-flex items-center gap-1 transition hover:text-slate-900"
              href="#offers"
            >
              <span>Všechny nabídky</span>
              <span className="text-slate-400">▾</span>
            </Link>
          </li>
          <li>
            <Link className="transition hover:text-slate-900" href="#how">
              Jak to funguje?
            </Link>
          </li>
          <li>
            <Link className="transition hover:text-slate-900" href="/contacts">
              Kontakt
            </Link>
          </li>
        </ul>

        <div className="flex items-center gap-2">
          <form
            className="hidden h-[45px] items-center rounded-[18px] border border-slate-400/60 bg-slate-100/70 px-5 transition focus-within:border-slate-500 md:flex"
            role="search"
            style={{ width: '282px' }}
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

          <button
            aria-label="Akce 1"
            className="flex h-[45px] w-[45px] cursor-pointer items-center justify-center rounded-[16px] transition-opacity hover:opacity-80 active:opacity-60"
            style={{ backgroundColor: '#8CA1B2' }}
            type="button"
          >
            <ScaleIcon className="h-5 w-5 text-white" />
          </button>
          <button
            aria-label="Akce 1"
            className="flex h-[45px] w-[45px] cursor-pointer items-center justify-center rounded-[16px] transition-opacity hover:opacity-80 active:opacity-60"
            style={{ backgroundColor: '#8CA1B2' }}
            type="button"
          >
            <UserIcon className="h-5 w-5 text-white" />
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
