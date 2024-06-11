import React from "react";
import { twMerge } from "tailwind-merge";

export interface WarningTagInterface {
	label: string;
	className?: string;
}

const WarningTag: React.FC<WarningTagInterface> = ({ label, className }) => {
	return (
		<div
			className={twMerge(
				"text-sunset-orange-3 text-xs font-inter inline-flex font-semibold leading-[22px] bg-bean-red-light px-2 py-1 rounded-lg mt-1",
				className,
			)}
		>
			{label}
		</div>
	);
};

export default WarningTag;
