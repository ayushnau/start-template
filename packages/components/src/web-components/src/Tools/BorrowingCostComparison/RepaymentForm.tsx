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

const RepaymentForm: React.FC = () => {
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
		<div className="w-full h-full flex flex-col justify-between">
			<div>
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

export default RepaymentForm;
