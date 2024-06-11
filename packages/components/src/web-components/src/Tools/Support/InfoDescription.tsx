import React from "react";
import { IIcon } from "icons";
import { twMerge } from "tailwind-merge";

export interface InfoDescriptionInterface {
	children: string | string[];
	paraClasses?: string;
	wrapperClasses?: string;
	iconClasses?: string;
	color?: string;
}

export const InfoDescription: React.FC<InfoDescriptionInterface> = ({
	children,
	paraClasses = "",
	wrapperClasses = "",
	iconClasses = "",
	color = "#646464",
}) => {
	return (
		<div className={twMerge("flex gap-x-2", wrapperClasses)}>
			<IIcon
				svgStyles={twMerge("w-4 h-4 mt-1 shrink-0", iconClasses)}
				color={color}
			/>
			<p
				className={twMerge(
					"font-inter text-sm text-color-black-5 leading-[22px]",
					paraClasses,
				)}
			>
				{children}
			</p>
		</div>
	);
};
