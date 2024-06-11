import React from "react";
import { ReuseInputGroup } from "@locoworks/reusejs-react-input-group";
import { getCurrencySymbol } from "services/fx/getCurrencySymbol";
import { twMerge } from "tailwind-merge";

export interface AmountFieldInterface {
	selectedMonth: any;
	currency: string;
	validateFields: any;
}

const AmountField: React.FC<AmountFieldInterface> = ({
	selectedMonth,
	currency,
	validateFields,
}) => {
	const [value, setValue] = React.useState(selectedMonth?.amount);
	const [showCurrency, setShowCurrency] = React.useState(
		selectedMonth?.amount ? true : false,
	);

	React.useEffect(() => {
		validateFields();
	}, [value]);

	const Prefix = () => {
		return (
			<div className="absolute h-full flex items-center pl-4 z-50">
				<label className="font-inter leading-6 text-color-black-6">
					{selectedMonth.date}
				</label>
				<div className="pl-3 border-r border-[#D9D9D9] h-1/3" />
				<label className={twMerge(showCurrency ? "" : "hidden", "pl-2")}>
					{getCurrencySymbol(currency)}
				</label>
			</div>
		);
	};

	return (
		<ReuseInputGroup
			className={twMerge(
				"relative px-4 pl-[95px] py-3 h-14 bg-gray-100 text-base font-normal font-inter rounded-xl border-0 focus:ring-2 focus:ring-inset focus:ring-blackDark",
				showCurrency ? "pl-[110px]" : "",
			)}
			wrapperClasses="w-full"
			onFocus={() => {
				setShowCurrency(true);
			}}
			onBlur={() => {
				if (value === "") {
					setShowCurrency(false);
				}
			}}
			type="number"
			id="amount"
			placeholder="Enter Amount"
			maxLength={10}
			onChange={(e: any) => {
				const inputValue = e.target.value;

				selectedMonth.amount = inputValue;
				setValue(inputValue);
				// const numericValue = inputValue.replace(/\D/g, ""); // Remove non-numeric characters
				// addressForm.setField("mobile_number", numericValue);
			}}
			value={value}
			prefix={<Prefix />}
		/>
	);
};

export default AmountField;
