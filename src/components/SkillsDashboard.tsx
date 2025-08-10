"use client"

import {
	PolarAngleAxis,
	PolarGrid,
	PolarRadiusAxis,
	Radar,
	RadarChart,
} from "recharts";
import { Badge } from "@/components/ui/badge";
import {
	type ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";
import { BoxReveal } from "./BoxReveal";

export const skillsData = {
	Languages: ["TypeScript", "JavaScript", "HTML5", "CSS3"],
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
		expertise: 10,
	},
	{
		area: "Backend",
		expertise: 6,
	},
	{
		area: "Leadership",
		expertise: 6,
	},
	{
		area: "Architecture",
		expertise: 8,
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
		color: "var(--primary)",
	},
} satisfies ChartConfig;

export default function SkillsDashboard() {
	return (
		<section className="container max-w-2xl mx-auto px-4">
			<BoxReveal direction="right">
				<h2 className="typography-heading-2 mb-6">
					Skills & Expertise
				</h2>
			</BoxReveal>
			<div className="grid md:grid-cols-2 gap-6 items-center py-4">
				<div>
					<ChartContainer
						config={chartConfig}
						className="mx-auto"
					>
						<RadarChart
							data={chartData}							
							outerRadius="80%"
						>
							<ChartTooltip cursor={false} content={<ChartTooltipContent />} />
							<PolarAngleAxis dataKey="area" className="font-mono"/>
							<PolarGrid />
							{/* Explicit radius axis so max value (10) maps to outerRadius; red, smaller tick labels */}
							<PolarRadiusAxis domain={[0, 10]} angle={90} tick={false} />
							<Radar
								dataKey="expertise"
								fill={chartConfig.expertise.color}
								fillOpacity={0.3}
								stroke={chartConfig.expertise.color}
								strokeWidth={2}
							/>
						</RadarChart>
					</ChartContainer>
				</div>
				<div>
					<div className="flex flex-wrap gap-2">
						{Object.entries(skillsData).map(([category, skills]) =>
							skills.map((skill) => (
								<BoxReveal key={category + skill} direction="right">
									<Badge variant="default" className="font-mono">
										{skill}
									</Badge>
								</BoxReveal>
							)),
						)}
					</div>
				</div>
			</div>
		</section>
	);
}
