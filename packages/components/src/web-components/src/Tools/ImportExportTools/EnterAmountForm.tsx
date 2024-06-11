import React from "react";
import {
	AmountFieldsSection,
	BorrowingCostHeader,
	ContinueButton,
} from "components";
import { useSelector, useDispatch } from "react-redux";
import {
	setImportExportSelectedMonthsWithAmount,
	setImportSelectedMonthsWithAmount,
} from "store";
import { useIsExportPath } from "services";

export interface EnterAmountFormInterface {
	closeModal: () => void;
	openMonthsFormCallback: () => void;
}

const EnterAmountForm: React.FC<EnterAmountFormInterface> = ({
	closeModal,
	openMonthsFormCallback,
}) => {
	const dispatch = useDispatch();
	const { isExportPath } = useIsExportPath();

	const { selectedMonths, selectedMonthsWithAmount } = useSelector(
		(state: any) =>
			isExportPath ? state?.importExportToolSlice : state?.importToolSlice,
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

	const onBackPress = () => {
		closeModal && closeModal();
		openMonthsFormCallback && openMonthsFormCallback();
	};

	const handleContinueClick = () => {
		if (isExportPath) {
			dispatch(setImportExportSelectedMonthsWithAmount([...monthsWithAmount]));
		} else {
			dispatch(setImportSelectedMonthsWithAmount([...monthsWithAmount]));
		}
		closeModal && closeModal();
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
		<div className="w-full h-[600px] flex flex-col justify-between relative">
			<div>
				<BorrowingCostHeader
					label={
						isExportPath
							? "Select expected receivable amount(s)"
							: "Select expected payable amount(s)"
					}
					navigateBackCallback={onBackPress}
					className="sticky top-0 z-[999] bg-white"
				/>
				<AmountFieldsSection
					selectedMonths={monthsWithAmount}
					validateFields={validateFields}
					web
				/>
			</div>
			<ContinueButton
				continueCallback={() => {
					handleContinueClick();
				}}
				disabled={isContinueDisabled}
				web
			/>
		</div>
	);
};

export default EnterAmountForm;
