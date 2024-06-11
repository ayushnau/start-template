import React, { useEffect, useState } from "react";
import { ArrowIcon, IIcon } from "icons";
import { useBetaForm } from "@locoworks/reusejs-toolkit-react-hooks";
import {
	PrimaryButton,
	UnderlineButton,
	Header,
	CurrencyPairFlags,
	PrimaryInput,
	Loader,
	WarningBanner,
	InfoModal,
} from "components";
import { getCurrencySymbol } from "services/fx/getCurrencySymbol";
import { useNavigate } from "react-router-dom";
import { CalenderIcon } from "icons";
import Sliderup from "../../Components/Sliderup";
import Calendar from "react-calendar";
import moment from "moment";
import { recordCashPayment, overrideCalendarStyles } from "services";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setToastMessage } from "store";
import {
	checkWeekendDate,
	formatNumberWithCommas,
	TRADECASHPAYMENTINFO,
} from "utils";

const RecordCashPayment = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [openDateModal, setOpenDateModal] = useState(false);
	const [translateY, setTranslateY] = useState(0);
	const [isLoading, setIsLoading] = useState(false);
	const [runOverrideCalendarStyles, setRunOverrideCalendarStyles] =
		useState(false);
	const [dateObj, setDateObj] = useState(Date());
	const { tradeId } = useParams();

	const trade = useSelector((state: any) => {
		if (tradeId) {
			return state?.portfolioTradesList?.tradeList[tradeId];
		}
	});

	const [details, setDetails] = useState<any>(trade);
	const form = useBetaForm({
		trade_uuid: tradeId ? tradeId : "",
		amount: "",
		currency_pair: "USD/INR",
		date_of_transaction: "",
		cash_rate: "",
		type: "transaction_via_cash_trade",
		pnl: "",
		amount_currency: "",
		cash_rate_currency: "",
		display_date: "",
	});

	const fetchTradeData = async () => {
		try {
			setIsLoading(true);
			form.setField("currency_pair", trade.currency_pair);

			form.setField("amount_currency", trade.currency_pair.split("/")[0]);
			form.setField("cash_rate_currency", trade.currency_pair.split("/")[1]);
			setDetails(trade);
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	};

	function isFormValid() {
		return (
			form.value.amount !== "" &&
			form.value.cash_rate !== "" &&
			form.value.date_of_transaction !== "" &&
			!form.errors.hasErrors()
		);
	}

	useEffect(() => {
		fetchTradeData();
	}, []);

	useEffect(() => {
		validateAmount();
	}, [form.value.amount]);

	const validateAmount = () => {
		let amountValue = form.value.amount;
		amountValue = amountValue.replace(/,/g, "");
		if (+amountValue > +details.unhedged_amount) {
			form.setErrors({
				amount:
					"Amount to be used cannot be greater than the remaining Hedged amount",
			});
		} else {
			form.errors.forget();
		}
	};

	useEffect(() => {
		if (openDateModal === true) {
			let max =
				new Date() < new Date(details.maturity_date)
					? new Date()
					: new Date(details.maturity_date);
			overrideCalendarStyles({
				minDate: new Date(details.created_at),
				maxDate: max,
			});
		}
	}, [
		openDateModal,
		form.getField("date_of_transation"),
		runOverrideCalendarStyles,
	]);

	const showInfoModal = async () => {
		await InfoModal({
			fillContent: TRADECASHPAYMENTINFO,
		});
	};

	const handleSave = async () => {
		try {
			setIsLoading(true);
			form.value.amount = form.value.amount.replace(/,/g, "");
			form.value.cash_rate = form.value.cash_rate.replace(/,/g, "");
			const payload = form.value;
			validateAmount();
			if (!form.errors.get("amount")) {
				const response: any = await recordCashPayment(payload);
				if (response.success === true) {
					navigate(-1);
				}
				dispatch(
					setToastMessage({
						message: `Payment recorded!`,
						type: "neutral",
					}),
				);
			}
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Loader
			isLoading={isLoading}
			successComponent={
				<>
					<div className="relative bg-white flex flex-col h-full overflow-y-scroll">
						<Header
							className="flex items-center justify-between px-4 pb-2 mt-2 border-b-semiLightGray border-b"
							displayTitle="Record cash payment"
							displaySubTitle={
								<>
									<div className="flex items-center justify-start text-mine-shaft-3">
										<div>
											{details.base_currency
												? details.base_currency
												: "USD/INR".split("/")[0]}
										</div>
										<ArrowIcon className="mx-1" color="#717171" />
										<div className="mr-2">
											{details.quote_currency
												? details.quote_currency
												: "USD/INR".split("/")[1]}
										</div>
										<CurrencyPairFlags
											flagpair={
												details.currency_pair
													? details.currency_pair
													: "USD/INR"
											}
										/>
									</div>
								</>
							}
							showEditIcon={false}
							backAction={() => {
								navigate(-1);
							}}
						/>

						<WarningBanner
							amount={`${getCurrencySymbol(
								details.base_currency,
							)}${formatNumberWithCommas(details.unhedged_amount)}`}
							label="Unhedged amount"
							className="text-spanish-yellow-3 font-inter font-normal leading-[22px] text-sm"
						/>
						<div className="mx-5 pb-5 ">
							<div className="font-inter font-normal leading-[22px] text-sm text-mine-shaft-3 pt-5">
								Please enter details of the payment received or paid. It will
								update your remaining amount to pay or receive automatically.
							</div>
							<div className="flex flex-col mt-4">
								<PrimaryInput
									form={form}
									field="amount"
									fieldType={"number"}
									inputMode="decimal"
									onBlur={validateAmount}
									placeholder={{
										main: "Enter amount ",
										subString: details.base_currency
											? `e.g:  ${
													getCurrencySymbol(details.base_currency) ||
													details.base_currency
											  } 500,00`
											: "e.g: $500,000",
									}}
									prefix={
										getCurrencySymbol(details.base_currency)
											? getCurrencySymbol(details.base_currency)
											: details.base_currency
									}
									disabled={!form.getField("currency_pair")}
									onClickCallback={(e: any) => {
										if (!form.getField("currency_pair")) {
											alert("Please select the currency flag first");
										}
									}}
									errorMsg={form.errors.get("amount")}
									errorWithIcon
									iconPlaceTop
								/>
								{openDateModal ? (
									<>
										<Sliderup
											ChildComponent={
												<div className="w-full flex justify-center pb-2">
													<Calendar
														minDate={new Date(details.created_at)}
														maxDate={
															new Date() < new Date(details.maturity_date)
																? new Date()
																: new Date(details.maturity_date)
														}
														className={`w-full`}
														onChange={(date: any) => {
															if (checkWeekendDate(date)) return;
															if (
																date >= new Date(details.created_at) &&
																date <=
																	(new Date() < new Date(details.maturity_date)
																		? new Date()
																		: new Date(details.maturity_date))
															) {
																setDateObj(date);
																form.setField(
																	"display_date",
																	moment(date).format("DD MMM 'YY"),
																);
																form.setField(
																	"date_of_transaction",
																	moment(date).format("YYYY-MM-DD"),
																);
																setOpenDateModal(false);
															}
														}}
														onActiveStartDateChange={() => {
															setRunOverrideCalendarStyles(
																!runOverrideCalendarStyles,
															);
														}}
														value={dateObj}
													/>
												</div>
											}
											translateY={translateY}
											setTranslateY={setTranslateY}
											showScreen={openDateModal}
											handleSlideShowChange={setOpenDateModal}
										/>
									</>
								) : null}

								<div>
									<PrimaryInput
										suffix={
											<span
												onClick={() => {
													setOpenDateModal(true);
												}}
												className="absolute top-1/2 right-4 -translate-y-[50%] ml-4 flex cursor-pointer text-[24px] text-[#717171] pr-1"
											>
												<CalenderIcon />
											</span>
										}
										wrapperClasses="mt-4"
										onBlur={(e, setInFocus) => {
											setInFocus(true);
										}}
										form={form}
										inputMode="none"
										field="display_date"
										fieldType={"number"}
										placeholder={{
											main: "Date of transaction",
										}}
										onClickCallback={(e: any) => {
											setOpenDateModal(true);
										}}
									/>
								</div>
								<PrimaryInput
									form={form}
									field="cash_rate"
									wrapperClasses="mt-4"
									fieldType={"number"}
									onChange={(e) => {
										form.setField("cash_rate", e.target.value);
									}}
									inputMode="decimal"
									placeholder={{
										main: "Cash rate e.g. ₹86.70",
									}}
									suffix={
										<button
											className="absolute top-1/2 right-4 -translate-y-[50%] ml-4 flex"
											onClick={() => {
												showInfoModal();
											}}
										>
											<span className="cursor-pointer text-[24px] text-[#717171] pr-1">
												<IIcon color={"#717171"} />
											</span>
										</button>
									}
									prefix={
										getCurrencySymbol(details.quote_currency)
											? getCurrencySymbol(details.quote_currency)
											: details.quote_currency
									}
								/>
							</div>
						</div>
					</div>

					<div
						className={`shadow-boxShadow fixed bottom-0 left-0 right-0 h-fit py-3 px-4 flex bg-white  shadow-style-chooser gap-x-5 items-center justify-center md:w-1/3 m-auto
            }`}
					>
						<UnderlineButton
							onClick={() => {
								navigate(-1);
							}}
							buttonText="Cancel"
						/>
						<PrimaryButton
							className="disabled:hover:bg-semiLightGray"
							disabled={!isFormValid()}
							onClick={async () => {
								await handleSave();
							}}
							buttonText="Save"
						/>
					</div>
				</>
			}
		/>
	);
};
export default RecordCashPayment;
