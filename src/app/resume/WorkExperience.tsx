import Section from "../../components/Section";
import WorkExperienceItem from "../../components/WorkExperienceItem";
import Highlight from "../../components/Highlight";
import Separator from "../../components/Separator";
import ScrollDate from "../../components/ScrollDate";

export default function WorkExperience() {
	return (
		<Section>
			<div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 md:gap-8">
				{/* ...existing code... */}
				<h2 className="md:hidden heading-2 mb-2">Work Experience</h2>
				<div className="hidden md:block sticky top-24 h-fit">
					<h2 className="heading-2">Work Experience</h2>
					<ScrollDate />
				</div>
				<div className="grid gap-4 md:gap-8 p-4 md:p-8 border rounded-md bg-gray-100/50 dark:bg-gray-900/50 border-gray-200 dark:border-gray-700">
					{/* List of work experience items */}
					<WorkExperienceItem
						id="work-level"
						start="Mar 2022"
						end="Aug 2024"
						company="Level Home"
						name="Senior Software Engineer"
					>
						Architected a <Highlight type="achievement">monorepo</Highlight> ...
					</WorkExperienceItem>

					<Separator />

					<WorkExperienceItem
						id="work-codepath"
						start="Jun 2022"
						end="Mar 2023"
						company="CodePath"
						name="Senior Fullstack Engineer"
					>
						Teaching <Highlight type="tech">HTML</Highlight>,{" "}
						<Highlight type="tech">CSS</Highlight>,{" "}
						<Highlight type="tech">JS</Highlight> to interns ...
					</WorkExperienceItem>

					<Separator />

					<WorkExperienceItem
						id="work-liveperson"
						start="Oct 2018"
						end="Jun 2022"
						company="LivePerson"
						name="Senior Fullstack Engineer"
					>
						Brainstormed and developed 3 web apps to allow a legacy app ...
					</WorkExperienceItem>

					<Separator />

					<WorkExperienceItem
						id="work-vizio"
						start="Sep 2017"
						end="Oct 2018"
						company="Vizio"
						name="Senior Fullstack Engineer"
					>
						Solved bugs in the <Highlight type="tech">React</Highlight>/
						<Highlight type="tech">NodeJS</Highlight> powered{" "}
						<Highlight type="tech">TV</Highlight> platform...
					</WorkExperienceItem>

					<Separator />

					<WorkExperienceItem
						id="work-cisco"
						start="Feb 2017"
						end="Sep 2017"
						company="Cisco"
						name="Senior Javascript Developer"
					>
						Developed and maintained web applications using{" "}
						<Highlight type="tech">JavaScript</Highlight> ...
					</WorkExperienceItem>

					<Separator />

					<WorkExperienceItem
						id="work-lennd"
						start="Feb 2015"
						end="Feb 2016"
						company="Lennd"
						name="Senior Fullstack Engineer"
					>
						At this <Highlight type="achievement">incubator startup</Highlight>,
						I migrated an existing web app into ...
					</WorkExperienceItem>

					<Separator />

					<WorkExperienceItem
						id="work-mirum"
						start="Oct 2013"
						end="Feb 2015"
						company="Mirum"
						name="Frontend Engineer"
					>
						Responsible for managing multiple projects in this{" "}
						<Highlight type="achievement">design agency</Highlight>...
					</WorkExperienceItem>

					<Separator />

					<WorkExperienceItem
						id="work-airlock"
						start="Feb 2012"
						end="Oct 2013"
						company="Airlock"
						name="Frontend Engineer"
					>
						Created responsive HTML web apps using an{" "}
						<Highlight type="tech">XML</Highlight> powered CMS...
					</WorkExperienceItem>

					<Separator />

					<WorkExperienceItem
						id="work-capablue"
						start="Sep 2011"
						end="Jan 2012"
						company="Capablue Ltd"
						name="TV Developer"
					>
						<Highlight type="tech">JavaScript</Highlight> Developer working on
						an Internet Connected TV Set top box.
					</WorkExperienceItem>

					<Separator />

					<WorkExperienceItem
						id="work-illustrated"
						start="Aug 2011"
						end="Sep 2011"
						company="Illustrated London News"
						name="Wordpress Developer"
					>
						Developed and maintained{" "}
						<Highlight type="tech">WordPress</Highlight> websites for various
						clients...
					</WorkExperienceItem>

					<Separator />

					<WorkExperienceItem
						id="work-adjust"
						start="Oct 2008"
						end="Oct 2010"
						company="AdjustYourSet"
						name="Web Developer"
					>
						Created{" "}
						<Highlight type="achievement">custom HTML5 video players</Highlight>{" "}
						for large retail brands...
					</WorkExperienceItem>

					<Separator />

					<WorkExperienceItem
						id="work-faceparty"
						start="Jul 2000"
						end="Aug 2004"
						company="Faceparty"
						name="Business Owner"
					>
						I{" "}
						<Highlight type="achievement">
							co-founded and built one of the first online social networks
						</Highlight>{" "}
						with a friend...
					</WorkExperienceItem>

					<Separator />

					<WorkExperienceItem
						id="work-dyson"
						start="Aug 1997"
						end="Oct 2000"
						company="Dyson"
						name="Web Developer"
					>
						Worked as a web developer at the Dyson research lab...
					</WorkExperienceItem>

					<Separator />

					<WorkExperienceItem
						id="work-contract"
						start="Jun 1997"
						end="Jul 2000"
						company="Contract"
						name="Junior Web Developer"
					>
						Whilst studying at University, I worked part-time contracting a web
						design agency...
					</WorkExperienceItem>
				</div>
			</div>
		</Section>
	);
}
