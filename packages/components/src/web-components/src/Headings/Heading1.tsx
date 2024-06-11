import React from "react";
import { twMerge } from "tailwind-merge";

export interface Heading1Interface {
	label: string | React.ReactNode;
	className?: string;
}

const Heading1: React.FC<Heading1Interface> = ({ label, className = "" }) => {
	return (
		<label
			className={twMerge(
				"font-inter text-[32px] font-bold -tracking-[1.5px] py-2 leading-normal",
				className,
			)}
		>
			{label}
		</label>
	);
};

export default Heading1;
