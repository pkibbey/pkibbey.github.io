import { BritishAirwaysLogo, DysonLogo, FpLogo, LeicesterLogo, LevelLogo, LivePersonLogo, MandsLogo, MaseratiLogo, MetaLogo, MonocleLogo, NokiaLogo, QualcommLogo } from "@/components/logos";
import { TimelineItem, type TimelineItemData } from "@/components/TimelineItem";
import { BoxReveal } from "./BoxReveal";

export const timelineData: TimelineItemData[] = [
	{
		role: "Senior Fullstack Engineer",
		company: "Level Home",
		url: "www.level.co",
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
		role: "Senior Lead Instructor",
		company: "Meta University",
		url: "www.meta.com",
		period: "2022 – 2023",
		details: [
			"Taught React and Node.js to over 100 software engineer students.",
			"Provided extensive online support, helping students achieve an 80% pass rate.",
			"Developed curriculum and learning materials for continued education.",
		],
		logo: <MetaLogo className="w-20" />,
	},
	{
		role: "Senior Fullstack Engineer",
		company: "LivePerson",
		url: "www.liveperson.com",
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
		role: "Senior Frontend Engineer",
		company: "Qualcomm",
		url: "www.qualcomm.com",
		period: "2013 – 2016",
		details: [
			"Led front-end work on the Qualcomm.com redesign while partnering with Mirum.",
			"Improved site performance, responsiveness, and accessibility across devices."
		],
		logo: <QualcommLogo className="w-20" />,
	},
	{
		role: "Frontend Engineer",
		company: "Monocle Magazine",
		url: "www.monocle.com",
		period: "2013",
		details: [
			"Developed the online presence for a global design magazine.",
			"Focused on meticulous UI detail, responsive design, and an XML-based CMS integration.",
		],
		logo: <MonocleLogo className="w-20" />,
	},
	{
		role: "Frontend Developer",
		company: "Maserati",
		url: "www.maserati.com",
		period: "2006",
		details: [
			"Contract work on marketing and product microsites, focusing on responsive UI and image-heavy layouts.",
		],
		logo: <MaseratiLogo className="w-20" />,
	},
	{
		role: "Web Developer",
		company: "British Airways",
		url: "www.britishairways.com",
		period: "2005",
		details: [
			"Contract work on customer-facing airline web experiences, focusing on accessibility and stability at scale.",
		],
		logo: <BritishAirwaysLogo className="w-20" />,
	},
	{
		role: "Business Owner / Co-founder",
		company: "Faceparty",
		url: "www.faceparty.com",
		period: "2000 – 2004",
		details: [
			"Co-founded and built one of the UK's first social networks, scaling to 3 million users.",
			"Pioneered solutions for high-volume traffic, developing a performant, distributed network.",
			"On-site training in product ideation, marketing, design, and large-scale event management.",
		],
		logo: <FpLogo className="w-20" />,
	},
	{
		role: "Web Designer",
		company: "Nokia",
		url: "www.nokia.com",
		period: "2000",
		details: [
			"Worked on mobile and web interface projects, emphasizing cross-device compatibility and performant assets.",
		],
		logo: <NokiaLogo className="w-20" />,
	},
	{
		role: "Web Designer",
		company: "Dyson",
		url: "www.dyson.com",
		period: "1999",
		details: [
			"My first web development role, inspired by the web and the entrepreneurial spirit of James Dyson.",
			"Worked on early web projects and site maintenance, learning HTML, CSS, and JavaScript."
		],
		logo: <DysonLogo className="w-20" />,
	},
	{
		role: "BSc Computer Science",
		company: "University of Leicester",
		period: "1996 – 1999",
		details: [
			"Studied object-oriented and functional programming paradigms and languages.",
			"Covered system design and software architecture principles.",
			"Learned database fundamentals including relational and non-relational systems.",
			"Explored parallel and concurrent computing concepts and practical techniques."
		],
		logo: <LeicesterLogo className="w-20" />
	},
];

export default function CareerTimeline() {
	return (
		<section className="container max-w-2xl mx-auto px-4">
			<BoxReveal direction="right">
				<h2 className="typography-heading-2 mb-6">Career Journey</h2>
			</BoxReveal>
			<div className="max-w-2xl mx-auto grid gap-4">
				{timelineData.map((item) => (
					<BoxReveal key={item.role + item.company} direction="right">
						<TimelineItem  {...item} />
					</BoxReveal>
				))}
			</div>
		</section>
	);
}