import type React from 'react';
import HeaderLink from './HeaderLink';
import MobileNav from './MobileNav';
import SocialLinks from './SocialLinks';

const Header: React.FC = () => {
  return (
    <>
      <header className="sticky top-0 z-10 bg-white/80 dark:bg-black/80 backdrop-blur-xs border-b border-gray-200 dark:border-gray-800">
        <nav className="container max-w-4xl mx-auto px-4 flex items-center justify-between gap-8">
          <button
            id="open-nav"
            type="button"
            aria-label="Open navigation menu"
            className="sm:hidden text-gray-500 hover:text-gray-900 dark:hover:text-gray-100 py-4"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
          <div className="hidden sm:flex items-center sm:gap-2 md:gap-4">
            <HeaderLink href="/">Home</HeaderLink>
            <HeaderLink href="/resume">Resume</HeaderLink>
          </div>
          <SocialLinks />
        </nav>
      </header>
      <MobileNav />
    </>
  );
};

export default Header;
