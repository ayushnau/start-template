import React, { useEffect, useState } from "react";
import {
	CurrencyInput,
	UnderlineButton,
	PrimaryButton,
	PrimaryInput,
	Loader,
	Header,
} from "components";
import { useNavigate } from "react-router-dom";
import { useBetaForm } from "@locoworks/reusejs-toolkit-react-hooks";
import { getCurrencySymbol } from "services/fx/getCurrencySymbol";
import { CalenderIcon } from "icons";
import { useModalNavigation } from "services";
import CalendarModal from "../Support/CalendarModal";
import showSelectCurrencyPairModal from "../Modals/SelectCurrencyPairModal";
import moment from "moment";
import { twMerge } from "tailwind-merge";
import { useDispatch } from "react-redux";
import {
	clearDrawdownRate,
	setPcfcAmount,
	setPcfcFormWithPayload,
} from "store";
import { setToastMessage } from "store";
import { useSelector } from "react-redux";
import { checkIsMultipleDateHoliday } from "services";
import { SubTitle2 } from "../../../Typography";
// import { SubTitle2 } from "../../HomeComponents/Typography";

export interface FcnrLoanDateInterface {
	web?: boolean;
}

const AddLoan: React.FC<FcnrLoanDateInterface> = ({ web = false }) => {
	const navigate = useNavigate();
	// const minDate = new Date("2021-01-02");
	const [disabled, setDisabled] = useState(true);
	const [openLoanStartDateModal, setOpenLoanStartDateModal] = useState(false);
	const [errorMsg, setErrorMsg] = React.useState("");
	const [openLoanMaturityDateModal, setOpenLoanMaturityDateModal] =
		useState(false);
	const [openDateModal2, setOpenDateModal2] = useState(false);
	const [dateType, setDateType] = useState("");
	const { closeModalScreen, fullNavigation, switchModalScreen } =
		useModalNavigation();
	const dispatch = useDispatch();
	const formStorePaylaod = useSelector((state: any) => {
		return state.pcfcFormSlice;
	});
	const {
		currency_pair,
		pcfc_amount,
		drawdown_rate,
		loan_start_date,
		maturity_date,
		number_of_days,
	} = formStorePaylaod;
	const form = useBetaForm({
		currency_pair,
		pcfc_amount,
		drawdown_rate,
		loan_start_date,
		maturity_date,
		number_of_days,
	});

	useEffect(() => {
		const minDate = form.value.loan_start_date;
		const maxDate = form.value.maturity_date;
		if (maxDate && minDate && minDate !== "" && maxDate !== "") {
			const daysDifference = moment(maxDate).diff(minDate, "days");
			form.setField("number_of_days", daysDifference);
		}
	}, [form.value.loan_start_date, form.value.maturity_date]);

	useEffect(() => {
		const minDate = form.value.loan_start_date;
		const numberOfDays = form.value.number_of_days;
		if (minDate && minDate !== "" && numberOfDays) {
			const newDate = moment(minDate)
				.add(numberOfDays, "days")
				.format("YYYY-MM-DD");
			form.setField("maturity_date", newDate);
		}
	}, [form.value.loan_start_date, form.value.number_of_days]);
	useEffect(() => {
		const currentCurrencyPair = form.value.currency_pair;
		form.setField("base_currency", currentCurrencyPair.split("/")[0]);
		form.setField("quote_currency", currentCurrencyPair.split("/")[1]);
	}, [form.value.currency_pair]);
	const handleSave = () => {
		const payload = form.value;
		dispatch(setPcfcFormWithPayload(payload));
		switchModalScreen(`add-loan/step-two`);
	};
	const calculateLoanEndDate = () => {
		const startDate = new Date(form.value.loan_start_date);
		var days = form.value.number_of_days;
		{
			const endDate = new Date(
				startDate.getTime() + days * 24 * 60 * 60 * 1000,
			);

			const res = endDate.toISOString().slice(0, 10);

			form.setField("loan_maturity_date", res);
		}
		if (form.value.loan_maturity_date === form.value.loan_start_date) {
			form.setField("number_of_days", "");
			form.setField("loan_maturity_date", "");
		}
	};

	useEffect(() => {
		if (
			form.getField("pcfc_amount") &&
			form.getField("drawdown_rate") &&
			form.getField("currency_pair")
		) {
			setDisabled(false);
		} else {
			setDisabled(true);
		}
	}, [form]);

	const showCalendarModal = async (label: any) => {
		setDateType(label);
		if (label === "loan_start_date") setOpenLoanStartDateModal(true);
		if (label === "maturity_date") setOpenLoanMaturityDateModal(true);
	};

	const [base_currency, quote_currency] = form
		?.getField("currency_pair")
		?.split("/");

	const handleCalculateResult = async () => {
		const requestObject = {
			pairs: base_currency,
			date_to_verify: form.getField("loan_maturity_date"),
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
				"loan_maturity_date",
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
		<Loader
			isLoading={false}
			successComponent={
				<>
					<div
						onClick={() => console.log({ formStorePaylaod }, form.value)}
						className="relative pt-4 bg-white flex flex-col h-full overflow-y-hidden"
					>
						<Header
							className="flex items-center justify-between px-4 py-[7px] bg-white z-30"
							displayTitle="Add PCFC/PSFC loan"
							showEditIcon={false}
							showPlainText={true}
							SuffixPlaintext="Step 1 / 2"
							backAction={() => {
								closeModalScreen();
							}}
						/>
						<div className="border border-1 border-b border-mine-shaft-2" />

						<div className="flex flex-col mx-5 mt-4 gap-y-4 pb-[70px] flex-1 overflow-y-scroll ">
							<CurrencyInput
								setShowSelectCurrencyPair={async () => {
									await showSelectCurrencyPairModal({
										form: form,
									});
								}}
								form={form}
								disabled={false}
								suffix
							/>
							<PrimaryInput
								onChange={(e: any) => {
									const value = e.target.value;
								}}
								classNames="leading-[22px] "
								form={form}
								field={"pcfc_amount"}
								fieldType={"number"}
								placeholder={{
									main: "Amount ",
									subString: base_currency
										? `e.g:  ${
												getCurrencySymbol(base_currency) || base_currency
										  } 500,00`
										: "e.g: $500,000",
								}}
								prefix={
									getCurrencySymbol(base_currency)
										? getCurrencySymbol(base_currency)
										: base_currency
								}
								onBlur={(e, setInFocus) => {
									setInFocus(true);
								}}
								value={form.value.pcfc_amount}
								numberOnly
							/>
							<PrimaryInput
								onChange={(e: any) => {
									const value = e.target.value;
								}}
								classNames="leading-[22px] "
								form={form}
								field={"drawdown_rate"}
								fieldType={"number"}
								inputMode="decimal"
								placeholder={{
									main: "Drawdown rate",
								}}
								onBlur={(e, setInFocus) => {
									setInFocus(true);
								}}
								value={form.value.drawdown_rate}
								prefix={
									getCurrencySymbol(base_currency)
										? getCurrencySymbol(base_currency)
										: base_currency
								}
								numberOnly
							/>
							<div
								className={twMerge(
									"border rounded-2xl px-4 pt-4 pb-2 ",
									disabled ? " pointer-events-none" : "",
								)}
							>
								<span className="text-xl font-inter font-bold">
									Loan duration
								</span>

								<div className="mt-2">
									<SubTitle2 classes="mb-2">Loan start date</SubTitle2>
									{openLoanStartDateModal && (
										<CalendarModal
											classes="top-1/2 -translate-y-1/2"
											closeModalCallback={(date: Date) => {
												form.setField(
													"loan_start_date",
													moment(date).format("YYYY-MM-DD"),
												);
												setOpenLoanStartDateModal(false);
											}}
											outsideClickCallback={() => {
												setOpenLoanStartDateModal(false);
											}}
											date={form.getField("loan_start_date")}
											maxDate={moment().add(1, "year").toDate()}
										/>
									)}
									<PrimaryInput
										onClickCallback={(e: any) => {
											showCalendarModal("loan_start_date");
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
										field="loan_start_date"
										fieldType="date"
										placeholder={{
											main: "Select date",
										}}
										prefix={""}
										inputMode="none"
										value={form.value.loan_start_date}
										wrapperClasses="w-1/2"
									/>
								</div>

								<div className="border-b border-dotted w-full border-mine-shaft-2 my-4" />

								<div>
									<SubTitle2> Loan maturity date</SubTitle2>
									<div className="flex flex-row items-center  overflow-y-scroll ">
										{openLoanMaturityDateModal && (
											<CalendarModal
												classes="top-1/2 -translate-y-1/2"
												closeModalCallback={async (date: Date) => {
													form.setField(
														"maturity_date",
														moment(date).format("YYYY-MM-DD"),
													);
													setOpenLoanMaturityDateModal(false);
												}}
												outsideClickCallback={() => {
													setOpenLoanMaturityDateModal(false);
												}}
												date={form.getField("maturity_date")}
												minDate={new Date(form.value.loan_start_date)}
											/>
										)}

										<PrimaryInput
											onClickCallback={(e: any) => {
												showCalendarModal("maturity_date");
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
											field={"maturity_date"}
											fieldType="date"
											placeholder={{
												main: "Select date",
											}}
											prefix={""}
											inputMode="none"
											value={form.value.maturity_date}
											disabled={
												form.value.loan_start_date == "" ||
												form.value.loan_start_date == undefined
											}
										/>
										<div className="relative">
											<label className="px-2 relative z-10">Or</label>
										</div>

										<PrimaryInput
											value={form.value.number_of_days}
											onChange={(e: any) => {
												const value = e.target.value;

												if (value === "") {
													setErrorMsg("Enter a number");
												} else {
													form.setField("no_of_days_form", value);
												}
											}}
											onBlur={(e, setInFocus) => {
												if (!isNaN(form.value.number_of_days)) {
													calculateLoanEndDate();
													setInFocus(true);

													handleCalculateResult();
												}
											}}
											classNames="leading-[22px] "
											form={form}
											field={"number_of_days"}
											fieldType={"number"}
											inputMode="decimal"
											placeholder={{
												main: "Number of days e.g. 60",
											}}
											numberOnly
										/>
									</div>
								</div>
							</div>
						</div>

						<div
							className={`shadow-boxShadow h-fit py-3 px-4 flex bg-white shadow-style-chooser gap-x-5 items-center justify-center w-full m-auto `}
						>
							<>
								<UnderlineButton
									onClick={() => {
										closeModalScreen();
									}}
									buttonText="Back"
								/>
								<PrimaryButton
									className="disabled:hover:bg-semiLightGray"
									disabled={disabled}
									onClick={() => {
										handleSave();
									}}
									buttonText={"Save"}
								/>
							</>
						</div>
					</div>
				</>
			}
			loadingText={"loading"}
		/>
	);
};
export default AddLoan;
