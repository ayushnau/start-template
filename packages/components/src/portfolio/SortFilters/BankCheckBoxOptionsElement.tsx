import React from "react";
import { twMerge } from "tailwind-merge";
import { SubTitle2 } from "../../../src/Typography";

export interface BankCheckBoxOptionProps {
	index: number;
	multiple: boolean;
	option: {
		[key: string]: string;
	};
	selected: boolean;
	callback?: (option?: { [key: string]: string }) => void;
	handleCheckboxChange?: (bankName?: string) => void;
	isChecked?: (bankName?: string) => boolean;
}

const BankCheckBoxOptionElement: React.FC<BankCheckBoxOptionProps> = ({
	index,
	multiple,
	option,
	selected,
	callback,
	handleCheckboxChange,
	isChecked,
}) => {
	return (
		<div
			className={twMerge(
				"py-2 flex justify-between w-full",
				selected ? "" : "border-b border-dotted border-slate-300",
			)}
			key={option?.uuid + option?.bank_name}
			onClick={() => {
				callback && callback(option);
			}}
		>
			<div>
				<input
					type="checkbox"
					checked={isChecked && isChecked(option.bank_name)}
					onChange={() =>
						handleCheckboxChange && handleCheckboxChange(option.bank_name)
					}
					className="form-checkbox h-5 w-5 text-[#212121] rounded mr-4"
				/>
				<SubTitle2>{option.bank_name}</SubTitle2>
			</div>
		</div>
	);
};

export const MemoizedBankCheckBoxOptionsElement = React.memo(
	BankCheckBoxOptionElement,
);
