import React, { useEffect, useState } from "react";
import SearchCurrencyPair from "../../Components/SelectCurrencyPair";
import { useBetaForm as useBetaForm } from "@locoworks/reusejs-toolkit-react-hooks";
import { getCurrencySymbol } from "services/fx/getCurrencySymbol";
import { IIcon, CalenderIcon } from "icons";
import { useNavigate, useParams } from "react-router-dom";
import {
	Loader,
	InfoModal,
	WarningBanner,
	CancelHedgeCalendarModal,
	Header,
	PrimaryButton,
	PrimaryInput,
} from "components";
import { useHedge, overrideCalendarStyles } from "services";
import moment from "moment";
import { USEHEDGEINFO, checkDate, formatNumberWithCommas } from "utils";
import { useSelector } from "react-redux";

const UseHedge: React.FC = ({}) => {
	const { hedgeId } = useParams();
	const navigate = useNavigate();

	const [loadText, setLoadText] = useState("");
	const [disabled, setDisabled] = useState(true);
	const [dateObj, setDateObj] = useState(Date());
	const [details, setDetails] = useState<any>({});
	const [isLoading, setIsLoading] = useState(false);
	const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
	const [showSelectCurrencyPair, setShowSelectCurrencyPair] = useState(false);
	const [runOverrideCalendarStyles, setRunOverrideCalendarStyles] =
		useState(false);

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
		type: "transaction_via_use_hedge",
		date_of_transaction: "",
		benchmark_rate: "",
		benchmark_rate_currency: "",
		display_date: "",
	});

	const handleHedgeUse = async () => {
		try {
			setLoadText("Saving..");
			setIsLoading(true);
			const payload = {
				amount: form.getField("amount").replace(/,/g, ""),
				hedge_uuid: form.getField("hedge_uuid"),
				amount_currency: form.getField("amount_currency"),
				type: form.getField("type"),
				date_of_transaction: form.getField("date_of_transaction"),
				transaction_data: {
					hedge_rate: details.hedged_rates,
					hedge_rate_currency: details.quote_currency,
				},
			};
			await useHedge(payload);
			navigate(`/hedge/${hedgeId}`);
		} catch (error) {
			console.log("Error while using hedge", error);
			throw error;
		} finally {
			setIsLoading(false);
		}
	};

	const init = async () => {
		try {
			setIsLoading(true);
			setDetails(hedge);
			form.setField("amount_currency", hedge.base_currency);
			form.setField("benchmark_rate_currency", hedge.quote_currency);
		} catch (error) {
			console.log("Error Initialising Use Hedge form :", error);
			throw error;
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		if (
			+form.value.amount.replace(/,/g, "") <= +details.unlinked_amount &&
			form.getField("amount") &&
			form.getField("date_of_transaction")
		) {
			setDisabled(false);
		} else {
			setDisabled(true);
		}
	}, [form]);

	useEffect(() => {
		let max =
			new Date() < new Date(details.maturity_date)
				? new Date()
				: new Date(details.maturity_date);
		overrideCalendarStyles({
			minDate: new Date(details.created_at),
			maxDate: max,
		});
	}, [form.getField("maturity_date"), runOverrideCalendarStyles, dateObj]);

	const showInfoModal = async () => {
		await InfoModal({
			fillContent: USEHEDGEINFO,
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
							className="flex items-center justify-between px-4 pb-2 border-b-semiLightGray border-b "
							displayTitle={<>Use hedge</>}
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
								label={"Missing hedge information"}
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
						<div className="flex  flex-col mx-5 mt-5 gap-y-4 pb-[76px] flex-1 overflow-y-scroll ">
							<div>
								<PrimaryInput
									suffix={
										<button
											className="absolute top-1/2 right-4 -translate-y-[50%] ml-4 flex"
											onClick={() => showInfoModal()}
										>
											<span className="cursor-pointer text-[24px] text-[#717171] pr-1">
												<IIcon color={"#717171"} />
											</span>
										</button>
									}
									form={form}
									field="amount"
									fieldType={"number"}
									inputMode="decimal"
									placeholder={{
										main: "Utilisation amount ",
										subString: form.getField("amount_currency")
											? `e.g:  ${
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
										+form.value.amount.replace(/,/g, "") >
										+details.unlinked_amount
											? "Amount to be utilised cannot be greater than the unlinked Hedge amount"
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
										<span
											onClick={() => console.log("suffix clicked")}
											className="cursor-pointer text-[24px] text-[#717171] pr-1"
										>
											<CalenderIcon />
										</span>
									</button>
								}
								onBlur={(e, setInFocus) => {
									setInFocus(true);
								}}
								form={form}
								field="display_date"
								placeholder={{
									main: "Utilisation date ",
								}}
								prefix={""}
								inputMode="none"
							/>
						</div>
					</div>

					<div
						className={`shadow-boxShadow fixed bottom-0 left-0 right-0 h-fit py-3 px-4 flex bg-white  shadow-style-chooser gap-x-5 items-center justify-center md:w-1/3 m-auto ${
							isKeyboardOpen ? "pb-[30px]" : ""
						}`}
					>
						<PrimaryButton
							className="disabled:hover:bg-semiLightGray"
							disabled={disabled}
							onClick={() => handleHedgeUse()}
							buttonText="Save"
						/>
					</div>
				</>
			}
			loadingText={loadText ? loadText : ""}
		/>
	);
};

export default UseHedge;
