import { Badge } from "@/components/ui/badge";

const projectsData = [
	{
		title: "Qualcomm Redesign",
		url: "https://www.qualcomm.com",
		description:
			"Led the front-end development for a major website rebrand, migrating from Ember.js to React to enhance performance and maintainability.",
		tags: ["React", "Ember.js", "JavaScript", "Leadership"],
	},
	{
		title: "Faceparty Social Network",
		url: "https://www.faceparty.com",
		description:
			"Co-founded and scaled one of the UK's earliest social platforms to 3 million users, architecting the entire high-traffic, distributed system from the ground up.",
		tags: ["Entrepreneurship", "Scalability", "Full-Stack", "Product"],
	},
	{
		title: "LivePerson Design System",
		url: "https://www.liveperson.com",
		description:
			"Built a robust Design System and Component Library using Storybook, React, and Web Components, ensuring design consistency across all company applications.",
		tags: ["Design Systems", "React", "Storybook", "Vue.js"],
	},
	{
		title: "Monocle Magazine",
		url: "https://monocle.com",
		description:
			"Developed the online presence for a global design magazine with a focus on meticulous detail and responsive design using an XML-based CMS.",
		tags: ["CMS", "HTML/CSS", "Responsive Design"],
	},
];

export default function ProjectSpotlight() {
	return (
		<section className="container max-w-2xl mx-auto px-4">
			<h2 className="typography-heading-2 mb-4">
				Project Spotlight
			</h2>
			<div
				className="grid sm:grid-cols-2 gap-6"
				id="projects-container"
			>
				{projectsData.map((project) => (
					<div
						key={project.title}
						className="p-6 rounded-lg border shadow-xs hover:shadow-md transition-shadow duration-300"
					>
						<h3 className="typography-heading-6">
							<a
								href={project.url}
								target="_blank"
								rel="noopener noreferrer"
								className="text-secondary-foreground hover:underline"
							>
								{project.title}
								<span className="sr-only"> — external link</span>
							</a>
						</h3>
						<p className="typography-small mt-2">{project.description}</p>
						<div className="mt-4 flex flex-wrap gap-2">
							{project.tags.map((tag) => (
								<Badge key={tag} variant="outline">
									{tag}
								</Badge>
							))}
						</div>
					</div>
				))}
			</div>
		</section>
	);
}
