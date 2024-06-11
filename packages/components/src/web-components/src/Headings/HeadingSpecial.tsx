import React from "react";

export interface Heading1Interface {
	text: string;
}

const HeadingSpecial: React.FC<Heading1Interface> = ({ text }) => {
	return (
		<label className="font-inter text-[22.131px] font-bold leading-[31.869px] -tracking-[0.443px] text-mine-shaft-4">
			{text}
		</label>
	);
};

export default HeadingSpecial;
