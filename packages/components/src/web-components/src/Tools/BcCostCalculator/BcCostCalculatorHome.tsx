import React, { useState } from "react";
import {
	BorrowingCostTextContent,
	BorrowingCostWrapper,
	ContinueButton,
	Header,
	RadioGroup,
} from "components";
import { useNavigate } from "react-router-dom";
import { StoreState } from "store";
import { useDispatch, useSelector } from "react-redux";
import {
	setbcCostCalculatorBaseCurrency,
	clearbcCostCalculatorAll,
} from "store/src/bcCostCalculatorSlice";

export interface BcCostCalculatorHomeInterface {
	web?: boolean;
}

const OptionList = [
	{ currency: "USD", label: "USD", value: "USD" },
	{ currency: "EUR", label: "EUR", value: "EUR" },
];

const BcCostCalculatorHome: React.FC<BcCostCalculatorHomeInterface> = ({
	web = false,
}) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { base_currency } = useSelector((state: StoreState) => {
		return state.bcCostCalculatorSlice;
	});


	const [selectedOption, setSelectedOption] = useState(base_currency); 

	const handleSelectingOption = (value: string) => {
		setSelectedOption(value);
	};

	const handleBackAction = () => {
		dispatch(clearbcCostCalculatorAll());
		navigate(web === true ? "/fx-home/fx-tools" : "/fx-home");
	};

	const handleContinueClick = () => {
		dispatch(setbcCostCalculatorBaseCurrency(selectedOption));
		navigate(
			web === true
				? "/fx-home/fx-tools/bc-sc-calculator/details"
				: "/fx-home/bc-sc-calculator/details",
		);
	};

	return (
		<div className="flex flex-col item-center h-full">
			<Header
				className="h-14 flex items-center p-4 gap-x-4 border-b border-mine-shaft-2"
				displayTitle={"BC/SC/LAI cost calculator"}
				displayTitleStyles="font-inter leading-6 font-bold text-base text-mine-shaft-4"
				showEditIcon={false}
				backAction={handleBackAction}
			/>
			<div className="w-full h-full flex flex-col justify-between">
				<BorrowingCostWrapper>
					<BorrowingCostTextContent
						title="Select currency"
						description="Please specify the currency of your ongoing or your past loan:"
					/>
					<RadioGroup
						defaultValue={base_currency}
						options={OptionList}
						optionSelectionCallback={handleSelectingOption}
					/>
				</BorrowingCostWrapper>
			</div>
			<ContinueButton
				web
				continueCallback={handleContinueClick}
				disabled={selectedOption === ""}
			/>
		</div>
	);
};

export default BcCostCalculatorHome;
