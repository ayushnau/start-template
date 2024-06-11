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
import { StoreState, setBorrowingCostComparisonRepayment } from "store";

const RepaymentFormScreen: React.FC = () => {
	const { base_currency, repayment } = useSelector(
		(state: StoreState) => state.borrowingCostComparisonSlice,
	);

	const dispatch = useDispatch();

	const OptionListImport = [
		{ label: "Monthly", value: "monthly" },
		{ label: "Quaterly", value: "quaterly" },
		{ label: "Semi-annual", value: "semiannual" },
		{ label: "Bullet (At maturity)", value: "bullet" },
	];

	const navigate = useNavigate();

	const [selectedOption, setSelectedOption] = React.useState(
		repayment ? repayment : "",
	);

	const handleSelectingOption = (value: string) => {
		setSelectedOption(value);
	};

	const handleContinueClick = () => {
		dispatch(setBorrowingCostComparisonRepayment(selectedOption));
		navigate(-1);
	};

	const activateButton = () => {
		if (selectedOption !== "") {
			return !true;
		}
		return !false;
	};

	return (
		<div className="md:mx-auto w-full md:w-1/3">
			<BorrowingCostHeader
				label={"Import/ Term financing"}
				subLabel={`${base_currency} vs INR`}
			/>
			<BorrowingCostWrapper>
				<BorrowingCostTextContent
					title={`Select repayment frequency`}
					description={`Select repayment frequency from the options below:`}
				/>
				<RadioGroup
					defaultValue={repayment}
					options={OptionListImport}
					optionSelectionCallback={handleSelectingOption}
				/>
			</BorrowingCostWrapper>
			<ContinueButton
				continueCallback={() => {
					handleContinueClick();
				}}
				disabled={activateButton()}
			/>
		</div>
	);
};

export default RepaymentFormScreen;
