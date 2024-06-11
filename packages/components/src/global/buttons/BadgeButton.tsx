import React from "react";
import { ReuseButton } from "@locoworks/reusejs-react-button";
import { twMerge } from "tailwind-merge";

type StateType = "active" | "inactive" | "selected";

export interface BadgeButtonProps {
	iconPrefix?: JSX.Element;
	iconSuffix?: JSX.Element;
	label?: React.ReactNode;
	state?: StateType;
	onClick?: () => void;
	buttonClasses?: string;
	disabled?: boolean;
}

const STATECLASSES = {
	inactive: "hover:bg-white bg-white",
	active: "hover:bg-mine-shaft-1 bg-mine-shaft-1",
	selected:
		"hover:bg-mine-shaft-2 bg-mine-shaft-2 outline outline-black outline-2",
	disabled: "text-color-black-5  bg-mine-shaft-1 hover:bg-mine-shaft-1",
};

const BadgeButton: React.FC<BadgeButtonProps> = ({
	iconPrefix,
	iconSuffix,
	label,
	state = "inactive",
	onClick,
	buttonClasses,
	disabled,
}) => {
	return (
		<ReuseButton
			className={twMerge(
				"flex gap-x-[6px] px-3 py-[5px] outline focus:outline outline-mine-shaft-2 outline-1 text-mine-shaft-4 font-inter text-sm leading-[22px] items-center rounded-full rounded-[9999px]",
				STATECLASSES[state],
				buttonClasses,
				disabled ? STATECLASSES["disabled"] : "",
			)}
			onClick={() => {
				if (!disabled) {
					onClick && onClick();
				}
			}}
			style={{
				borderRadius: "9999px",
			}}
		>
			{iconPrefix && iconPrefix} {label && label}
			{iconSuffix && iconSuffix}
		</ReuseButton>
	);
};

export default BadgeButton;
