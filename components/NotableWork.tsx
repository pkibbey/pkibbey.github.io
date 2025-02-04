import type React from 'react';
import type { ReactNode, AnchorHTMLAttributes } from 'react';

interface Props extends AnchorHTMLAttributes<HTMLAnchorElement> {
  imageProps: React.ImgHTMLAttributes<HTMLImageElement>;
  title: string;
  href: string;
  children?: ReactNode;
}

const NotableWork: React.FC<Props> = ({
  imageProps,
  title,
  href,
  children,
  ...props
}) => {
  return (
    <a
      href={href}
      target="_blank"
      className="group block rounded-lg p-4 md:p-6 h-full bg-gray-50/50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800"
      {...props}
    >
      <div className="relative h-30 mb-4 overflow-hidden rounded-md flex items-center justify-center">
        <img
          {...imageProps}
          className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
          alt={`${title} project screenshot`}
          loading="lazy"
        />
      </div>
      <h3 className="heading-3 mb-2 text-gray-700 dark:text-gray-100 group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-all duration-300">
        {title}
      </h3>
      <div className="text-content-small text-gray-500 dark:text-gray-400 line-clamp-3">
        {children}
      </div>
    </a>
  );
};

export default NotableWork;
