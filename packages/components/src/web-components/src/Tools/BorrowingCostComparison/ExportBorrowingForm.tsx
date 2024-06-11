import React from "react";
import {
	BorrowingCostHeader,
	BorrowingCostTextContent,
	BorrowingCostWrapper,
	ContinueButton,
	VSDivider,
	RadioGroup,
	NativeCurrencyFieldDisabled,
} from "components";
import { useDispatch, useSelector } from "react-redux";
import { StoreState, setBorrowingCostComparisonBaseCurrency } from "store";
import { useNavigate } from "react-router-dom";

export interface ExportBorrowingFormInterface {}

const ExportBorrowingForm: React.FC<ExportBorrowingFormInterface> = ({}) => {
	const { trade_type, base_currency } = useSelector(
		(state: StoreState) => state.borrowingCostComparisonSlice,
	);

	const OptionList = [
		{ currency: "USD", label: "USD", value: "USD" },
		{ currency: "EUR", label: "EUR", value: "EUR" },
	];
	const dispatch = useDispatch();

	const navigate = useNavigate();

	const [selectedOption, setSelectedOption] = React.useState(base_currency);

	const handleSelectingOption = (value: string) => {
		setSelectedOption(value);
	};

	const handleContinueClick = () => {
		dispatch(setBorrowingCostComparisonBaseCurrency(selectedOption));
		navigate("/fx-home/fx-tools/borrowing-cost-comparison/details");
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
					navigateBackCallback={() => {
						navigate("/fx-home/fx-tools/borrowing-cost-comparison");
					}}
				/>
				<BorrowingCostWrapper>
					<BorrowingCostTextContent
						title="Select currency"
						description="Please select the currency with which you intend to compare borrowing costs against INR for obtaining a loan"
					/>
					<RadioGroup
						defaultValue={base_currency}
						options={OptionList}
						optionSelectionCallback={handleSelectingOption}
					/>
					<VSDivider />
					<NativeCurrencyFieldDisabled />
				</BorrowingCostWrapper>
			</div>
			<ContinueButton
				web
				continueCallback={() => {
					handleContinueClick();
				}}
				disabled={selectedOption === ""}
			/>
		</div>
	);
};

export default ExportBorrowingForm;
