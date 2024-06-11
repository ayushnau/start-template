import React from "react";
import { twMerge } from "tailwind-merge";

export interface TitleContentIconComponentInterface {
	title: string;
	content?: string;
	icon?: React.ReactNode;
	contentClasses?: string;
}

const TitleContentIconComponent: React.FC<
	TitleContentIconComponentInterface
> = ({ title, content, icon, contentClasses }) => {
	return (
		<div className="flex justify-between py-2">
			<div className="flex flex-col">
				<label className="font-inter text-[20px] font-bold leading-[26px] -tracking-[0.35px] text-mine-shaft-4">
					{title}
				</label>
				{content && (
					<label
						className={twMerge(
							"font-inter leading-[22px] text-mine-shaft-3 text-sm ",
							contentClasses,
						)}
					>
						{content}
					</label>
				)}
			</div>
			{icon && icon}
		</div>
	);
};

export default TitleContentIconComponent;
