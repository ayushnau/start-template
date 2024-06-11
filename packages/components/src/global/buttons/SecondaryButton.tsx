import React from "react";
import { ReuseButton } from "@locoworks/reusejs-react-button";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	onClick: any;
	buttonText: React.ReactNode;
	className?: string;
	prefixIcon?: React.ReactNode | React.ReactNode[];
	suffixIcon?: React.ReactNode | React.ReactNode[];
	style?: any;
	onMouseEnter?: any;
	onMouseLeave?: any;
	disabled?: boolean;
}
const SecondaryButton: React.FC<ButtonProps> = ({
	onClick,
	buttonText,
	className,
	prefixIcon,
	suffixIcon,
	style,
	onMouseEnter,
	onMouseLeave,
	disabled = false,
	...rest
}) => {
	const defaultClassName =
		"w-full font-inter font-semibold text-base h-12 px-4 rounded-xl bg-white hover:bg-white text-black border border-solid border-blackDark leading-[22px] hover:bg-[#F5F5F5] hover:outline-1 hover:outline";
	const defaultDisabledClassNames =
		"w-full font-inter font-semibold text-base h-12 px-4 rounded-xl hover:bg-white bg-white text-mine-shaft-3 border border-solid border-mine-shaft-2 leading-[22px]";

	return (
		<ReuseButton
			className={twMerge(
				disabled ? defaultDisabledClassNames : defaultClassName,
				className,
			)}
			onClick={(e: any) => {
				onClick(e);
			}}
			style={style}
			onMouseEnter={onMouseEnter && onMouseEnter}
			onMouseLeave={onMouseLeave && onMouseLeave}
			disabled={disabled}
			{...rest}
		>
			{prefixIcon && prefixIcon}
			{buttonText}
			{suffixIcon && suffixIcon}
		</ReuseButton>
	);
};

export default SecondaryButton;
