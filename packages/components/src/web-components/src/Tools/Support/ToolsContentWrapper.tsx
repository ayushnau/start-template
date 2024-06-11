import React from "react";
import { twMerge } from "tailwind-merge";

export interface ToolsContentWrapper {
	children: React.ReactNode;
	classes?: string;
}

const ToolsContentWrapper: React.FC<ToolsContentWrapper> = ({
	children,
	classes,
}) => {
	return (
		<div className={twMerge("pt-4 px-5 flex flex-col gap-y-4", classes)}>
			{children}
		</div>
	);
};

export default ToolsContentWrapper;
