import { WiredUpLogo } from "icons";
import React from "react";
import Heading1 from "./Headings/HeadingSpecial";
import { useNavigate } from "react-router-dom";

export interface TopbarInterface {}

const Topbar: React.FC<TopbarInterface> = ({}) => {
	const navigate = useNavigate();
	return (
		<div
			onClick={() => navigate("/")}
			className="p-6 flex items-center justify-start border-b border-b-color-black-1"
		>
			<WiredUpLogo />
			<Heading1 text="WiredUp" />
		</div>
	);
};

export default Topbar;
