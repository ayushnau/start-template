import React from "react";
import { twMerge } from "tailwind-merge";

export interface H6Interface {
	children: string;
	classes?: string;
}

const H6: React.FC<H6Interface> = ({ children, classes = "" }) => {
	return (
		<label
			className={twMerge(
				"font-inter text-xl font-bold leading-[26px] -tracking-[0.35px] text-mine-shaft-4",
				classes,
			)}
		>
			{children}
		</label>
	);
};

export default H6;
