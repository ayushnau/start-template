import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import {
	Loader,
	Header,
	WarningBanner,
	PrimaryButton,
	CurrencyPairFlags,
	PrimaryInput,
	UnderlineButton,
} from "components";
import {
	overrideCalendarStyles,
	createTransactions,
	getHedgeDetails,
} from "services";
import moment from "moment";
import { getCurrencySymbol } from "services/fx/getCurrencySymbol";
import { useDispatch, useSelector } from "react-redux";
import { setToastMessage } from "store";
import { useBetaForm } from "@locoworks/reusejs-toolkit-react-hooks";
import { IIcon, CalenderIcon, ArrowIcon } from "icons";
import Sliderup from "../../Components/Sliderup";
import { checkWeekendDate, formatNumberWithCommas } from "utils";
import { useParams, useLocation, useNavigate } from "react-router-dom";

const UseHedge: React.FC = () => {
	const { ledgerId, tradeId, hedgeId } = useParams();
	const { state } = useLocation();
	const [details, setDetails] = React.useState<any>({});
	const [hedgeDetails, setHedgeDetails] = useState<any>({});
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);
	const dispatch = useDispatch();
	const [openDateModal, setOpenDateModal] = useState(false);
	const [translateY, setTranslateY] = useState(0);
	const [dateObj, setDateObj] = useState(Date());
	const [runOverrideCalendarStyles, setRunOverrideCalendarStyles] =
		useState(false);
	const isMatured = state?.from === "matured";
	const link_amount = state?.link_amount;
	const [historicalError, setHistoricalError] = useState("");
	const [loadText, setLoadText] = useState("");

	const form = useBetaForm({
		trade_uuid: tradeId ? tradeId : "",
		hedge_uuid: hedgeId ? hedgeId : "",
		amount: "",
		amount_currency: "",
		type: state.type ? state.type : "",
		date_of_transaction: "",
		display_date: "",
	});

	const { tradeDetails } = useSelector((state: any) => {
		const returnValue: any = {};
		if (tradeId) {
			returnValue["tradeDetails"] =
				state?.portfolioTradesList?.tradeList[tradeId];
		}
		return returnValue;
	});

	const fetchHedgeData = async () => {
		try {
			const response: any = await getHedgeDetails(hedgeId);
			setHedgeDetails(response.trade);
			form.setField("amount_currency", response.trade.base_currency);
		} catch (error) {
			console.log(error);
		}
	};

	const handleBackBtnClick = () => {
		// isMatured && navigate(-1);
		// navigate(`/ledger/${details.ledger_id}/trade/${tradeId}`);
		navigate(-1);
	};

	const handleCreateTransactions = async () => {
		try {
			form.value.amount = form.value.amount.replace(/,/g, "");
			setIsLoading(true);
			setLoadText("Saving..");
			await createTransactions(form.value).then((result: any) => {
				if (result.success === true) {
					dispatch(
						setToastMessage({
							message: "Payment recorded!",
							type: "neutral",
						}),
					);
					isMatured && navigate(-1);
					navigate(`/ledger/${ledgerId}/trade/${tradeId}/record-payments`);
				} else {
					setIsLoading(false);
				}
			});
		} catch (error: any) {
			console.log("Error while creating Transactions", error);
			if (error?.response?.data?.error?.includes("historical")) {
				setHistoricalError(error?.response?.data?.error);
			} else {
				setHistoricalError("");
			}
			setIsLoading(false);
		}
	};

	const handleUseHedge = () => {
		form.setField("amount_currency", hedgeDetails.base_currency);
		handleCreateTransactions();
	};

	useEffect(() => {
		validatePayload();
	}, [form.value.amount]);

	useEffect(() => {
		if (openDateModal === true) {
			let max =
				new Date() < new Date(hedgeDetails.maturity_date)
					? new Date()
					: new Date(hedgeDetails.maturity_date);
			overrideCalendarStyles({
				minDate: new Date(hedgeDetails.created_at),
				maxDate: max,
			});
		}
	}, [
		openDateModal,
		form.getField("date_of_transation"),
		runOverrideCalendarStyles,
	]);

	const init = async () => {
		try {
			setIsLoading(true);
			await fetchHedgeData();
			setDetails(tradeDetails);
		} catch (error) {
			console.log("Error while Fetching :", error);
			throw error;
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		init();
	}, []);

	const validatePayload = () => {
		const formVal = form.value.amount;
		if (+formVal > +state.link_amount) {
			form.setErrors({
				amount:
					"Amount to be used cannot be greater than the remaining Hedged amount",
			});
		} else {
			form.errors.forget();
		}
	};

	return (
		<Loader
			isLoading={isLoading}
			loadingText={loadText ? loadText : ""}
			successComponent={
				<div className="bg-white h-full flex flex-col">
					{details && (
						<>
							{openDateModal ? (
								<>
									<Sliderup
										ChildComponent={
											<div className="w-full flex justify-center pb-2">
												<Calendar
													minDate={new Date(hedgeDetails.created_at)}
													maxDate={
														new Date() < new Date(hedgeDetails.maturity_date)
															? new Date()
															: new Date(hedgeDetails.maturity_date)
													}
													className={`w-full`}
													onChange={(date: any) => {
														if (checkWeekendDate(date)) return;
														if (
															date >= new Date(hedgeDetails.created_at) &&
															date <=
																(new Date() <
																new Date(hedgeDetails.maturity_date)
																	? new Date()
																	: new Date(hedgeDetails.maturity_date))
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
														} else {
															alert(
																`please select date greater than today's date`,
															);
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

							<Header
								className="flex items-center justify-between px-4 border-b-mine-shaft-2 border-b pb-2 mt-2"
								displayTitle="Use hedge"
								displaySubTitle={
									<>
										<div className="flex items-center justify-start text-mine-shaft-3">
											<div>
												{details.base_currency ? details.base_currency : "USD"}
											</div>
											<ArrowIcon className="mx-1" color="#717171" />
											<div className="mr-2">
												{details.quote_currency
													? details.quote_currency
													: "INR"}
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
								backAction={handleBackBtnClick}
							/>

							<div className="relative border-t-[1px] border-mine-shaft-2 overflow-y-scroll">
								{isMatured ? (
									<WarningBanner
										prefix={<IIcon svgStyles="scale-[.8]" color="#AB404A" />}
										className="text-sunset-orange-3 bg-sunset-orange-1  text-sm font-inter font-normal leading-[22px]"
										label={"Missing hedge information "}
										amount={`${
											details && details?.base_currency
												? getCurrencySymbol(details.base_currency)
												: ""
										}${link_amount ? formatNumberWithCommas(link_amount) : ""}`}
									/>
								) : (
									<WarningBanner
										amount={`${getCurrencySymbol(
											details.base_currency,
										)}${formatNumberWithCommas(state.link_amount)}`}
										label={"Hedged amount"}
										className="text-spanish-yellow-3 font-inter font-normal leading-[22px] text-sm"
									/>
								)}
								<div className="px-5 mt-5 gap-y-4 flex flex-col">
									<label className="font-inter font-normal leading-[22px] text-sm text-mine-shaft-3">
										Please enter details of the Hedge used for this trade. We
										will also update your remaining amount to pay or receive
										automatically.
									</label>
									<div>
										<PrimaryInput
											form={form}
											field="amount"
											fieldType={"number"}
											inputMode="decimal"
											placeholder={{
												main: "Enter amount",
											}}
											onBlur={validatePayload}
											prefix={getCurrencySymbol(hedgeDetails.base_currency)}
											errorMsg={form.errors.get("amount")}
											errorWithIcon
											iconPlaceTop
										/>
									</div>

									<div>
										<PrimaryInput
											suffix={
												<span className="absolute top-1/2 right-4 -translate-y-[50%] ml-4 flex cursor-pointer text-[24px] text-[#717171] pr-1">
													<CalenderIcon />
												</span>
											}
											onBlur={(e, setInFocus) => {
												setInFocus(true);
											}}
											form={form}
											field="display_date"
											fieldType={"number"}
											inputMode="none"
											placeholder={{
												main: "Date of transaction",
											}}
											onClickCallback={(e: any) => {
												setOpenDateModal(true);
											}}
											errorMsg={historicalError}
										/>
									</div>
								</div>
							</div>
						</>
					)}
					<div className="absolute bottom-0 left-0 right-0 px-4 py-3 flex gap-x-[18px] bg-white shadow-boxShadow">
						<UnderlineButton
							buttonText="Cancel"
							className="w-full"
							onClick={() => {
								navigate(-1);
							}}
						/>
						<PrimaryButton
							disabled={
								form.value.amount !== "" &&
								form.value.date_of_transaction !== "" &&
								!form.errors.hasErrors()
									? false
									: true
							}
							buttonText="Save"
							className="w-full"
							onClick={handleUseHedge}
						/>
					</div>
				</div>
			}
		/>
	);
};

export default UseHedge;
