import type React from 'react';

interface SectionProps {
  title?: string;
  children?: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ title = '', children }) => {
  return (
    <div className="mb-8 md:mb-12">
      {title && <h2 className="heading-2 mb-4">{title}</h2>}
      {children}
    </div>
  );
};

export default Section;
