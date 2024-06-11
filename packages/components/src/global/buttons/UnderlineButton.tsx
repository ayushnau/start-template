import React from "react";
import { ReuseButton } from "@locoworks/reusejs-react-button";
import { twMerge } from "tailwind-merge";

interface ButtonProps {
	onClick: () => void;
	buttonText: React.ReactNode;
	className?: string;
}
const UnderlineButton: React.FC<ButtonProps> = ({
	onClick,
	buttonText,
	className,
}) => {
	const defaultClassName =
		"w-full font-inter font-semibold text-base h-12 py-3 px-4 bg-transparent text-blackDark hover:bg-transparent underline";
	return (
		<ReuseButton
			className={twMerge(defaultClassName, className)}
			onClick={() => {
				onClick();
			}}
		>
			{buttonText}
		</ReuseButton>
	);
};

export default UnderlineButton;
