/* This is the screen for recording cash payment transaction for trades
 */

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
} from "components";
import { getCurrencySymbol } from "services/fx/getCurrencySymbol";
import { CalenderIcon } from "icons";
import moment from "moment";
import {
	recordCashPayment,
	getTradeDetails,
	useModalNavigation,
} from "services";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setToastMessage, updatePortfolioTradeSpecificRecord } from "store";
import { formatNumberWithCommas } from "utils";
import CalendarModal from "../Support/CalendarModal";
import showInfoModal from "../Modals/InfoModal";
import { useSelector } from "react-redux";

const INFOMODALDETAILS = [
	{
		title: "Cash rate",
		description: [
			`When you receive a payment in a foreign currency for an export or make a payment in a foreign currency for an import, you need to convert or pay that foreign currency into or from your own domestic currency. The rate at which this conversion/payment occurs is known as the "cash rate" or "market rate" .`,
		],
	},
];

const RecordCashPayment = () => {
	const { tradeId } = useParams();

	const dispatch = useDispatch();

	const [openDateModal, setOpenDateModal] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [details, setDetails] = useState<any>({});
	const { switchModalScreen } = useModalNavigation();
	const tradesList = useSelector((state: any) => {
		return state?.portfolioTradesList?.tradeList;
	});

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
			let tradeData: any = {};
			if (tradeId && tradesList[tradeId]) {
				tradeData = tradesList[tradeId];
			} else {
				const response: any = await getTradeDetails(tradeId);
				if (response) {
					tradeData = response.trade;
				}
			}
			form.setField("currency_pair", tradeData.currency_pair);
			form.setField("amount_currency", tradeData.currency_pair.split("/")[0]);
			form.setField(
				"cash_rate_currency",
				tradeData.currency_pair.split("/")[1],
			);
			setDetails(tradeData);
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

	const showInfoModalCallback = async () => {
		showInfoModal({ content: INFOMODALDETAILS, web: true });
	};

	const handleSave = async () => {
		form.value.amount = form.value.amount.replace(/,/g, "");
		form.value.cash_rate = form.value.cash_rate.replace(/,/g, "");
		const payload = form.value;
		try {
			setIsLoading(true);
			validateAmount();
			if (!form.errors.get("amount")) {
				const response: any = await recordCashPayment(payload);
				if (response.success === true) {
					dispatch(updatePortfolioTradeSpecificRecord(response?.trade));
					switchModalScreen(`trade/${tradeId}`);
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
					<div className="relative bg-white flex flex-col justify-between h-full overflow-y-scroll">
						<div className="flex flex-col ">
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
									switchModalScreen(`trade/${tradeId}/record-payments`);
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
										{openDateModal && (
											<CalendarModal
												closeModalCallback={(date: Date) => {
													setOpenDateModal(false);
													form.setField(
														"date_of_transaction",
														moment(date).format("YYYY-MM-DD"),
													);
													form.setField(
														"display_date",
														moment(date).format("DD MMM 'YY"),
													);
												}}
												outsideClickCallback={() => {
													setOpenDateModal(false);
												}}
												date={form.getField("date_of_transaction")}
												maxDate={
													new Date() < new Date(details.maturity_date)
														? new Date()
														: new Date(details.maturity_date)
												}
												minDate={new Date(details.created_at)}
											/>
										)}
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
													showInfoModalCallback();
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
							className={`shadow-boxShadow  h-fit py-3 px-4 flex bg-white  shadow-style-chooser gap-x-5 items-center justify-center w-full mt-auto`}
						>
							<UnderlineButton
								onClick={() => {
									switchModalScreen(`trade/${tradeId}/record-payments`);
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
					</div>
				</>
			}
		/>
	);
};
export default RecordCashPayment;
