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
import { StoreState, setBorrowingCostComparisonMoratorium } from "store";

const MoratoriumFormScreen: React.FC = () => {
	const { base_currency, moratorium } = useSelector(
		(state: StoreState) => state.borrowingCostComparisonSlice,
	);

	const dispatch = useDispatch();

	const OptionListImport = [
		{ label: "Not applicable", value: "NA" },
		{ label: "3 months", value: "3M" },
		{ label: "6 months", value: "6M" },
		{ label: "12 months", value: "12M" },
		{ label: "15 months", value: "15M" },
		{ label: "18 months", value: "18M" },
	];

	const navigate = useNavigate();

	const [selectedOption, setSelectedOption] = React.useState(
		moratorium ? moratorium : "",
	);

	const handleSelectingOption = (value: string) => {
		setSelectedOption(value);
	};

	const handleContinueClick = () => {
		dispatch(setBorrowingCostComparisonMoratorium(selectedOption));
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
					title={`Select moratorium`}
					description={`Select moratorium period from the options below: `}
				/>
				<RadioGroup
					defaultValue={moratorium}
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

export default MoratoriumFormScreen;
