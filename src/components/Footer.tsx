import type React from "react";
import SocialLinks from "./SocialLinks";

const Footer: React.FC = () => {
	return (
		<footer className="backdrop-blur-xs border-t mt-auto">
			<div className="container max-w-4xl mx-auto px-4 flex items-center justify-between gap-8">
				<div className="flex items-center sm:gap-2 md:gap-4 py-4">
					<a
						href="/resume.pdf"
						className="inline-block no-underline py-4 px-3 relative transition-all duration-200"
						download="Phineas Kibbey - Resume"
					>
						Download Resume PDF
					</a>
				</div>
				<SocialLinks />
			</div>
		</footer>
	);
};

export default Footer;
