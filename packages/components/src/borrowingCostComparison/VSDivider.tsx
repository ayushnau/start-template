import React from "react";
import { twMerge } from "tailwind-merge";

export interface VSDividerInterface {
	showVS?: boolean;
	wrapperClasses?: string;
	text?: string;
}

const VSDivider: React.FC<VSDividerInterface> = ({
	showVS = true,
	wrapperClasses = "",
	text = "vs",
}) => {
	return (
		<div
			className={twMerge(
				"flex w-full justify-center items-center gap-x-2 py-4",
				wrapperClasses,
			)}
		>
			<div className="h-[1px] w-full bg-mine-shaft-2" />
			{showVS && (
				<label className="font-inter text-sm leading-[22px]">{text}</label>
			)}
			{showVS && <div className="h-[1px] w-full bg-mine-shaft-2" />}
		</div>
	);
};

export default VSDivider;
