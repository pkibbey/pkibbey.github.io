import type React from 'react';

interface WorkExperienceDateProps {
  start: string;
  end: string;
}

const WorkExperienceDate: React.FC<WorkExperienceDateProps> = ({
  start,
  end,
}) => {
  return (
    <div className="flex items-center gap-2">
      <span className="text-content-xs text-gray-500 dark:text-gray-400">
        {start}
        {end !== '' && ` - ${end}`}
      </span>
    </div>
  );
};

export default WorkExperienceDate;
