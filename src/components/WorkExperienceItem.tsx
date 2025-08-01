import type React from "react";
import WorkExperienceDate from "./WorkExperienceDate";
import WorkExperienceTitle from "./WorkExperienceTitle";

export interface WorkExperienceItemProps {
	start: string;
	end?: string;
	company: string;
	name: string;
	id?: string;
	children?: React.ReactNode;
}

const WorkExperienceItem: React.FC<WorkExperienceItemProps> = ({
	company,
	name,
	start,
	end = "",
	id,
	children,
}) => {
	return (
		<div id={id} className="space-y-2">
			<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-1">
				<div className="flex flex-col">
					<WorkExperienceTitle company={company} name={name} />
				</div>
				<WorkExperienceDate start={start} end={end} />
			</div>
			{children && (
				<div className="text-gray-600 dark:text-gray-400 text-content-secondary">
					{children}
				</div>
			)}
		</div>
	);
};

export default WorkExperienceItem;
