"use client";

import {
	PolarAngleAxis,
	PolarGrid,
	PolarRadiusAxis,
	Radar,
	RadarChart,
} from "recharts";
import { Badge } from "./ui/badge";
import {
	type ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "./ui/chart";

const skillsData = {
	Languages: ["JavaScript (ES6+)", "TypeScript", "HTML5", "CSS3"],
	"Frameworks & Libraries": [
		"Vue.js",
		"React",
		"Next.js",
		"Node.js",
		"Express",
		"GraphQL",
		"Tailwind CSS",
	],
	"Testing & Tools": ["Jest", "Vitest", "Playwright", "Git", "CI/CD", "Figma"],
	Concepts: [
		"Design Systems",
		"Agile/Scrum",
		"Mentorship",
		"Full-Stack Architecture",
	],
};

const chartData = [
	{
		area: "Frontend",
		expertise: 9,
	},
	{
		area: "Backend",
		expertise: 7,
	},
	{
		area: "Leadership",
		expertise: 8,
	},
	{
		area: "Architecture",
		expertise: 9,
	},
	{
		area: "Testing",
		expertise: 8,
	},
	{
		area: "Design",
		expertise: 7,
	},
];

const chartConfig = {
	expertise: {
		label: "Expertise Level=",
		color: "hsl(var(--chart-1))",
	},
} satisfies ChartConfig;

export default function SkillsDashboard() {
	return (
		<section id="skills" className="container max-w-2xl mx-auto">
			<h2 className="typography-heading-2 mb-8 text-center">
				Skills Dashboard
			</h2>
			<p className="mb-8">
				My technical expertise spans the full stack, with a deep focus on
				creating modern, robust, and maintainable front-end systems. This
				dashboard provides a visual overview of my core competencies.
			</p>
			<div className="grid md:grid-cols-2 gap-8 items-center">
				<div>
					<ChartContainer
						config={chartConfig}
						className="mx-auto aspect-square max-h-[400px]"
					>
						<RadarChart
							data={chartData}
							margin={{
								top: 20,
								right: 80,
								bottom: 20,
								left: 80,
							}}
						>
							<ChartTooltip cursor={false} content={<ChartTooltipContent />} />
							<PolarAngleAxis dataKey="area" />
							<PolarGrid />
							<PolarRadiusAxis
								angle={90}
								domain={[0, 10]}
								tick={false}
								tickCount={6}
							/>
							<Radar
								dataKey="expertise"
								fill="var(--color-expertise)"
								fillOpacity={0.3}
								stroke="var(--color-expertise)"
								strokeWidth={2}
							/>
						</RadarChart>
					</ChartContainer>
				</div>
				<div>
					<h3 className="typography-heading-4 mb-4">Core Competencies</h3>
					<div className="flex flex-wrap gap-3">
						{Object.entries(skillsData).map(([category, skills]) =>
							skills.map((skill) => (
								<Badge key={category + skill} variant="outline">
									{skill}
								</Badge>
							)),
						)}
					</div>
				</div>
			</div>
		</section>
	);
}
