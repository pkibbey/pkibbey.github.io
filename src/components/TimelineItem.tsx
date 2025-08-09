import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { LogoRotator } from "./LogoRotator";

// Add types and a presentational component for timeline items
export interface TimelineItemData {
	role: string;
	company: string;
	period: string;
	details: string[];
	logo?: React.ReactNode;
}

export function TimelineItem({ role, company, period, details, logo }: TimelineItemData) {
	const isLogoArray = Array.isArray(logo);

	return (
		<Accordion type="single" collapsible>
			<AccordionItem value="item">
				<AccordionTrigger className="items-center cursor-pointer p-0 group">
					<div className="flex items-center gap-4 cursor-pointer w-full">
						<div className="flex-1">
							<h3 className="typography-heading-6 group-hover:text-primary">{role}</h3>
							<p className="outline-0!">{company}</p>
							<p className="typography-small">{period}</p>
						</div>
						{logo && (
							<div className="shrink-0">
								{isLogoArray ? <LogoRotator items={logo as React.ReactNode[]} /> : logo}
							</div>
						)}
					</div>
				</AccordionTrigger>
				<AccordionContent className="pl-2 py-2">
					<ul className="space-y-1">
						{details.map((detail) => (
							<li key={detail} className="flex items-start gap-2">
								<span
									className="mt-2 flex-shrink-0 inline-block w-1.5 h-1.5 rounded-full bg-neutral-500"
									aria-hidden="true"
								/>
								<span>{detail}</span>
							</li>
						))}
					</ul>
				</AccordionContent>
			</AccordionItem>
		</Accordion>
	)
}


