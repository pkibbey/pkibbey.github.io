import type React from "react";

interface SeparatorProps {
	className?: string;
}

const Separator: React.FC<SeparatorProps> = ({ className = "" }) => {
	return (
		<div className={`flex items-center justify-start ${className}`}>
			<div className="h-[1px] w-12 bg-gradient bg-gray-300 dark:bg-gray-700" />
		</div>
	);
};

export default Separator;
