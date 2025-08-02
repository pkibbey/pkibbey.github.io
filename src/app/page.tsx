import CareerTimeline from "../components/CareerTimeline";
import ProjectSpotlight from "../components/ProjectSpotlight";
import SkillsDashboard from "../components/SkillsDashboard";

export default function ResumePage() {
	return (
		<div>
			<CareerTimeline />
			<SkillsDashboard />
			<ProjectSpotlight />
		</div>
	);
}
