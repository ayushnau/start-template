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
import { StoreState, setBorrowingCostComparisonFixing } from "store";

const FixingFrequencyForm: React.FC = () => {
	const { trade_type, base_currency, fixing } = useSelector(
		(state: StoreState) => state.borrowingCostComparisonSlice,
	);
	const dispatch = useDispatch();

	const OptionListExport = [
		{ label: "Overnight (O/N)", value: "ON" },
		{ label: "1 month", value: "1M" },
		{ label: "3 months", value: "3M" },
		{ label: "6 months", value: "6M" },
	];
	const OptionListImport = [
		{ label: "Overnight (O/N)", value: "ON" },
		{ label: "1 month", value: "1M" },
		{ label: "3 months", value: "3M" },
		{ label: "6 months", value: "6M" },
		{ label: "12 months", value: "12M" },
	];

	const navigate = useNavigate();

	const [selectedOption, setSelectedOption] = React.useState("");

	const handleSelectingOption = (value: string) => {
		setSelectedOption(value);
	};

	const handleContinueClick = () => {
		dispatch(setBorrowingCostComparisonFixing(selectedOption));
		navigate(-1);
	};

	const activateButton = () => {
		if (selectedOption !== "") {
			return !true;
		}
		return !false;
	};

	return (
		<div className="w-full h-full flex flex-col justify-between">
			<div>
				<BorrowingCostHeader
					label="Export Borrowing"
					subLabel={`${base_currency} vs INR`}
				/>
				<BorrowingCostWrapper>
					<BorrowingCostTextContent
						title={`Select fixing frequency (${
							base_currency === "USD" ? "SOFR" : "EURIBOR"
						})`}
						description={`Select your preferred fixing frequency for the ${base_currency} floating benchmark ${
							base_currency === "USD" ? "SOFR" : "EURIBOR"
						} from options below:`}
					/>
					<RadioGroup
						defaultValue={fixing}
						options={
							trade_type === "export" ? OptionListExport : OptionListImport
						}
						optionSelectionCallback={handleSelectingOption}
					/>
				</BorrowingCostWrapper>
			</div>
			<ContinueButton
				web
				continueCallback={() => {
					handleContinueClick();
				}}
				disabled={activateButton()}
			/>
		</div>
	);
};

export default FixingFrequencyForm;
