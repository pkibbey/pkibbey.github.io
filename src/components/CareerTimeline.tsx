import { FpLogo, LevelLogo, LivePersonLogo, MetaLogo, QualcommLogo, VizioLogo } from "@/components/logos";
import { TimelineItem } from "@/components/TimelineItem";

export interface TimelineItemData {
	role: string;
	company: string;
	period: string;
	details: string[];
	logo?: React.ReactNode;
}

const timelineData: TimelineItemData[] = [
	{
		role: "Senior Software Engineer",
		company: "Level Home",
		period: "2022 – 2024",
		details: [
			"Architected a monorepo of Node.js, Next.js, and Remix apps for smart apartment device management.",
			"Collaborated with UX to create a comprehensive Design System using Figma and React.",
			"Mentored junior team members, improving code quality and fostering a growth mindset.",
			"Achieved 80% code coverage with Jest, Vitest, and Playwright tests.",
			"Reduced team technical debt by 70%, accelerating feature delivery.",
		],
		logo: <LevelLogo className="w-20" />
	},
	{
		role: "Lead Instructor",
		company: "Meta University",
		period: "2022 – 2023",
		details: [
			"Developed and delivered curriculum to teach React and Node.js to classes of 40 software engineers.",
			"Provided extensive online support, helping students achieve an 80% pass rate.",
			"Continuously improved learning materials based on classroom feedback.",
		],
		logo: <MetaLogo className="w-20" />,
	},
	{
		role: "Senior Fullstack Engineer",
		company: "LivePerson",
		period: "2018 – 2022",
		details: [
			"Spearheaded development of four scalable web apps, using both React and Vue.js.",
			"Built a robust Design System and Component Library with Storybook, React, and Web Components.",
			"Mentored multiple team members, contributing to their professional promotion.",
			"Developed secure API proxy servers using Node.js and Express.",
		],
		logo: <LivePersonLogo className="w-20" />,
	},
	{
		role: "Senior Fullstack Engineer",
		company: "Vizio",
		period: "2016 – 2018",
		details: [
			"Resolved critical production issues with Adaptive Video Streaming on a React/Node.js TV platform.",
			"Led the effort to replace the core video player, significantly improving performance.",
			"Fixed high-priority UI bugs in a Chrome-based TV web app.",
		],
		logo: <VizioLogo className="w-20" />,	
	},
	{
		role: "Business Owner / Co-founder",
		company: "Faceparty",
		period: "2000 – 2004",
		details: [
			"Co-founded and built one of the UK's first social networks, scaling to 3 million users.",
			"Pioneered solutions for high-volume traffic, developing a performant, distributed network.",
			"Gained invaluable experience in product ideation, marketing, design, and large-scale event management.",
		],
		logo: <FpLogo className="w-20" />,
	},
	{
		role: "Early Career",
		company: "Various Agencies",
		period: "1996 – 2015",
		details: [
			"Worked as a Frontend Engineer at Mirum, leading the Qualcomm.com redesign.",
			"Developed a cross-platform mobile app using React Native at the startup Lennd.",
			"Gained a BSc in Computer Science from Leicester University.",
		],
		logo: <QualcommLogo className="w-20" />
	},
];

export default function CareerTimeline() {
	return (
		<section id="career" className="container max-w-2xl mx-auto px-4">
			<h2 className="typography-heading-3 mb-4">Career Journey</h2>
			<p className="typography-body mb-4">
				My career is a story of continuous adaptation and learning, from
				co-founding one of the UK's first social networks to architecting
				solutions for modern smart homes.
			</p>
			<div className="max-w-2xl mx-auto grid gap-4">
				{timelineData.map((item) => (
					<TimelineItem key={item.role + item.company} {...item} />
				))}
			</div>
		</section>
	);
}