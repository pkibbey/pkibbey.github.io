import type React from "react";
import type { AnchorHTMLAttributes, ReactNode } from "react";

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & { children?: ReactNode };

const HeaderLink: React.FC<Props> = ({
	href,
	className = "",
	children,
	...props
}) => {
	return (
		<a
			href={href}
			className={[
				"inline-block no-underline py-4 px-3 relative transition-all duration-200",
				"overflow-hidden text-ellipsis whitespace-nowrap",
				"after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:transition-all after:duration-200",
				"after:bg-gray-200 dark:after:bg-gray-400 after:scale-x-0 after:origin-left hover:after:scale-x-100",
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
