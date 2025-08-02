import CareerTimeline from "../components/CareerTimeline";
import ProjectSpotlight from "../components/ProjectSpotlight";
import SkillsDashboard from "../components/SkillsDashboard";

export default function ResumePage() {
	return (
		<div>
			<section id="career">
				<CareerTimeline />
			</section>
			<section id="skills">
				<SkillsDashboard />
			</section>
			<section id="projects">
				<ProjectSpotlight />
			</section>
		</div>
	);
}
