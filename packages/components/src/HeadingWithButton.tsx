import React, { FC } from "react";
import { ReuseButton } from "@locoworks/reusejs-react-button";
interface HeadingWithButtonProps {
	heading: string;
	buttonText: string;
	HeadingClassName?: string;
	onButtonClick?: () => void;
	wrapperClassname?: string;
}
import { twMerge } from "tailwind-merge";

const HeadingWithButton: FC<HeadingWithButtonProps> = (props) => {
	return (
		<div
			className={twMerge(
				"flex flex-row items-center justify-between pt-5",
				props.wrapperClassname,
			)}
		>
			<div
				className={`${
					props.HeadingClassName
						? props.HeadingClassName
						: "font-bold tracking--0.35 leading-[26px] font-inter text-[20px] text-blackDark"
				}`}
			>
				{props.heading}
			</div>
			{props.onButtonClick ? (
				<ReuseButton
					className="rounded-lg p-3 font-semibold text-sm	cursor-pointer h-8"
					onClick={props.onButtonClick}
				>
					{props.buttonText}
				</ReuseButton>
			) : null}
		</div>
	);
};

export default HeadingWithButton;
