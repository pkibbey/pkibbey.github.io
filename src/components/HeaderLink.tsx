"use client";

import { usePathname } from "next/navigation";
import type React from "react";
import type { AnchorHTMLAttributes, ReactNode } from "react";

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & { children?: ReactNode };

const HeaderLink: React.FC<Props> = ({
	href,
	className = "",
	children,
	...props
}) => {
	const pathname = usePathname();
	const subpath = pathname.match(/[^/]+/g);
	const isActive = href === pathname || href === `/${subpath?.[0]}`;

	return (
		<a
			href={href}
			className={[
				"inline-block no-underline py-4 px-3 relative transition-all duration-200",
				"overflow-hidden text-ellipsis whitespace-nowrap",
				"after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:transition-all after:duration-300",
				!isActive &&
					"text-gray-600 hover:text-gray-950 dark:text-gray-400 dark:hover:text-white after:bg-gray-200 dark:after:bg-gray-700 after:scale-x-0 after:origin-left hover:after:scale-x-100",
				isActive &&
					"text-gray-950 dark:text-white after:bg-gray-900 dark:after:bg-gray-100 after:scale-x-100",
				className,
			]
				.filter(Boolean)
				.join(" ")}
			{...props}
		>
			{children}
		</a>
	);
};

export default HeaderLink;
