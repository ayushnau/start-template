import React from "react";
import { twMerge } from "tailwind-merge";

export interface HomeSectionWrapperInterface {
	className?: string;
	children?: React.ReactNode | React.ReactNode[];
}

const HomeSectionWrapper: React.FC<HomeSectionWrapperInterface> = ({
	className = "",
	children,
}) => {
	return (
		<div
			className={twMerge(
				"px-4 pt-2 pb-4 flex flex-col gap-y-1 border border-mine-shaft-2 rounded-xl bg-white",
				className,
			)}
		>
			{children}
		</div>
	);
};

export default HomeSectionWrapper;
