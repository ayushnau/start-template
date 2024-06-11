import React, { useState, useEffect } from "react";
import {
	BorrowingCostTextContent,
	BorrowingCostWrapper,
	ContinueButton,
	Header,
	PrimaryInput,
} from "components";
import CalendarModal from "../../../../../src/web-components/src/Support/CalendarModal";
import { CalendarModal as CalendarModalMobile } from "components";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useBetaForm as useBetaForm } from "@locoworks/reusejs-toolkit-react-hooks";
import moment from "moment";
import { CalenderIcon, IIcon } from "icons";
import { setfcnrCostCalculatorLoanStartDate } from "store/src/fcnrCostCalculatorSlice";
import { StoreState } from "store";

export interface FcnrLoanDateInterface {
	web?: boolean;
}
const FcnrLoanDate: React.FC<FcnrLoanDateInterface> = ({ web = false }) => {
	const { loan_start_date } = useSelector((state: StoreState) => {
		return state.fcnrCostCalculatorSlice;
	});

	const form = useBetaForm({
		loan_start_date_form: loan_start_date,
	});
	const minDate = new Date();
	minDate.setFullYear(minDate.getFullYear() - 2);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [openDateModal, setOpenDateModal] = useState(false);
	const [dateObj, setDateObj] = useState(new Date());
	const [runOverrideCalendarStyles, setRunOverrideCalendarStyles] =
		useState(false);
	const [disabled, setDisabled] = useState(true);


	useEffect(() => {
		if ((form.value.loan_start_date_form != "")||loan_start_date!="" ){
			setDisabled(false);
		} else {
			setDisabled(true);
		}
	}, );

	const showCalendarModal = async () => {
		if (!web) {
			const details = {
				setDateObj: setDateObj,
				form: form,
				setRunOverrideCalendarStyles: setRunOverrideCalendarStyles,
				dateObj: dateObj,
				minDate: minDate,
				maxDate: moment().add(1, "year"),
				form_field: "loan_start_date_form",
				no_date_limit: true,
				customAlertMsg:
					"please select a date less than 2 years of current date",
			};

			const response = await CalendarModalMobile({
				details: details,
			});
		} else {
			setOpenDateModal(true);
		}
	};

	const handleBackAction = () => {
		navigate(-1);
	};

	const handleCloseModalCallback = (date: Date) => {
		setOpenDateModal(false);
		form.setField("loan_start_date_form", moment(date).format("YYYY-MM-DD"));
	};

	const handleContinueClick = () => {

		dispatch(setfcnrCostCalculatorLoanStartDate(form.value.loan_start_date_form))
		navigate(
			web === true
				? "/fx-home/fx-tools/fcnr-cost-calculator/details/loan_amt"
				: "/fx-home/fcnr-cost-calculator/details/loan_amt",
		);
	};

	return (
		<div className="flex flex-col item-center h-full">
			<Header
				className="h-14 flex items-center p-4 gap-x-4 border-b border-mine-shaft-2"
				displayTitle={<>FCNR/FCDL cost calculator</>}
				displayTitleStyles="font-inter leading-6 font-bold text-base text-mine-shaft-4"
				showEditIcon={false}
				backAction={handleBackAction}
			/>
			<div className="w-full h-full flex flex-col justify-between ">
				<BorrowingCostWrapper>
					<BorrowingCostTextContent
						title="Enter loan start date"
						description="Please choose the date on which the loan was taken:"
					/>
				</BorrowingCostWrapper>
				<div className="flex flex-col px-5 pt-4 gap-y-4 flex-1 overflow-y-scroll ">
					{openDateModal && (
						<CalendarModal
							classes="top-1/2 -translate-y-1/2"
							closeModalCallback={(date: Date) => {
								handleCloseModalCallback(date);
							}}
							outsideClickCallback={() => {
								setOpenDateModal(false);
							}}
							date={form.getField("loan_start_date_form")}
							minDate={minDate}
							maxDate={moment().add(1, "year").toDate()}
						/>
					)}
					<PrimaryInput
						onClickCallback={(e: any) => {
							showCalendarModal();
						}}
						suffix={
							<button className="absolute top-1/2 right-4 -translate-y-[50%] ml-4 flex">
								<span className="cursor-pointer text-[24px] text-[#717171] pr-1">
									<CalenderIcon />
								</span>
							</button>
						}
						onBlur={(e, setInFocus) => {
							setInFocus(true);
						}}
						form={form}
						field="loan_start_date_form"
						fieldType="date"
						placeholder={{
							main: "Select date",
						}}
						prefix={""}
						inputMode="none"
						value={form.value.loan_start_date_form}
					/>
					<div className="font-inter text-sm leading-[21px] text-color-black-5  flex gap-x-2">
						<IIcon svgStyles="w-4 h-4 shrink-0" color="#646464" />
						Loan start date is also referred to as the Loan drawdown date
					</div>
				</div>
			</div>

			<ContinueButton
				web
				continueCallback={handleContinueClick}
				disabled={disabled}
			/>
		</div>
	);
};

export default FcnrLoanDate;
