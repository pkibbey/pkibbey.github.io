import CareerTimeline from "../components/CareerTimeline";
import ProjectSpotlight from "../components/ProjectSpotlight";
import SkillsDashboard from "../components/SkillsDashboard";

export default function HomePage() {
	return (
		<div className="grid gap-16">
			<CareerTimeline />
			<SkillsDashboard />
			<ProjectSpotlight />
		</div>
	);
}
