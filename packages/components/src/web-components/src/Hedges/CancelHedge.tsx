import { Header, PrimaryButton, PrimaryInput } from "components";
import React, { useState } from "react";
import { useBetaForm as useBetaForm } from "@locoworks/reusejs-toolkit-react-hooks";
import { getCurrencySymbol } from "services/fx/getCurrencySymbol";
import { IIcon } from "icons";
import { useParams } from "react-router-dom";
import moment from "moment";
import { overrideCalendarStyles, useModalNavigation } from "services";
import { Loader } from "components";
import { useDispatch } from "react-redux";
import { setToastMessage, updatePortfolioHedgeSpecificRecord } from "store";
import { cancelHedge } from "services";
import { CalenderIcon } from "icons";
import { WarningBanner } from "components";
import { checkDate, formatNumberWithCommas } from "utils";
import showInfoModal from "../Modals/InfoModal";
import CalendarModal from "../Support/CalendarModal";
import { useSelector } from "react-redux";

const INFODETAILS = [
	{
		title: "Cancellation amount",
		description: [
			`The amount to be cancelled from a hedge booked with a bank/exchange refers to the portion of the original hedging contract that you wish to terminate or cancel before the hedge’s maturity date. `,
		],
	},
	{
		title: "Cancellation rate",
		description: [
			"The cancellation rate refers to the foreign exchange rate that was used for canceling or unwinding a foreign exchange (FX) hedging transaction.",
		],
	},
];

const CancelHedge = () => {
	const [disabled, setDisabled] = useState(true);
	const [runOverrideCalendarStyles, setRunOverrideCalendarStyles] =
		useState(false);
	const [openDateModal, setOpenDateModal] = React.useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [dateObj, setDateObj] = useState(Date());
	const { hedgeId } = useParams();
	const dispatch = useDispatch();
	const { hedge } = useSelector((state: any) => {
		const returnObject: any = {};
		if (hedgeId) {
			returnObject["hedge"] = state?.portfolioHedgesList?.hedgeList[hedgeId];
		}
		return returnObject;
	});
	const [details, setDetails] = useState<any>(hedge);

	const { switchModalScreen } = useModalNavigation();

	React.useEffect(() => {
		init();
	}, []);

	const form = useBetaForm({
		hedge_uuid: hedgeId,
		amount: "",
		amount_currency: "",
		type: "transaction_via_cancel_hedge",
		date_of_transaction: "",
		display_date: "",
		cash_rate: "",
		cash_rate_currency: "",
	});

	const handleHedgeCancel = async () => {
		const payload = {
			amount: form.getField("amount"),
			hedge_uuid: form.getField("hedge_uuid"),
			amount_currency: form.getField("amount_currency"),
			type: form.getField("type"),
			date_of_transaction: form.getField("date_of_transaction"),
			transaction_data: {
				cancelation_rate: form.getField("cash_rate"),
				cancelation_rate_currency: form.getField("cash_rate_currency"),
			},
		};
		try {
			setIsLoading(true);
			const result: any = await cancelHedge(payload);
			if (result.success) {
				dispatch(updatePortfolioHedgeSpecificRecord(result?.hedge));
			}
		} catch (error) {
			console.log("Error while canceling hedge,", error);
		} finally {
			setIsLoading(false);
			dispatch(
				setToastMessage({
					message: `Hedge updated!`,
					type: "neutral",
				}),
			);
			switchModalScreen(`hedge/${hedgeId}`);
		}
	};

	const init = async () => {
		try {
			setIsLoading(true);
			setDetails(hedge);
			form.setField("amount_currency", hedge.base_currency);
			form.setField("cash_rate_currency", hedge.quote_currency);
		} catch (error) {
			console.log("Error populating Cancel Hedge form: ", error);
			throw error;
		} finally {
			setIsLoading(false);
		}
	};

	React.useEffect(() => {
		if (
			+form.value.amount <= +details.unlinked_amount &&
			form.getField("amount") &&
			form.getField("date_of_transaction") &&
			form.getField("cash_rate")
		) {
			setDisabled(false);
		} else {
			setDisabled(true);
		}
	}, [form.value.amount, form.value.date_of_transaction, form.value.cash_rate]);

	//TODO: Refactor useEffects
	React.useEffect(() => {
		overrideCalendarStyles({});
	}, [form.getField("maturity_date"), runOverrideCalendarStyles, dateObj]);

	React.useEffect(() => {
		if (
			+form.value.amount <= +details.unlinked_amount &&
			form.getField("amount") &&
			form.getField("date_of_transaction") &&
			form.getField("cash_rate")
		) {
			setDisabled(false);
		} else {
			setDisabled(true);
		}
		form.value.amount = form.value.amount.replace(/,/g, "");
		form.value.cash_rate = form.value.cash_rate.replace(/,/g, "");
	}, [form.value.amount, form.value.cash_rate]);

	return (
		<Loader
			isLoading={isLoading}
			successComponent={
				<div className="relative pt-4 bg-white flex flex-col h-full overflow-y-hidden">
					<Header
						className="flex items-center justify-between px-4 pb-4 border-b-semiLightGray border-b "
						displayTitle="Cancel hedge"
						showEditIcon={false}
						backAction={() => {
							switchModalScreen(`hedge/${hedgeId}`);
						}}
					/>
					{checkDate(
						moment(details?.maturity_date?.split(" ")[0], "YYYY-MM-DD"),
					) ? (
						<WarningBanner
							prefix={<IIcon svgStyles="scale-[.8]" color="#AB404A" />}
							className="text-sunset-orange-3 bg-sunset-orange-1  text-sm font-inter font-normal leading-[22px]"
							label={"Missing hedge information "}
							amount={`${
								details && details?.base_currency
									? getCurrencySymbol(details.base_currency)
									: ""
							}${
								details && details?.unlinked_amount
									? formatNumberWithCommas(details.unlinked_amount)
									: ""
							}`}
						/>
					) : (
						<WarningBanner
							className="text-spanish-yellow-3 text-sm font-inter font-normal leading-[22px]"
							label={"Unlinked hedge amount "}
							amount={`${
								details && details?.base_currency
									? getCurrencySymbol(details.base_currency)
									: ""
							}${
								details && details?.unlinked_amount
									? formatNumberWithCommas(details.unlinked_amount)
									: ""
							}`}
						/>
					)}

					{/* this padding is added for the absolutely placed item + bottom padding of the item */}
					<div className="flex flex-col mx-5 mt-5 gap-y-4 pb-[76px] flex-1 overflow-y-scroll ">
						<div>
							<PrimaryInput
								suffix={
									<button
										className="absolute top-1/2 right-4 -translate-y-[50%] ml-4 flex"
										onClick={() =>
											showInfoModal({ content: INFODETAILS, web: true })
										}
									>
										<span className="cursor-pointer text-[24px] text-textColorGray pr-1">
											<IIcon color={"#717171"} />
										</span>
									</button>
								}
								form={form}
								field="amount"
								fieldType={"number"}
								inputMode="decimal"
								placeholder={{
									main: "Cancellation amount ",
									subString: form.getField("amount_currency")
										? `e.g: ${
												getCurrencySymbol(form.getField("amount_currency")) ||
												form.getField("amount_currency")
										  } 500,00`
										: "e.g: $500,000",
								}}
								prefix={
									getCurrencySymbol(form.getField("amount_currency"))
										? getCurrencySymbol(form.getField("amount_currency"))
										: form.getField("amount_currency")
								}
								errorMsg={
									+form.value.amount > +details.unlinked_amount
										? "Cancelation amount can not be greater than the unliked amount of hedge"
										: undefined
								}
								errorWithIcon
								iconPlaceTop
							/>
						</div>

						<PrimaryInput
							onClickCallback={(e: any) => {
								setOpenDateModal(true);
							}}
							suffix={
								<button
									className="absolute top-1/2 right-4 -translate-y-[50%] ml-4 flex"
									onClick={() => {
										setOpenDateModal(true);
									}}
								>
									<span className="cursor-pointer text-[24px] text-textColorGray pr-1">
										<CalenderIcon />
									</span>
								</button>
							}
							inputMode="none"
							form={form}
							field="display_date"
							placeholder={{
								main: "Cancellation date ",
							}}
							onBlur={(e, setInFocus) => {
								setInFocus(true);
							}}
							prefix={""}
						/>

						{/* <label>{details.created_at}</label> */}
						{openDateModal && (
							<CalendarModal
								closeModalCallback={(date: Date) => {
									form.setField(
										"date_of_transaction",
										moment(date).format("YYYY-MM-DD"),
									);
									form.setField(
										"display_date",
										moment(date).format("DD MMM 'YY"),
									);
									setOpenDateModal(false);
								}}
								outsideClickCallback={() => {
									setOpenDateModal(false);
								}}
								date={form.getField("date_of_transaction")}
								minDate={new Date(details.created_at)}
								maxDate={
									new Date() < new Date(details.maturity_date)
										? new Date()
										: new Date(details.maturity_date)
								}
							/>
						)}

						<PrimaryInput
							suffix={
								<button
									className="absolute top-1/2 right-4 -translate-y-[50%] ml-4 flex"
									onClick={() =>
										showInfoModal({ content: INFODETAILS, web: true })
									}
								>
									<span className="cursor-pointer text-[24px] text-textColorGray pr-1">
										<IIcon color={"#717171"} />
									</span>
								</button>
							}
							form={form}
							field="cash_rate"
							fieldType={"number"}
							inputMode="decimal"
							placeholder={{
								main: "Cancellation rate ",
								subString: form.getField("cash_rate_currency")
									? `e.g:  ${
											getCurrencySymbol(form.getField("cash_rate_currency")) ||
											form.getField("cash_rate_currency")
									  } 86.70`
									: "e.g: $500,000",
							}}
							prefix={
								getCurrencySymbol(form.getField("cash_rate_currency"))
									? getCurrencySymbol(form.getField("cash_rate_currency"))
									: form.getField("cash_rate_currency")
							}
						/>
					</div>
					<div
						className={`shadow-boxShadow h-fit py-3 px-4 flex bg-white shadow-style-chooser gap-x-5 items-center justify-center w-full m-auto `}
					>
						<PrimaryButton
							className="disabled:hover:bg-semiLightGray"
							disabled={disabled}
							onClick={() => handleHedgeCancel()}
							buttonText="Save"
						/>
					</div>
				</div>
			}
			loadingText="Saving.."
		/>
	);
};

export default CancelHedge;
