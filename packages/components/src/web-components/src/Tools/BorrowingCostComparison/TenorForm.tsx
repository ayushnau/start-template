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
import { StoreState, setBorrowingCostComparisonTenor } from "store";

const TenorForm: React.FC = () => {
	const { trade_type, base_currency, tenor } = useSelector(
		(state: StoreState) => state.borrowingCostComparisonSlice,
	);

	const dispatch = useDispatch();

	const OptionListExport = [
		{ label: "1 month", value: "1M" },
		{ label: "2 months", value: "2M" },
		{ label: "3 months", value: "3M" },
		{ label: "4 months", value: "4M" },
		{ label: "5 months", value: "5M" },
		{ label: "6 months", value: "6M" },
	];
	const OptionListImport = [
		{ label: "1 month", value: "1M" },
		{ label: "2 months", value: "2M" },
		{ label: "3 months", value: "3M" },
		{ label: "4 months", value: "4M" },
		{ label: "5 months", value: "5M" },
		{ label: "6 months", value: "6M" },
		{ label: "12 months", value: "12M" },
		{ label: "3 years", value: "3Y" },
		{ label: "5 years", value: "5Y" },
	];

	const navigate = useNavigate();

	const [selectedOption, setSelectedOption] = React.useState("");

	const handleSelectingOption = (value: string) => {
		setSelectedOption(value);
	};

	const handleContinueClick = () => {
		dispatch(setBorrowingCostComparisonTenor(selectedOption));
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
					label={
						trade_type === "export"
							? "Export Borrowing"
							: "Import/ Term financing"
					}
					subLabel={`${base_currency} vs INR`}
				/>
				<BorrowingCostWrapper>
					<BorrowingCostTextContent
						title={`Select Tenor`}
						description={`Select your tenor from the options below:`}
					/>
					<RadioGroup
						defaultValue={tenor}
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

export default TenorForm;
