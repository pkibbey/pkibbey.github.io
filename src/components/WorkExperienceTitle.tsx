import type React from "react";

interface WorkExperienceTitleProps {
	company: string;
	name: string;
}

const WorkExperienceTitle: React.FC<WorkExperienceTitleProps> = ({
	company,
	name,
}) => {
	return (
		<>
			<h3 className="heading-3 text-cyan-900 dark:text-cyan-100">{company}</h3>
			<p className="text-content text-gray-800 dark:text-gray-300">{name}</p>
		</>
	);
};

export default WorkExperienceTitle;
