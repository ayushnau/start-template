import React from "react";
import { twMerge } from "tailwind-merge";

export interface SubTitle3Interface {
	children: string;
	classes?: string;
}

const SubTitle3: React.FC<SubTitle3Interface> = ({
	children,
	classes = "",
}) => {
	return (
		<label
			className={twMerge(
				"font-inter text-xs leading-4 text-mine-shaft-3",
				classes,
			)}
		>
			{children}
		</label>
	);
};

export default SubTitle3;
