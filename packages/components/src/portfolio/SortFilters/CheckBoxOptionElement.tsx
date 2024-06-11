import React from "react";
import { twMerge } from "tailwind-merge";

export interface CheckBoxOptionProps {
	index: any;
	addOrRemove: any;
	multiple: boolean;
	option: any;
	selected: boolean;
	callback?: any;
}

const CheckBoxOptionElement: React.FC<CheckBoxOptionProps> = ({
	index,
	addOrRemove,
	multiple,
	option,
	selected,
	callback,
}) => {
	const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		event.stopPropagation();
		addOrRemove(multiple, option);
		callback && callback(option);
	};

	return (
		<div
			className={twMerge(
				"py-2 flex justify-between w-full",
				selected ? "" : "border-b border-dotted border-slate-300",
			)}
			key={option?.uuid + option?.label}
			onClick={() => {
				addOrRemove(multiple, option);
				callback && callback(option);
			}}
		>
			<div className="font-inter text-sm leading-[22px]">
				<input
					type="checkbox"
					checked={selected}
					onChange={handleCheckboxChange}
					className="form-checkbox h-5 w-5 text-[#212121] rounded mr-4"
				/>
				<label>{option.label}</label>
			</div>
		</div>
	);
};

export const MemoizedCheckBoxOptionsElement = React.memo(CheckBoxOptionElement);
