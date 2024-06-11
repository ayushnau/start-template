import React from "react";
import { twMerge } from "tailwind-merge";

export interface TableDateInputInterface {
	prefix?: string;
}

const TableDateInput: React.FC<TableDateInputInterface> = ({
	prefix = "$",
}) => {
	const [value, setValue] = React.useState("");
	return (
		<div key={"input"} className="relative">
			<input
				value={value}
				onChange={(e) => {
					setValue(e.target.value);
				}}
				placeholder="Amount"
				className={twMerge(
					"peer transition-all",
					"w-[130px] h-8 px-3 py-1 rounded-lg border-0 bg-color-black-1 form-input placeholder:text-color-black-5",
					"focus:pl-5 focus:border-0 focus:border-mine-shaft-4 focus:outline-2 focus:outline-mine-shaft-4 focus:ring-2 focus:ring-color-black-1",
				)}
			/>
			<label className="absolute top-1 left-[6px] text-color-black-5 peer-focus:visible invisible">
				{prefix}
			</label>
		</div>
	);
};

export default TableDateInput;
