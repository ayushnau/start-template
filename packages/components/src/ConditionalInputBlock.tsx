import React from "react";
import { ReuseInputGroup } from "@locoworks/reusejs-react-input-group";
import { getCurrencySymbol } from "services/fx/getCurrencySymbol";

interface ComparisonInputProps {
	label: string;
	symbol: string;
	isActive: boolean;
	pair: string;
	handleRadioChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	handleTextInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	value: string;
	showBorder: boolean;
}

const ComparisonInput: React.FC<ComparisonInputProps> = ({
	label,
	symbol,
	isActive,
	pair,
	value,
	handleRadioChange,
	handleTextInputChange,
	showBorder,
}) => {
	return (
		<div
			className={`flex justify-between ${
				showBorder ? "border-mine-shaft-2 border-b-[1px]" : ""
			}  py-2`}
		>
			<div className="flex flex-row py-2">
				<div className="w-6 h-6 relative">
					<input
						type="radio"
						checked={isActive}
						onChange={handleRadioChange}
						className={`form-radio h-6 w-6 border-2 text-black appearance-none 
            after:contents-[""] after:absolute after:inset-0 after:top-[2px]
             after:rounded-full after:w-6 after:h-6 after:border-[3px]
            before:contents-[""] before:absolute before:inset-0 before:bg-white

            ${isActive ? "after:border-blackDark" : "after:border-mine-shaft-1"}
            `}
					/>
				</div>
				<span className="ml-2">
					{label} ({symbol})
				</span>
			</div>
			{isActive ? (
				<ReuseInputGroup
					className={`${
						value ? "px-7" : ""
					} py-2 bg-gray-200 text-base font-normal font-inter rounded-xl ring-2 ring-inset ring-blackDark focus:ring-2 focus:ring-inset focus:ring-blackDark focus:border-none`}
					name="RadioInput"
					wrapperClasses="w-6/12"
					onChange={handleTextInputChange}
					inputMode="decimal"
					id="textInput"
					placeholder="Enter Value"
					type="text"
					value={value}
					autoFocus
					prefix={
						pair ? (
							<>
								<div className="absolute h-full flex items-center pl-3 text-mine-shaft-3 font-normal">
									{`${pair}`}
								</div>
							</>
						) : null
					}
				/>
			) : null}
		</div>
	);
};

export default ComparisonInput;
