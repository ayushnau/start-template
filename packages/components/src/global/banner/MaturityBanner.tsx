import React from "react";
import { WarningAmber } from "icons";
import { CheckIcon } from "icons";
import { twMerge } from "tailwind-merge";

export interface PropList {
	className?: string;
	label?: string;
	prefix?: React.ReactElement;
	prefixColor?: string;
}

export default (props: PropList) => {
	return (
		<div
			className={twMerge(
				` w-full flex justify-between items-center bg-textColorGray text-white px-4 py-[9px]`,
				props.className,
			)}
		>
			<div className="flex items-center font-inter text-sm font-normal leading-[22px] gap-x-2">
				{props.prefix ? props.prefix : <CheckIcon color={props.prefixColor} />}
				<label className={`${props.className ? props.className : ""}`}>
					{props.label}
				</label>
			</div>
		</div>
	);
};
