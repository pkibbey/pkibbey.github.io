import { BritishAirwaysLogo, DysonLogo, FpLogo, LevelLogo, LivePersonLogo, MandsLogo, MaseratiLogo, MetaLogo, MonocleLogo, NokiaLogo, QualcommLogo, VizioLogo } from "@/components/logos";
import { TimelineItem, type TimelineItemData } from "@/components/TimelineItem";

const timelineData: TimelineItemData[] = [
	{
		role: "Senior Software Engineer",
		company: "Level Home",
		period: "2022 – 2024",
		details: [
			"Architected a monorepo of Node.js, Next.js, and Remix apps for smart apartment blocks.",
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
			"Taught React and Node.js to over 40 software engineer students.",
			"Provided extensive online support, helping students achieve an 80% pass rate.",
			"Developed curriculum and learning materials for continued education.",
		],
		logo: <MetaLogo className="w-20" />,
	},
	{
		role: "Senior Fullstack Engineer",
		company: "LivePerson",
		period: "2018 – 2022",
		details: [
			"Spearheaded the development of four AI powered web apps, using both React and Vue.js.",
			"Built a robust Design System and React Component Library with Storybook documentation.",
			"Mentored multiple team members, contributing to their professional promotion.",
			"Developed secure API proxy servers for payment processing using Node.js.",
		],
		logo: <LivePersonLogo className="w-20" />,
	},
	{
		role: "Senior Fullstack Engineer",
		company: "Vizio",
		period: "2016 – 2018",
		details: [
			"Resolved critical video playback issues that affected thousands of production devices.",
			"Led the effort to replace the core video player, improving playback performance by 30%.",
			"Eliminated 100% of high-priority UI bugs in the React/Node.js based TV platform.",
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
		   logo: [
			   <QualcommLogo key="qualcomm-logo" className="w-20" />,
			   <DysonLogo key="dyson-logo" className="w-20" />,
			   <MaseratiLogo key="maserati-logo" className="w-20" />,
			   <MonocleLogo key="monocle-logo" className="w-20" />,
			   <NokiaLogo key="nokia-logo" className="w-20" />,
			   <MandsLogo key="mands-logo" className="w-20" />,
			   <BritishAirwaysLogo key="britishairways-logo" className="w-20" />,
		   ]
	},
];

export default function CareerTimeline() {
	return (
		<section className="container max-w-2xl mx-auto px-4">
			<h2 className="typography-heading-2 mb-4">Career Journey</h2>
			<div className="max-w-2xl mx-auto grid gap-4">
				{timelineData.map((item) => (
					<TimelineItem key={item.role + item.company} {...item} />
				))}
			</div>
		</section>
	);
}