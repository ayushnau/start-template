import React, { useState, useEffect, useRef } from "react";
import {
	BorrowingCostTextContent,
	BorrowingCostWrapper,
	ContinueButton,
	Header,
	PrimaryInput,
	VSDivider,
} from "components";
import CalendarModal from "../../../../../src/web-components/src/Support/CalendarModal";
import { CalendarModal as CalendarModalMobile } from "components";
import { useNavigate } from "react-router-dom";
import { StoreState } from "store";
import { useDispatch, useSelector } from "react-redux";
import { useBetaForm as useBetaForm } from "@locoworks/reusejs-toolkit-react-hooks";
import moment from "moment";
import { CalenderIcon } from "icons";
import {
	setfcnrCostCalculatorLoanDueDate,
	setfcnrCostCalculatorNumOfDays,
} from "store/src/fcnrCostCalculatorSlice";
import {  checkIsMultipleDateHoliday } from "services";

export interface FcnrLoanDateInterface {
	web?: boolean;
}
const FcnrLoanTenor: React.FC<FcnrLoanDateInterface> = ({ web = false }) => {
	const { loan_start_date, loan_due_date, num_of_days, base_currency } =
		useSelector((state: StoreState) => {
			return state.fcnrCostCalculatorSlice;
		});
	const form = useBetaForm({
		loan_due_date_form: loan_due_date,
		no_of_days_form: num_of_days,
	});
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [openDateModal, setOpenDateModal] = useState(false);
	const [openDateModalMobile, setOpenDateModalMobile] = useState(false);
	const [dateObj, setDateObj] = useState(new Date());
	const [runOverrideCalendarStyles, setRunOverrideCalendarStyles] =
		useState(false);
	const [errorMsg, setErrorMsg] = React.useState("");
	const [disabled, setDisabled] = useState(true);

	const loanStartDate = moment(loan_start_date, "YYYY-MM-DD");
	const minDate = new Date(loan_start_date);
	minDate.setDate(minDate.getDate() + 1);
	const currentDate = new Date();
	currentDate.setFullYear(currentDate.getFullYear() + 1);
	const maxdateString = currentDate.toISOString().slice(0, 10);
	useEffect(() => {
		if (
			form.value.no_of_days_form != "" &&
			form.value.loan_due_date_form != ""
		) {
			setDisabled(false);
		} else {
			setDisabled(true);
		}
	}, [form.value]);
	useEffect(() => {
		calculateNumOfDays();
	}, [form.value.loan_due_date_form]);



	const calculateLoanEndDate = () => {
		const startDate = new Date(loan_start_date); // Convert start date string to Date object
		var days = form.value.no_of_days_form;
		{
			const endDate = new Date(
				startDate.getTime() + days * 24 * 60 * 60 * 1000,
			); // Add days in milliseconds

			if (isNaN(endDate.getTime())) {
				setErrorMsg("Invalid end date");
				return;
			}
			const res = endDate.toISOString().slice(0, 10); // Convert end date to string in YYYY-MM-DD format

			form.setField("loan_due_date_form", res);
		}
		if (form.value.loan_due_date_form === loan_start_date) {
			form.setField("no_of_days_form", "");
			form.setField("loan_due_date_form", "");
		}
	};

	const handleContinueClick = () => {
		dispatch(setfcnrCostCalculatorNumOfDays(form.value.no_of_days_form));
		dispatch(setfcnrCostCalculatorLoanDueDate(form.value.loan_due_date_form));
		navigate(
			web === true
				? "/fx-home/fx-tools/fcnr-cost-calculator/details/loan_amt/tenor/int_rate/"
				: "/fx-home/fcnr-cost-calculator/details/loan_amt/tenor/int_rate/",
		);
	};

	const showCalendarModal = async () => {
		if (!web) {
			setOpenDateModalMobile(true);
			const details = {
				setDateObj: setDateObj,
				form: form,
				setRunOverrideCalendarStyles: setRunOverrideCalendarStyles,
				dateObj: dateObj,
				minDate: loan_start_date,
				maxDate: maxdateString,
				form_field: "loan_due_date_form",

				customAlertMsg: `Your Loan Start date is ${loan_start_date} , select a date more that start date`,
				customAlertMsgMaxDate: `Please select a date less than ${maxdateString}`,
			};

			const handleYes = () => {
				calculateNumOfDays();
				handleCalculateResult();
			};
			const response = await CalendarModalMobile({
				details: details,
				callbackYes: () => handleYes(),
			});
		} else {
			setOpenDateModal(true);
		}
	};

	const calculateNumOfDays = async () => {
		const startDate = new Date(loan_start_date);
		const dueDate = new Date(form.value.loan_due_date_form);
		const differenceInMs = dueDate.getTime() - startDate.getTime();
		const days = Math.ceil(differenceInMs / (1000 * 60 * 60 * 24));
		if (days == 0) {
			alert("Selected date is same as Loan start date");
			form.setField("no_of_days_form", "");
			form.setField("loan_due_date_form", "");
		} else {
			await form.setField("no_of_days_form", days);
		}
	};

	const handleCalculateResult = async () => {
		const requestObject = {
			pairs: base_currency,
			date_to_verify: form.getField("loan_due_date_form"),
		};

		const checkForWeekend = (date: any) => {
			if (moment(date).day() === 0 || moment(date).day() === 6) {
				return false;
			}
			return true;
		};
		const checkForHoliday = async (date: any) => {
			try {
				const response: any = await checkIsMultipleDateHoliday([
					{
						pair: base_currency + "/" + "INR",

						date: moment(date, "YYYY-MM-DD").format("DD/MM/YYYY"),
					},
				]);

				const isDateValidated = !response.data[0].isModified;

				return isDateValidated;
			} catch (error) {
				console.log(error);
				return false;
			}
		};

		const getPreviousWorkingDay = async (date: any) => {
			const entered_date = new Date(date);
			while (
				!checkForWeekend(entered_date) ||
				!(await checkForHoliday(entered_date))
			) {
				entered_date.setDate(entered_date.getDate() - 1);
			}
			await form.setField(
				"loan_due_date_form",
				moment(entered_date).format("YYYY-MM-DD"),
			);
		};
		const validateDate = async (date: any) => {
			return checkForWeekend(date);
		};
		const validateObject = async (date: any) => {
			const validateDategiven = await validateDate(date);
			return validateDategiven && (await checkForHoliday(date));
		};
		// const requestObject = {
		//   pairs: "USD/USD",
		//   date_to_verify: "2024-06-12",
		// };
		const isRequestObjectValidated = await validateObject(
			requestObject.date_to_verify,
		);
		if (isRequestObjectValidated) {
			
		} else {
			getPreviousWorkingDay(requestObject.date_to_verify);
			alert("The Maturity date or Current Date is Holiday.");
		}
	};

	return (
		<div className="flex flex-col item-center h-full">
			<Header
				className="h-14 flex items-center p-4 gap-x-4 border-b border-mine-shaft-2"
				displayTitle={<>FCNR/FCDL cost calculator</>}
				displayTitleStyles="font-inter leading-6 font-bold text-base text-mine-shaft-4"
				showEditIcon={false}
				backAction={() => {
					navigate(-1);
				}}
			/>
			<div className="w-full h-full flex flex-col justify-between ">
				<BorrowingCostWrapper>
					<BorrowingCostTextContent
						title="Enter tenor"
						description="Please provide the number of days for which the loan is taken or enter the due date of the loan"
					/>
				</BorrowingCostWrapper>

				<div className="flex flex-col px-5 pt-4 gap-y-4 flex-1 overflow-y-scroll ">
					<div className="py-1">
						<PrimaryInput
							value={form.value.no_of_days_form}
							onChange={(e: any) => {
								const value = e.target.value;

								if (value === "") {
									setErrorMsg("Enter a number");
								} else {
									form.setField("no_of_days_form", value);
								}
							}}
							onBlur={(e, setInFocus) => {

								if (!isNaN(form.value.no_of_days_form)) {
									
									calculateLoanEndDate();
									setInFocus(true);

									handleCalculateResult();
								}
							}}
							classNames="leading-[22px] "
							form={form}
							field={"no_of_days_form"}
							fieldType={"number"}
							inputMode="decimal"
							placeholder={{
								main: "Number of days e.g. 60",
							}}
							numberOnly
						/>
					</div>

					<VSDivider text="Or" />

					<div className="flex flex-col  gap-y-4 flex-1 overflow-y-scroll ">
						{openDateModal && (
							<CalendarModal
								classes="top-1/2 -translate-y-1/2"
								closeModalCallback={async (date: Date) => {
									setOpenDateModal(false);

									await form.setField(
										"loan_due_date_form",
										moment(date).format("YYYY-MM-DD"),
									);

									setDateObj(date);
									await calculateNumOfDays();
									await handleCalculateResult();
								}}
								outsideClickCallback={() => {
									setOpenDateModal(false);
								}}
								date={form.getField("loan_due_date")}
								minDate={minDate}
								maxDate={new Date(maxdateString)}
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
							field={"loan_due_date_form"}
							fieldType="date"
							placeholder={{
								main: "Loan due date",
							}}
							prefix={""}
							inputMode="none"
						/>
					</div>
				</div>
			</div>

			<ContinueButton
				web
				continueCallback={() => {
					handleContinueClick();
				}}
				disabled={disabled}
			/>
		</div>
	);
};

export default FcnrLoanTenor;
