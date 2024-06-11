import { WiredUpHomeIcon } from "icons";
import TrialTag from "./src/TrialTag";
import React from "react";

export interface HomeHeadingInterface {
	expireyDate: Date;
}

const HomeHeading: React.FC<HomeHeadingInterface> = ({ expireyDate }) => {
	// const expireyDate =
	return (
		<div
			id="home-heading"
			className="fixed top-0 w-full h-14 bg-white z-10 my-auto px-5 flex items-center justify-between border-b border-mine-shaft-2"
		>
			<WiredUpHomeIcon />
			{/* <TrialTag date={expireyDate} /> */}
		</div>
	);
};

export default HomeHeading;
