import React from "react";
import {
	BorrowingCostHeader,
	ContinueButton,
	DatesOptionComponent,
} from "components";
import { useLocation } from "react-router-dom";
import { generateMonthList } from "utils";
import { useDispatch, useSelector } from "react-redux";
import {
	StoreState,
	setImportExportSelectedMonths,
	setImportSelectedMonths,
} from "store";
import { useIsExportPath } from "services";

export interface MonthSelectionFormInterface {
	closeModal: () => void;
	callback: () => void;
}

const MonthSelectionForm: React.FC<MonthSelectionFormInterface> = ({
	closeModal,
	callback,
}) => {
	const dispatch = useDispatch();
	const { isExportPath } = useIsExportPath();

	const selectedMonths = useSelector((state: StoreState) =>
		isExportPath
			? state?.importExportToolSlice?.selectedMonths
			: state?.importToolSlice?.selectedMonths,
	);

	const defaultSelected: string[] = selectedMonths.map(
		(item: any) => item.month,
	);

	const [allMonths, setAllMonths] = React.useState(
		generateMonthList().map((ele) => {
			return {
				...ele,
				isSelected: defaultSelected.includes(ele.month),
			};
		}),
	);

	const onBackPress = () => {
		closeModal && closeModal();
	};

	const handleContinueClick = () => {
		if (isExportPath) {
			dispatch(
				setImportExportSelectedMonths(
					allMonths.filter((item: any) => item.isSelected),
				),
			);
		} else {
			dispatch(
				setImportSelectedMonths(
					allMonths.filter((item: any) => item.isSelected),
				),
			);
		}
		callback && callback();
		closeModal && closeModal();
	};

	const activateButton = () => {
		if (allMonths.filter((item: any) => item.isSelected).length > 0) {
			return false;
		}
		return true;
	};

	const callbackForSelection = (months: string) => {
		allMonths.map((item: any) => {
			if (item.month === months) {
				item.isSelected = !item.isSelected;
			}
		});
		setAllMonths([...allMonths]);
	};

	const callBackAllFunction = (months: string[], state: boolean) => {
		allMonths.map((item: any) => {
			if (months.includes(item.month)) {
				item.isSelected = state;
			}
		});
		setAllMonths([...allMonths]);
	};

	return (
		<div className="w-full relative h-[600px] flex flex-col overflow-hidden">
			<BorrowingCostHeader
				label={
					isExportPath
						? "Select expected receivable month(s)"
						: "Select expected payable month(s)"
				}
				navigateBackCallback={onBackPress}
				className="sticky top-0 z-[999] bg-white"
			/>
			<DatesOptionComponent
				allMonths={allMonths}
				callback={callbackForSelection}
				callBackAll={callBackAllFunction}
				web
			/>
			<ContinueButton
				continueCallback={() => {
					handleContinueClick();
				}}
				disabled={activateButton()}
				web
			/>
		</div>
	);
};

export default MonthSelectionForm;
