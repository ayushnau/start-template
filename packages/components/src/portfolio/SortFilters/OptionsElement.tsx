import React from "react";
import { CheckIcon } from "icons";

export interface SelectedOptionProps {
	index: any;
	filteredOptions: any;
	addOrRemove: any;
	multiple: boolean;
	option: any;
	selected: boolean;
	callback?: any;
}

const OptionsElement: React.FC<SelectedOptionProps> = ({
	index,
	filteredOptions,
	addOrRemove,
	multiple,
	option,
	selected,
	callback,
}) => {
	return (
		<div
			className={
				"py-2 flex justify-between w-full " +
				(index === filteredOptions.length - 1
					? ""
					: "border-b border-slate-300")
			}
			key={option?.value + option?.label}
			onClick={() => {
				// console.log("OPTION IN OPTION TAB>>>", option);
				addOrRemove(multiple, option);
				callback && callback(option);
			}}
		>
			<div className="font-inter text-sm leading-[22px]">
				<label>{option.label.main}</label>
				{option.label.sub && (
					<label className="font-bold">{option.label.sub}</label>
				)}
			</div>
			{selected && <CheckIcon />}
		</div>
	);
};

export const MemoizedOptionsElement = React.memo(OptionsElement);
