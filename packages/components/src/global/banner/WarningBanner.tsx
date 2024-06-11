import React from "react";
import { WarningAmber } from "icons";

export interface PropList {
	className?: string;
	label?: string;
	amount?: string;
	prefix?: React.ReactElement;
}

export default (props: PropList) => {
	return (
		<div
			className={`sticky top-0 z-10 w-full flex justify-between items-center bg-spanish-yellow-1 text-spanish-yellow-3 px-4 py-[6px] text-sm font-inter font-normal leading-[22px]" ${props.className}`}
		>
			<div className="flex gap-x-2 items-center">
				{props.prefix ? props.prefix : <WarningAmber color="#B17D05" />}
				<label className={`${props.className ? props.className : ""}`}>
					{props.label}
				</label>
			</div>
			<label className={`${props.className ? props.className : ""}`}>
				{props.amount}
			</label>
		</div>
	);
};
