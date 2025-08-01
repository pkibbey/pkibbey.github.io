import Link from "next/link";
import SidebarNav from "../../components/SidebarNav";
import CareerTimeline from "./components/CareerTimeline";
import ProjectSpotlight from "./components/ProjectSpotlight";
import SkillsDashboard from "./components/SkillsDashboard";

const sections = [
	{ id: "timeline", title: "Career Timeline" },
	{ id: "skills", title: "Skills Dashboard" },
	{ id: "projects", title: "Project Spotlight" },
	{ id: "download", title: "Download" },
];

export default function ResumePage() {
	return (
		<div className="relative">
			<div>
				<div id="timeline">
					<CareerTimeline />
				</div>
				<div id="skills">
					<SkillsDashboard />
				</div>
				<div id="projects">
					<ProjectSpotlight />
				</div>
				<div id="download" className="mt-8">
					<h2 className="heading-2 mb-4">Download</h2>
					<p className="text-lg leading-relaxed text-gray-900 dark:text-gray-200">
						My resume can be{" "}
						<Link
							href="/resume.pdf"
							passHref
							download="Phineas Kibbey - Resume"
						>
							downloaded as a PDF
						</Link>
						. Contact details are in the header of the resume.
					</p>
				</div>
			</div>
			<SidebarNav sections={sections} />
		</div>
	);
}
