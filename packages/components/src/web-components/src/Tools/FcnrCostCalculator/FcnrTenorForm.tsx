import React from "react";
import {
	BorrowingCostHeader,
	BorrowingCostTextContent,
	BorrowingCostWrapper,
	ContinueButton,
	RadioGroup,
} from "components";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { StoreState } from "store";
import { setfcnrCostCalculatorFrequency } from "store/src/fcnrCostCalculatorSlice";
export interface TenorFormInterface {
	web?: boolean;
}
const FcnrTenorForm: React.FC<TenorFormInterface> = ({ web = false }) => {
	const { fixing_frequency,base_currency } = useSelector((state: StoreState) => {
		return state.fcnrCostCalculatorSlice;
	});
	var title_based_on_currency;
	if(base_currency==="USD"){
		title_based_on_currency="(SOFR)"
	}else{
		title_based_on_currency = "(EURIBOR)";
	}
	const OptionList = [
		{ label: "O/N Overnight", value: "ON" },
		{ label: "1 month", value: "1M" },
		{ label: "3 months", value: "3M" },
		{ label: "6 months", value: "6M" },
		{ label: "12 months", value: "12M" },
	];

	const navigate = useNavigate();
	const dispatch= useDispatch();
	
	const [selectedOption, setSelectedOption] = React.useState(fixing_frequency);

	const handleSelectingOption = (value: string) => {
		setSelectedOption(value);
	};

	const handleContinueClick = () => {
		dispatch(setfcnrCostCalculatorFrequency(selectedOption))
		navigate(
			web === true
				? "/fx-home/fx-tools/fcnr-cost-calculator/details/loan_amt/tenor/int_rate/sofr/spread"
				: "/fx-home/fcnr-cost-calculator/details/loan_amt/tenor/int_rate/sofr/spread",
		);
	};

	const activateButton = () => {
		if (selectedOption !== "") {
			return false;
		}
		return true;
	};

	return (
		<div className="w-full h-full flex flex-col justify-between">
			<div>
				<BorrowingCostHeader label={"FCNR/FCDL cost calculator"} />
				<BorrowingCostWrapper>
					<BorrowingCostTextContent
						title={`Select Fixing frequency ${title_based_on_currency}`}
						description={`Select your preferred fixing frequency for the floating benchmark from options below:`}
					/>
					<RadioGroup
						defaultValue={fixing_frequency}
						options={OptionList}
						optionSelectionCallback={handleSelectingOption}
					/>
				</BorrowingCostWrapper>
			</div>
			<ContinueButton
				web
				continueCallback={handleContinueClick}
				disabled={activateButton()}
			/>
		</div>
	);
};

export default FcnrTenorForm;
