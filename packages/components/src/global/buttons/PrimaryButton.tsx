import React from "react";
import { ReuseButton } from "@locoworks/reusejs-react-button";
import { twMerge } from "tailwind-merge";

interface ButtonProps {
	onClick: (e?: any) => void;
	buttonText: React.ReactNode;
	className?: string;
	disabled?: boolean;
	buttonPrefix?: React.ReactNode;
	buttonSuffix?: React.ReactNode;
	onMouseLeave?: (e: any) => void;
	isLoading?: boolean;
}
const PrimaryButton: React.FC<ButtonProps> = ({
	onClick,
	buttonText,
	className,
	disabled,
	buttonPrefix,
	buttonSuffix,
	onMouseLeave,
	isLoading = false,
}) => {
	const defaultClassName =
		"w-full font-inter font-semibold text-base h-12 py-3 px-4 rounded-xl bg-cornflower-blue-2 cursor-pointer";

	const disabledClasses =
		"bg-mine-shaft-2 text-mine-shaft-3 hover:bg-mine-shaft-2";

	return (
		<ReuseButton
			className={twMerge(
				defaultClassName,
				className,
				disabled ? disabledClasses : "",
			)}
			onClick={(e) => {
				onClick(e);
			}}
			disabled={disabled}
			buttonPrefix={buttonPrefix}
			buttonSuffix={buttonSuffix}
			onMouseLeave={onMouseLeave}
		>
			{isLoading ? (
				<div className="flex h-8 w-8 justify-center items-center rounded-full border-4 border-white border-t-gray-600 opacity-100 animate-spin text-[40px] text-blue-900" />
			) : (
				buttonText
			)}
		</ReuseButton>
	);
};

export default PrimaryButton;
