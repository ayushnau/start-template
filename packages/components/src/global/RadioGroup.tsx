import React from "react";
import { RadioCheckIcon } from "icons";
import CurrencyFlag from "./CurrencyFlag";

interface OptionElementInterface {
	currency?: string;
	label: string;
	value: string;
}

export interface RadioGroupInterface {
	options: OptionElementInterface[];
	optionSelectionCallback?: (value: string) => void;
	optionWrapper?: string;
	defaultValue?: string;
}

const RadioGroup: React.FC<RadioGroupInterface> = ({
	options,
	optionSelectionCallback,
	optionWrapper,
	defaultValue,
}) => {
	const [selectedOption, setSelectedOption] = React.useState(
		defaultValue ? defaultValue : "",
	);

	return (
		<div id="options-list" className={optionWrapper ? optionWrapper : ""}>
			{options.map((option: OptionElementInterface, index: number) => {
				return (
					<React.Fragment key={index + option.value}>
						<div
							id={"radio-element" + index}
							className="flex justify-between items-center py-4 gap-x-4 "
						>
							{option.currency && <CurrencyFlag currency={option.currency} />}
							<label className="font-inter leading-6 text-mine-shaft-4 flex-1">
								{option.label}
							</label>
							{selectedOption === option.value ? (
								<RadioCheckIcon />
							) : (
								<input
									type="radio"
									name="form"
									value={option.value}
									onClick={(
										e: React.MouseEvent<HTMLInputElement, MouseEvent>,
									) => {
										setSelectedOption(
											(e.target as unknown as HTMLInputElement).value,
										);
										optionSelectionCallback &&
											optionSelectionCallback(
												(e.target as unknown as HTMLInputElement).value,
											);
									}}
									className="border-[3px] border-mine-shaft-2 w-6 h-6"
								/>
							)}
						</div>
						{index < options.length - 1 ? (
							<div className="border-b border-dotted border-mine-shaft-2" />
						) : null}
					</React.Fragment>
				);
			})}
		</div>
	);
};

export default RadioGroup;
