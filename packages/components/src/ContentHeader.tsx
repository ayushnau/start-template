import React, { FC } from "react";

interface ContentHeaderProps {
	heading: string;
	subHeading: string;
}

const ContentHeader: FC<ContentHeaderProps> = (props) => {
	return (
		<>
			<div className="text-black text-2xl font-inter font-bold">
				{props.heading}
			</div>
			<div className="text-mine-shaft-3 text-sm mt-2">{props.subHeading}</div>
		</>
	);
};

export default ContentHeader;
