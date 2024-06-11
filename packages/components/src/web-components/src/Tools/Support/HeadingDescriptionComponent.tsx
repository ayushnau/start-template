import React from "react";
import { twMerge } from "tailwind-merge";

interface HeadingDescriptionComponentProps {
	heading: string;
	description: string;
	wrapperClasses?: string;
	headerClasses?: string;
	descriptionClasses?: string;
}
const HeadingDescriptionComponent: React.FC<
	HeadingDescriptionComponentProps
> = ({
	heading,
	description,
	wrapperClasses,
	headerClasses,
	descriptionClasses,
}) => {
	return (
		<div className={twMerge("py-2 flex flex-col gap-y-1", wrapperClasses)}>
			<p
				className={twMerge(
					"font-inter text-xl font-bold leading-[26px] -tracking-[0.35px]",
					headerClasses,
				)}
			>
				{heading}
			</p>
			<p
				className={twMerge(
					"text-color-black-5 font-inter text-sm font-normal leading-[21px]",
					descriptionClasses,
				)}
			>
				{description}
			</p>
		</div>
	);
};

export default HeadingDescriptionComponent;
