import React from "react";
import { Check } from "icons";
import { twMerge } from "tailwind-merge";

interface CheckedDescriptionProps {
	className?: string;
	description: React.ReactNode;
	descriptionClassName?: string;
	color?: string;
}
const CheckedDescription: React.FC<CheckedDescriptionProps> = ({
	className = "",
	description,
	descriptionClassName = "",
	color,
}) => {
	return (
		<div className={twMerge("flex items-center gap-x-4", className)}>
			<div>
				<Check color={color} />
			</div>
			<div
				className={twMerge(
					"text-base font-normal leading-6 text-color-black-6",
					descriptionClassName,
				)}
			>
				{description}
			</div>
		</div>
	);
};

export default CheckedDescription;
