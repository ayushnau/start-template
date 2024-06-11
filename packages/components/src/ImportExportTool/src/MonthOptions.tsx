import React from "react";
import { twMerge } from "tailwind-merge";

export interface MonthOptionsInterface {
	month: string;
	year: string;
	callback?: (month: string, state?: boolean) => void;
	isSelected?: boolean;
}

const MonthOptions: React.FC<MonthOptionsInterface> = ({
	month,
	year,
	callback,
	isSelected,
}) => {
	return (
		<div
			className={twMerge(
				"px-6 py-4 flex flex-col gap-y-1 items-center justify-center w-full h-[78px] rounded-xl border border-[#D3D3D3]",
				isSelected ? "border-2 border-black bg-mine-shaft-1" : "",
			)}
			onClick={() => {
				callback && callback(month, !isSelected);
			}}
		>
			<label className="font-inter leading-6">{month}</label>
			<label className="font-inter text-color-black-5 text-xs leading-[18px]">
				{year}
			</label>
		</div>
	);
};

export default MonthOptions;
