import React from "react";
import { twMerge } from "tailwind-merge";

interface HeadingDescriptionCompProps {
	className?: string;
	heading?: string;
	description?: string;
	children?: React.ReactNode | React.ReactNode[];
	headingClassName?: string;
	descriptionClassName?: string;
	childrenClassName?: string;
}
const HeadingDescriptionComp: React.FC<HeadingDescriptionCompProps> = ({
	className = "",
	heading = "",
	description = "",
	children,
	headingClassName = "",
	descriptionClassName = "",
	childrenClassName = "",
}) => {
	return (
		<div className={twMerge("flex flex-col", className)}>
			<div
				className={twMerge(
					"text-5xl font-bold leading-normal -tracking-[1.5px] text-mine-shaft-4 mb-2",
					headingClassName,
				)}
			>
				{heading}
			</div>
			<div
				className={twMerge(
					"text-5 leading-8 -tracking-[0.35px] font-medium text-color-black-5",
					descriptionClassName,
				)}
			>
				{description}
			</div>
			<div className={twMerge("mt-6", childrenClassName)}>{children}</div>
		</div>
	);
};

export default HeadingDescriptionComp;
