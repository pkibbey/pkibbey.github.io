import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

// Add types and a presentational component for timeline items
export interface TimelineItemData {
	role: string;
	company: string;
	url?: string;
	period: string;
	details: string[];
	logo?: React.ReactNode;
}

export function TimelineItem({ role, period, details, logo, url }: TimelineItemData) {

	return (
		<Accordion type="single" collapsible>
			<AccordionItem value="item">
				<AccordionTrigger className="items-center cursor-pointer p-0 group">
					<div className="flex items-center gap-4 cursor-pointer w-full">
						<div className="flex-1">
							<h3 className="typography-heading-6 group-hover:underline">{role}</h3>
							<p className="text-muted typography-small">{period}</p>
						</div>
						{logo && (
							<div className="shrink-0">
								{logo}
							</div>
						)}
					</div>
				</AccordionTrigger>
				<AccordionContent className="py-2">
					<div className="flex items-center pb-2 gap-2">
						{url && (
							<a href={`http://${url}`} target="_blank" rel="noopener noreferrer" className="text-primary">
								{url}
							</a>
						)}
					</div>
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


