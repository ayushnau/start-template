import React from "react";
import {
	BorrowingCostHeader,
	ContinueButton,
	DatesOptionComponent,
} from "components";
import { useLocation, useNavigate } from "react-router-dom";
import { generateMonthList } from "utils";
import { useDispatch, useSelector } from "react-redux";
import { StoreState, setImportExportSelectedMonths } from "store";

export interface MonthSelectionFormInterface {}

const MonthSelectionForm: React.FC<MonthSelectionFormInterface> = ({}) => {
	const location = useLocation();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const selectedMonths = useSelector(
		(state: StoreState) => state?.importExportToolSlice?.selectedMonths,
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
		dispatch(
			setImportExportSelectedMonths(
				allMonths.filter((item: any) => item.isSelected),
			),
		);
		if (isExportPath()) {
			navigate("/fx-home/export-quote-evaluation/enter-amount");
		} else {
			navigate("/fx-home/import-cost-analyser/enter-amount");
		}
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
		<div className="md:mx-auto w-full md:w-1/3 mt-2">
			<BorrowingCostHeader
				label={
					isExportPath()
						? "Select expected receivable month(s)"
						: "Select expected payable month(s)"
				}
				navigateBackCallback={onBackPress}
				className="fixed top-0 bg-white z-10 w-full"
			/>
			<DatesOptionComponent
				allMonths={allMonths}
				callback={callbackForSelection}
				callBackAll={callBackAllFunction}
			/>
			<ContinueButton
				continueCallback={() => {
					handleContinueClick();
				}}
				disabled={activateButton()}
			/>
		</div>
	);
};

export default MonthSelectionForm;
