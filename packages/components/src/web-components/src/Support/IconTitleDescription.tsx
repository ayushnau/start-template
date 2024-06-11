import React from "react";
import { twMerge } from "tailwind-merge";

export interface IconTitleDescriptionInterface {
	icon: string;
	color: string;
	title: string;
	description: string;
}

const IconTitleDescription: React.FC<IconTitleDescriptionInterface> = ({
	icon,
	color,
	title,
	description,
}) => {
	return (
		<div className="flex gap-x-5">
			<div
				className={twMerge(
					"shrink-0 flex items-center justify-center h-12 w-12 text-2xl rounded-full",
					color,
				)}
			>
				{icon}
			</div>
			<div className="flex flex-col gap-y-1">
				<label className="font-inter text-xl font-bold leading-[26px] -tracking-[0.35px]">
					{title}
				</label>
				<label className="font-inter text-sm leading-[22px] text-color-black-6">
					{description}
				</label>
			</div>
		</div>
	);
};

export default IconTitleDescription;
