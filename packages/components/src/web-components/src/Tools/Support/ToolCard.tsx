import React from "react";
import { twMerge } from "tailwind-merge";

export interface ToolCardInterface {
	children: React.ReactNode;
	classes?: string;
}

const ToolCard: React.FC<ToolCardInterface> = ({ children, classes = "" }) => {
	return (
		<div
			className={twMerge(
				"flex flex-col p-4 border border-mine-shaft-2 rounded-xl",
				classes,
			)}
		>
			{children}
		</div>
	);
};

export default ToolCard;
