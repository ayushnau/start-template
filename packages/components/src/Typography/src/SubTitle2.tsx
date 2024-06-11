import React from "react";
import { twMerge } from "tailwind-merge";

export interface SubTitle2Interface {
	children: string;
	classes?: string;
}

const SubTitle2: React.FC<SubTitle2Interface> = ({
	children,
	classes = "",
}) => {
	return (
		<label
			className={twMerge(
				"font-inter text-sm leading-[22px] text-mine-shaft-4",
				classes,
			)}
		>
			{children}
		</label>
	);
};

export default SubTitle2;
