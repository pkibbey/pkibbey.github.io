import type React from "react";
import type { AnchorHTMLAttributes, ReactNode } from "react";

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & { children?: ReactNode };

const LinkButton: React.FC<Props> = ({ href, children, ...rest }) => {
	return (
		<a
			href={href}
			{...rest}
			className="inline-block px-4 py-2 bg-cyan-700 text-white rounded-sm hover:bg-cyan-800"
		>
			{children}
		</a>
	);
};

export default LinkButton;
