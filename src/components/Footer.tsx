import type React from "react";
import HeaderLink from "./HeaderLink";
import SocialLinks from "./SocialLinks";

const Footer: React.FC = () => {
	return (
		<footer className="backdrop-blur-xs border-t mt-auto">
			<div className="container max-w-3xl mx-auto px-4 flex items-center justify-between gap-8">
				<div className="flex items-center gap-6">
					<div className="hidden sm:flex items-center sm:gap-2 md:gap-4">
						<HeaderLink href="#career">Career</HeaderLink>
						<HeaderLink href="#skills">Skills</HeaderLink>
						<HeaderLink href="#projects">Projects</HeaderLink>
					</div>
				</div>
				<SocialLinks />
			</div>
		</footer>
	);
};

export default Footer;
