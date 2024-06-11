import { WebFooter } from "icons";
import React from "react";

export interface FooterInterface {}

const Footer: React.FC<FooterInterface> = ({}) => {
	return (
		<div id="web-footer" className="">
			<WebFooter />
		</div>
	);
};

export default Footer;
