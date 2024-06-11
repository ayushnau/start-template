import {
	Header,
	PrimaryButton,
	PrimaryInput,
	WarningBanner,
	CancelHedgeCalendarModal,
} from "components";
import React, { useEffect, useState } from "react";
import SearchCurrencyPair from "../../Components/SelectCurrencyPair";
import { useBetaForm as useBetaForm } from "@locoworks/reusejs-toolkit-react-hooks";
import { getCurrencySymbol } from "services/fx/getCurrencySymbol";
import moment from "moment";
import { useNavigate, useParams } from "react-router-dom";
import { Loader, InfoModal } from "components";
import { useDispatch, useSelector } from "react-redux";
import { setToastMessage } from "store";
import { cancelHedge, overrideCalendarStyles } from "services";
import { CalenderIcon, IIcon } from "icons";
import { checkDate, formatNumberWithCommas, CANCELHEDGEINFO } from "utils";

const CancelHedge = () => {
	const [showSelectCurrencyPair, setShowSelectCurrencyPair] = useState(false);
	const [disabled, setDisabled] = useState(true);
	const [runOverrideCalendarStyles, setRunOverrideCalendarStyles] =
		useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();
	const [dateObj, setDateObj] = useState(Date());
	const { hedgeId } = useParams();
	const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
	const [details, setDetails] = useState<any>({});
	const dispatch = useDispatch();
	const hedge = useSelector((state: any) => {
		if (hedgeId) {
			return state?.portfolioHedgesList?.hedgeList[hedgeId];
		}
	});

	useEffect(() => {
		init();
	}, []);

	useEffect(() => {
		setIsKeyboardOpen(window.innerHeight < window.outerHeight);
	}, [isKeyboardOpen]);

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
			await cancelHedge(payload);
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
			navigate(`/hedge/${hedgeId}`);
		}
	};

	const init = async () => {
		try {
			setIsLoading(true);
			setDetails(hedge);
			form.setField("amount_currency", hedge.base_currency);
			form.setField("cash_rate_currency", hedge.quote_currency);
		} catch (error) {
			console.log("Error Initiating Cancel Hedge Form: ", error);
			throw error;
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
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
	}, [form]);

	useEffect(() => {
		overrideCalendarStyles({});
	}, [form.getField("maturity_date"), runOverrideCalendarStyles, dateObj]);

	useEffect(() => {
		form.value.amount = form.value.amount.replace(/,/g, "");
		form.value.cash_rate = form.value.cash_rate.replace(/,/g, "");
	}, [form.value.amount, form.value.cash_rate]);

	const showInfoModal = async () => {
		await InfoModal({
			fillContent: CANCELHEDGEINFO,
		});
	};

	const showCalendarModal = async () => {
		await CancelHedgeCalendarModal({
			details: {
				setDateObj: setDateObj,
				form: form,
				setRunOverrideCalendarStyles: setRunOverrideCalendarStyles,
				dateObj: dateObj,
				minDate: new Date(details.created_at),
				maxDate:
					new Date() < new Date(details.maturity_date)
						? new Date()
						: new Date(details.maturity_date),
			},
		});
	};

	return (
		<Loader
			isLoading={isLoading}
			successComponent={
				<>
					{showSelectCurrencyPair ? (
						<div className="h-[100vh] overflow-scroll absolute right-0 left-0 bottom-0 top-0 z-50 bg-white">
							<SearchCurrencyPair
								setSelectedCurrencyFlagPair={(item: any) => {
									form.setField("currency_pair", item.pair);
								}}
								setShowSelectCurrencyPair={setShowSelectCurrencyPair}
							/>
						</div>
					) : (
						<></>
					)}

					<div className="relative py-4 bg-white flex flex-col h-full overflow-y-hidden">
						<Header
							className="flex items-center justify-between px-4 pb-4 border-b-semiLightGray border-b "
							displayTitle="Cancel hedge"
							showEditIcon={false}
							backAction={() => {
								navigate(-1);
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
											onClick={() => showInfoModal()}
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
									showCalendarModal();
								}}
								suffix={
									<button
										className="absolute top-1/2 right-4 -translate-y-[50%] ml-4 flex"
										onClick={() => showCalendarModal()}
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

							<PrimaryInput
								suffix={
									<button
										className="absolute top-1/2 right-4 -translate-y-[50%] ml-4 flex"
										onClick={() => showInfoModal()}
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
												getCurrencySymbol(
													form.getField("cash_rate_currency"),
												) || form.getField("cash_rate_currency")
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
					</div>

					<div
						className={`shadow-boxShadow fixed bottom-0 left-0 right-0 h-fit py-3 px-4 flex bg-white shadow-style-chooser gap-x-5 items-center justify-center md:w-1/3 m-auto ${
							isKeyboardOpen ? "pb-[30px]" : ""
						}`}
					>
						<PrimaryButton
							className="disabled:hover:bg-semiLightGray"
							disabled={disabled}
							onClick={() => handleHedgeCancel()}
							buttonText="Save"
						/>
					</div>
				</>
			}
			loadingText="Saving.."
		/>
	);
};

export default CancelHedge;
