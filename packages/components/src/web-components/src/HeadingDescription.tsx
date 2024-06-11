import React from "react";
import { twMerge } from "tailwind-merge";

interface HeadingDescriptionProps {
	heading: string;
	description: string;
	success?: boolean;
	wrapperClasses?: string;
	headerClasses?: string;
	descriptionClasses?: string;
	icon?: React.ReactNode;
}
const HeadingDescription: React.FC<HeadingDescriptionProps> = ({
	heading,
	description,
	success,
	wrapperClasses,
	headerClasses,
	descriptionClasses,
	icon,
}) => {
	return (
		<div className={wrapperClasses}>
			<p
				className={twMerge("text-sm font-normal leading-[22px]", headerClasses)}
			>
				{heading}
				{icon && <span className="ml-2">{icon}</span>}
			</p>
			<p
				className={twMerge(
					"text-xl font-bold leading-[26px] -tracking-[0.35px]",
					success !== undefined
						? success
							? "text-mountain-meadow-2"
							: "text-sunset-orange-2"
						: "",
					descriptionClasses,
				)}
			>
				{description}
			</p>
		</div>
	);
};

export default HeadingDescription;
