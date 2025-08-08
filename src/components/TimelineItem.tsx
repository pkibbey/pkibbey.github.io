import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

// Add types and a presentational component for timeline items
export interface TimelineItemData {
	role: string;
	company: string;
	period: string;
	details: string[];
	logo?: React.ReactNode;
}

export function TimelineItem({ role, company, period, details, logo }: TimelineItemData) {
	return (
		<Accordion type="single" collapsible>
			<AccordionItem value="item">
				<AccordionTrigger className="items-center cursor-pointer p-0">
					<div className="flex items-center gap-4 cursor-pointer w-full">
						<div className="flex-1">
							<h3 className="typography-heading-5">{role}</h3>
							<p>{company}</p>
							<p className="typography-small">{period}</p>
						</div>
						{logo && <div className="shrink-0">{logo}</div>}
					</div>
				</AccordionTrigger>
				<AccordionContent>
					<ul className="list-disc list-inside space-y-2">
						{details.map((detail) => (
							<li key={detail}>{detail}</li>
						))}
					</ul>
				</AccordionContent>
			</AccordionItem>
		</Accordion>
	)
}
