import React from "react";
import {
	BorrowingCostHeader,
	BorrowingCostTextContent,
	BorrowingCostWrapper,
	ContinueButton,
	RadioGroup,
} from "components";
import { useSelector, useDispatch } from "react-redux";
import {
	StoreState,
	clearBorrowingCostComparisonAll,
	setBorrowingCostComparisonTradeType,
} from "store";
import { useNavigate } from "react-router-dom";

export interface BorrowingCostComparisonInterface {}

const BorrowingCostComparison: React.FC<
	BorrowingCostComparisonInterface
> = ({}) => {
	const OptionList = [
		{ label: "Import/ Term financing", value: "import" },
		{ label: "Export", value: "export" },
	];
	const { trade_type } = useSelector(
		(state: StoreState) => state.borrowingCostComparisonSlice,
	);

	const dispatch = useDispatch();

	const navigate = useNavigate();

	const [selectedOption, setSelectedOption] = React.useState(
		trade_type ? trade_type : "",
	);

	const handleSelectingOption = (value: string) => {
		setSelectedOption(value);
	};

	const handleContinueClick = (nav: string) => {
		dispatch(setBorrowingCostComparisonTradeType(selectedOption));
		navigate(`/fx-home/borrowing-cost-comparison/export`);
	};

	return (
		<div className="md:mx-auto w-full md:w-1/3">
			<BorrowingCostHeader
				label="Borrowing Cost Comparison"
				navigateBackCallback={() => {
					dispatch(clearBorrowingCostComparisonAll());
					navigate("/fx-home");
				}}
			/>
			<BorrowingCostWrapper>
				<BorrowingCostTextContent
					title="What are you borrowing for"
					description="Please specify the type of trade for which you intend to secure a loan"
				/>
				<RadioGroup
					defaultValue={trade_type}
					options={OptionList}
					optionSelectionCallback={handleSelectingOption}
				/>
			</BorrowingCostWrapper>
			<ContinueButton
				continueCallback={() => {
					handleContinueClick(selectedOption);
				}}
				disabled={selectedOption === ""}
			/>
		</div>
	);
};

export default BorrowingCostComparison;
