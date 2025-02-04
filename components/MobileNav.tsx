'use client';

import type React from 'react';
import { useState, useEffect } from 'react';
import HeaderLink from './HeaderLink'; // updated import for React

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
  }, [isOpen]);

  const toggleNav = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      id="mobile-nav"
      className={`fixed inset-0 bg-white/90 dark:bg-black/90 backdrop-blur-md transition-all duration-300 ease-in-out z-50 sm:hidden flex flex-col ${isOpen ? '' : 'translate-x-full'}`}
    >
      <div className="flex flex-col h-full">
        <div className="flex justify-end p-2 border-b border-gray-100 dark:border-gray-900 backdrop-blur-xs bg-white/80 dark:bg-black/80 sticky top-0">
          <button
            id="close-nav"
            type="button"
            aria-label="Close navigation menu"
            onClick={toggleNav}
            className="px-2 text-gray-500 hover:text-gray-900 dark:hover:text-gray-100 active:bg-gray-100 dark:active:bg-gray-800/50 rounded-lg transition-colors"
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <nav className="flex flex-col items-stretch flex-1 gap-2 p-2">
          <HeaderLink
            href="/"
            className="text-lg font-medium text-left py-3 px-4 rounded-lg transition-colors text-gray-600 dark:text-gray-400 hover:text-cyan-700 dark:hover:text-cyan-300 hover:bg-gray-50 dark:hover:bg-gray-900/50 active:bg-gray-100 dark:active:bg-gray-800/50"
          >
            <div className="flex items-center gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5"
              >
                <title>Home Icon</title>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                />
              </svg>
              Home
            </div>
          </HeaderLink>
          <HeaderLink
            href="/resume"
            className="text-lg font-medium text-left py-3 px-4 rounded-lg transition-colors text-gray-600 dark:text-gray-400 hover:text-cyan-700 dark:hover:text-cyan-300 hover:bg-gray-50 dark:hover:bg-gray-900/50 active:bg-gray-100 dark:active:bg-gray-800/50"
          >
            <div className="flex items-center gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5"
              >
                <title>Resume Icon</title>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                />
              </svg>
              Resume
            </div>
          </HeaderLink>
        </nav>
      </div>
    </div>
  );
}
