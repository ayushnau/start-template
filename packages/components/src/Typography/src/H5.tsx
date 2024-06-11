import React from "react";
import { twMerge } from "tailwind-merge";

export interface H5Interface {
	children: string;
	classes?: string;
}

const H5: React.FC<H5Interface> = ({ children, classes = "" }) => {
	return (
		<label
			className={twMerge(
				"font-inter text-[25px] font-bold leading-[34px] -tracking-[0.5px] text-black",
				classes,
			)}
		>
			{children}
		</label>
	);
};

export default H5;
