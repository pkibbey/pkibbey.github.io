'use client';

import type React from 'react';
import { useEffect } from 'react';

interface Section {
  id: string;
  title: string;
}

interface Props {
  sections: Section[];
}

const SidebarNav: React.FC<Props> = ({ sections }) => {
  useEffect(() => {
    const sectionLinks = document.querySelectorAll('[data-section-link]');
    const sectionsEl = document.querySelectorAll('[id]');

    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -80% 0px',
      threshold: 0,
    };

    function updateActiveSection(entries: IntersectionObserverEntry[]) {
      for (const entry of entries) {
        const id = entry.target.getAttribute('id')?.toLowerCase();
        const link = document.querySelector(`[data-section-link="${id}"]`);

        if (entry.isIntersecting && link) {
          for (const link of sectionLinks) {
            link.classList.remove(
              'text-gray-950',
              'dark:text-gray-100',
              'font-medium',
            );
            link.classList.add('text-gray-600', 'dark:text-gray-400');
          }

          link.classList.remove('text-gray-600', 'dark:text-gray-400');
          link.classList.add(
            'text-gray-950',
            'dark:text-gray-100',
            'font-medium',
          );
        }
      }
    }

    const observer = new IntersectionObserver(
      updateActiveSection,
      observerOptions,
    );
    for (const section of sectionsEl) {
      observer.observe(section);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <nav className="hidden xl:block fixed right-[max(1rem,calc((100vw-85rem)/2+1rem))] top-32 space-y-2 w-48">
      <div className="rounded-lg bg-white/20 dark:bg-black/15 p-4 ring-1 ring-gray-900/5 dark:ring-white/5">
        <p className="text-content-small text-gray-800 dark:text-gray-200 mb-4">
          On this page
        </p>
        <div className="max-h-[60vh] overflow-y-auto pr-2 -mr-2">
          {sections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              data-section-link={section.id}
              className="block py-2 text-content-small text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors"
            >
              {section.title}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default SidebarNav;
