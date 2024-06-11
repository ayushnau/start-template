import React from "react";
import { ReuseButton } from "@locoworks/reusejs-react-button";
import RefreshIcon from "icons/RefreshIcon";
import { twMerge } from "tailwind-merge";
import { SubTitle2, SubTitle3 } from "./Typography";

interface UpdatePromptProps {
	showClock: boolean;
	className?: string;
	updateAction: () => void;
	clockClasses?: string;
	time?: string;
}

const UpdatePrompt: React.FC<UpdatePromptProps> = ({
	showClock,
	className,
	updateAction,
	clockClasses = "",
	time,
}) => {
	const [showToolTip, setShowTooltip] = React.useState(false);
	const disabled = time === "Invalid date, INVALID DATE";
	return (
		<>
			<div
				className={twMerge(
					"fixed top-[9px] px-4 py-2 bg-black rounded-lg text-white w-fit",
					showToolTip ? "" : "hidden",
				)}
			>
				<div className="absolute bottom-0 right-10 translate-y-full -mt-2 w-[14px] h-4 border-b-2 border-l-[6px] border-r-[6px] border-t-[8.5px] border-t-black border-transparent"></div>
				Update disabled due to no hedges.
			</div>
			<div
				className={twMerge(
					"flex items-center justify-between py-1  bg-mine-shaft-1 my-2  text-blackDark",
					showClock ? "px-5" : "px-4",
					className,
				)}
			>
				<div className="text-blackDark font-inter text-sm leading-[22px] flex items-center">
					{showClock && (
						<span className={twMerge("pr-2", clockClasses)}>⏱</span>
					)}
					<SubTitle2>{`Last updated: ${disabled ? "NA" : time}`}</SubTitle2>
				</div>
				<ReuseButton
					onMouseEnter={() => {
						disabled && setShowTooltip(true);
					}}
					onMouseLeave={() => {
						disabled && setShowTooltip(false);
					}}
					className={twMerge(
						!showClock ? "rounded-md" : "rounded-full",
						"border border-mine-shaft-2 ml-4 py-[5px] flex gap-x-[6px]",
						disabled
							? "bg-mine-shaft-1 text-color-black-5 hover:bg-mine-shaft-1 cursor-default"
							: "bg-white text-blackDark hover:bg-white cursor-pointer ",
					)}
					onClick={
						disabled
							? () => {
									setShowTooltip((prev) => !prev);
							  }
							: updateAction
					}
				>
					<RefreshIcon className={disabled ? "grayscale" : ""} />
					<SubTitle3 classes="text-mine-shaft-4">Update</SubTitle3>
				</ReuseButton>
			</div>
		</>
	);
};

export default UpdatePrompt;
