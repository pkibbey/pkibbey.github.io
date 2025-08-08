"use client";

import { Badge } from "./ui/badge";

const projectsData = [
	{
		title: "Qualcomm.com Redesign",
		description:
			"Led the front-end development for a major website rebrand, migrating from Ember.js to React to enhance performance and maintainability.",
		tags: ["React", "Ember.js", "JavaScript", "Leadership"],
	},
	{
		title: "Faceparty Social Network",
		description:
			"Co-founded and scaled one of the UK's earliest social platforms to 3 million users, architecting the entire high-traffic, distributed system from the ground up.",
		tags: ["Entrepreneurship", "Scalability", "Full-Stack", "Product"],
	},
	{
		title: "LivePerson Design System",
		description:
			"Built a robust Design System and Component Library using Storybook, React, and Web Components, ensuring design consistency across all company applications.",
		tags: ["Design Systems", "React", "Storybook", "Vue.js"],
	},
	{
		title: "Vizio TV Platform",
		description:
			"Solved complex video streaming bugs and led the replacement of the core video player, dramatically improving performance on a React-based TV platform.",
		tags: ["React", "Node.js", "Performance", "Video Streaming"],
	},
	{
		title: "Lennd Event Management",
		description:
			"Built the core web and mobile applications for an event management system using React, React Native, and GraphQL.",
		tags: ["React", "React Native", "GraphQL", "Mobile"],
	},
	{
		title: "Monocle.com",
		description:
			"Developed the online presence for a global design magazine with a focus on meticulous detail and responsive design using an XML-based CMS.",
		tags: ["CMS", "HTML/CSS", "Responsive Design"],
	},
];

export default function ProjectSpotlight() {
	return (
		<section id="projects" className="container max-w-5xl mx-auto">
			<h2 className="typography-heading-2 mb-8 text-center">
				Project Spotlight
			</h2>
			<p className="mb-8">
				Here are a few key projects that showcase my ability to lead
				development, solve complex problems, and deliver high-impact results,
				from large-scale rebrands to innovative event management platforms.
			</p>
			<div
				className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
				id="projects-container"
			>
				{projectsData.map((project) => (
					<div
						key={project.title}
						className="p-6 rounded-lg border shadow-sm hover:shadow-lg transition-shadow duration-300"
					>
						<h3 className="typography-heading-5">{project.title}</h3>
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
