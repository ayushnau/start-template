import React from "react";
import { ReuseButton } from "@locoworks/reusejs-react-button";
import RefreshIcon from "icons/RefreshIcon";
import { twMerge } from "tailwind-merge";

interface UpdatedPromptProps {
	showClock: boolean;
	text?: string;
	className?: string;
	updateAction?: () => void;
	clockClasses?: string;
	displayComponent?: React.ReactNode;
}

const UpdatedPrompt: React.FC<UpdatedPromptProps> = ({
	showClock,
	text,
	className,
	updateAction,
	clockClasses = "",
	displayComponent,
}) => {
	return (
		<div
			className={twMerge(
				`flex items-center justify-between py-2  bg-mine-shaft-1 my-2  text-blackDark ${
					showClock ? "px-5" : "px-4"
				}`,
				className,
			)}
		>
			<div className="text-blackDark font-inter text-sm leading-[22px] flex items-center">
				{showClock && <span className={twMerge("pr-2", clockClasses)}>⏱</span>}
				{text && text}
				{displayComponent && displayComponent}
			</div>
			<ReuseButton
				className={`  ${
					!showClock ? "rounded-md" : "rounded-full"
				} bg-white text-blackDark hover:bg-white border border-mine-shaft-2 cursor-pointer ml-4`}
				onClick={updateAction && updateAction}
			>
				<RefreshIcon />
				<span className="ml-[6px]">Update</span>
			</ReuseButton>
		</div>
	);
};

export default UpdatedPrompt;
