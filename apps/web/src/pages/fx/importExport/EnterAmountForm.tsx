import React from "react";
import {
	AmountFieldsSection,
	BorrowingCostHeader,
	ContinueButton,
} from "components";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setImportExportSelectedMonthsWithAmount } from "store";

export interface EnterAmountFormInterface {}

const EnterAmountForm: React.FC<EnterAmountFormInterface> = ({}) => {
	const location = useLocation();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { selectedMonths, selectedMonthsWithAmount } = useSelector(
		(state: any) => state?.importExportToolSlice,
	);
	const [isContinueDisabled, setIsContinueDisabled] = React.useState(true);

	const [monthsWithAmount, setMonthsWithAmount] = React.useState(
		selectedMonths?.map((item: any) => {
			const match = selectedMonthsWithAmount?.find((ele: any) => {
				return item?.month === ele?.month;
			});
			if (match) {
				return { ...item, amount: match.amount };
			}
			return { ...item, amount: "" };
		}),
	);

	const isExportPath = () => {
		if (location.pathname.includes("export-quote-evaluation")) {
			return true;
		}
		return false;
	};

	const onBackPress = () => {
		navigate(-1);
	};

	const handleContinueClick = () => {
		dispatch(setImportExportSelectedMonthsWithAmount([...monthsWithAmount]));
		if (isExportPath()) {
			navigate("/fx-home/export-quote-evaluation");
		} else {
			navigate("/fx-home/import-cost-analyser");
		}
	};

	const validateFields = () => {
		setMonthsWithAmount([...monthsWithAmount]);
		if (!monthsWithAmount.some((item: any) => item.amount === "")) {
			setIsContinueDisabled(false);
		} else {
			setIsContinueDisabled(true);
		}
	};

	return (
		<div className="md:mx-auto w-full md:w-1/3 mt-2">
			<BorrowingCostHeader
				label={
					isExportPath()
						? "Select expected receivable amount(s)"
						: "Select expected payable amount(s)"
				}
				navigateBackCallback={onBackPress}
				className="fixed top-0 bg-white z-[999] w-full"
			/>
			<AmountFieldsSection
				selectedMonths={monthsWithAmount}
				validateFields={validateFields}
			/>
			<ContinueButton
				continueCallback={() => {
					handleContinueClick();
				}}
				disabled={isContinueDisabled}
			/>
		</div>
	);
};

export default EnterAmountForm;
