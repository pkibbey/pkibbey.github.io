import type React from "react";

interface SkillSetProps {
	title: string;
	skills: string[];
}

const SkillSet: React.FC<SkillSetProps> = ({ title = "", skills = [] }) => {
	return (
		<div className="mb-2 md:mb-4">
			<h3 className="heading-4 mb-3 text-gray-900 dark:text-gray-100">
				{title}
			</h3>
			<div className="flex flex-wrap gap-2">
				{skills.map((skill, i) => (
					<span
						// biome-ignore lint/suspicious/noArrayIndexKey: Skills are static and don't change
						key={i}
						className="text-content-xs text-gray-900 dark:text-gray-200 bg-gray-50/50 dark:bg-gray-900/50 rounded-md px-3 py-1 border border-gray-200 dark:border-gray-800"
					>
						{skill}
					</span>
				))}
			</div>
		</div>
	);
};

export default SkillSet;
