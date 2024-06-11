import React from "react";
import { ReuseButton } from "@locoworks/reusejs-react-button";
import { twMerge } from "tailwind-merge";

export interface PrimaryButtonInterface {
	onClick: (e?: any) => void;
	buttonText: React.ReactNode;
	className?: string;
	disabledClasses?: string;
	disabled?: boolean;
	buttonPrefix?: React.ReactNode;
}

const AuthButton: React.FC<PrimaryButtonInterface> = ({
	className,
	disabled,
	onClick,
	buttonText,
	buttonPrefix,
	disabledClasses,
}) => {
	const defaultClassName =
		"w-full font-inter font-semibold text-base h-12 py-3 px-4 rounded-xl bg-cornflower-blue-2 cursor-pointer";

	const defaultDisabledClasses =
		"bg-mine-shaft-2 text-mine-shaft-3 hover:bg-mine-shaft-2";

	const finalDisabledClasses = twMerge(defaultDisabledClasses, disabledClasses);

	return (
		<ReuseButton
			className={twMerge(
				defaultClassName,
				className,
				disabled ? finalDisabledClasses : "",
			)}
			onClick={(e) => {
				onClick(e);
			}}
			disabled={disabled}
			buttonPrefix={buttonPrefix}
		>
			{buttonText}
		</ReuseButton>
	);
};

export default AuthButton;
