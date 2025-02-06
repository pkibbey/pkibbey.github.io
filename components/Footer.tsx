import type React from 'react';
import SocialLinks from './SocialLinks';

const Footer: React.FC = () => {
  const today = new Date();
  return (
    <footer className="mt-auto px-4 py-12 text-center border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950/50 text-gray-500 dark:text-gray-400">
      <div className="max-w-4xl mx-auto">
        <SocialLinks />
        <p className="mt-8 text-content-sm">
          &copy; {today.getFullYear()} Phineas Kibbey. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
