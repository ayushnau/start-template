import React from "react";
import { twMerge } from "tailwind-merge";

interface IconDescriptionProps {
	className?: string;
	heading: any;
	headingClassName?: string;
	description: any;
	descriptionClassName?: string;
	icon: React.ReactNode | React.ReactNode[];
	handleClick?: Function;
}

const IconDescription: React.FC<IconDescriptionProps> = ({
	className = "",
	heading = "",
	headingClassName = "",
	description = "",
	descriptionClassName = "",
	icon,
	handleClick = () => {},
}) => {
	return (
		<div
			onClick={() => handleClick()}
			className={twMerge(
				"flex py-3 gap-x-4 transition-all duration-300 ease-in-out",
				className,
			)}
		>
			<div>{icon}</div>
			<div className="flex-1">
				<div
					className={twMerge(
						"text-base font-bold -tracking-[0.3px] leading-6 text-mine-shaft-4",
						headingClassName,
					)}
				>
					{heading}
				</div>
				<div
					className={twMerge(
						"text-base font-normal leading-6 text-color-black-6 ",
						descriptionClassName,
					)}
				>
					{description}
				</div>
			</div>
		</div>
	);
};

export default IconDescription;
