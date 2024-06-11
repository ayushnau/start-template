import React from "react";
import { twMerge } from "tailwind-merge";

export interface SubTitle1Interface {
	children: string;
	classes?: string;
}

const SubTitle1: React.FC<SubTitle1Interface> = ({
	children,
	classes = "",
}) => {
	return (
		<label
			className={twMerge(
				"font-inter text-base leading-6 -tracking-[0.3px] text-black",
				classes,
			)}
		>
			{children}
		</label>
	);
};

export default SubTitle1;
