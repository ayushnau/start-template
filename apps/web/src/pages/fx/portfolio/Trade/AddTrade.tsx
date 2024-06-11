import {
	Header,
	CurrencyInput,
	UnderlineButton,
	PrimaryButton,
	PrimaryInput,
	CalendarModal,
	TypesCard,
} from "components";
import React, { useEffect, useState, useRef } from "react";
import SearchCurrencyPair from "../../Components/SelectCurrencyPair";
import { useBetaForm as useBetaForm } from "@locoworks/reusejs-toolkit-react-hooks";
import { getCurrencySymbol } from "services/fx/getCurrencySymbol";
import { ChevronDown, ChevronUp, IIcon } from "icons";
import { useParams } from "react-router-dom";
import moment from "moment";
import {
	createTrade,
	getLedgersDetails,
	overrideCalendarStyles,
} from "services";
import { useNavigate } from "react-router-dom";
import { Loader, InfoModal } from "components";
import { useDispatch, useSelector } from "react-redux";
import { setToastMessage } from "store";
import { UPDATETRADEINFO as ADDTRADEINFO } from "utils";

const AddTrade = () => {
	const [showSelectCurrencyPair, setShowSelectCurrencyPair] = useState(false);
	const [showCounterPartyFields, setShowCounterPartyFields] = useState(false);
	const [disabled, setDisabled] = useState(true);
	const [runOverrideCalendarStyles, setRunOverrideCalendarStyles] =
		useState(false);
	const [isLoading, setIsLoading] = useState("");
	const navigate = useNavigate();
	const [dateObj, setDateObj] = useState(Date());
	const { ledgerId } = useParams();
	const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
	const [ledgerName, setLedgerName] = useState("");
	const dispatch = useDispatch();
	const ledger = useSelector((state: any) => state?.ledgerInfo?.ledgerDetails);

	const getDetails = async () => {
		try {
			setIsLoading("getDetails");
			if (ledger && ledger.id == ledgerId) {
				setLedgerName(ledger.dump.name);
			} else {
				const response: any = await getLedgersDetails(ledgerId);
				if (response.sucess && response.workbook.dump.name) {
					setLedgerName(response.workbook.dump.name);
				}
			}
		} catch (error) {
			console.log("Error fetching Details");
		} finally {
			setIsLoading("");
		}
	};

	useEffect(() => {
		getDetails();
	}, []);

	useEffect(() => {
		setIsKeyboardOpen(window.innerHeight < window.outerHeight);
	}, [isKeyboardOpen]);

	const form = useBetaForm({
		ledger_id: ledgerId,
		currency_pair: "",
		trade_amount: "",
		trade_type: "",
		maturity_date: "",
		benchmark_rate: "",
		cp_invoice_number: "",
		bank_name: "",
		cp_name: "",
	});

	const handleTradeSave = async () => {
		form.value.trade_amount = form.value.trade_amount.replace(/,/g, "");
		form.value.benchmark_rate = form.value.benchmark_rate.replace(/,/g, "");
		const payload = form.value;
		try {
			setIsLoading("Save");
			const response: any = await createTrade(payload);
			const tradeId = response?.trade;
			dispatch(
				setToastMessage({
					message: `Trade added!`,
					type: "neutral",
				}),
			);
			navigate(`/ledger/${ledgerId}/trade/${tradeId}`);
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading("");
		}
	};
	useEffect(() => {
		if (
			form.getField("ledger_id") &&
			form.getField("currency_pair") &&
			form.getField("trade_amount") &&
			form.getField("trade_type") &&
			form.getField("maturity_date") &&
			form.getField("benchmark_rate") &&
			+form.getField("trade_amount") !== 0
		) {
			setDisabled(false);
		} else {
			setDisabled(true);
		}
	}, [form]);

	useEffect(() => {
		form.value.trade_amount = form.value.trade_amount.replace(/,/g, "");
		form.value.benchmark_rate = form.value.benchmark_rate.replace(/,/g, "");
	}, [form.value.trade_amount, form.value.benchmark_rate]);

	const showInfoModal = async () => {
		await InfoModal({
			fillContent: ADDTRADEINFO,
		});
	};

	useEffect(() => {
		overrideCalendarStyles({
			minDate: moment().add(1, "day"),
			maxDate: moment().add(1, "year"),
		});
	}, [dateObj, form.getField("maturity_date"), runOverrideCalendarStyles]);

	const showCalendarModal = async () => {
		//TODO: This calender modal seems similar to another made for use and cancel hedge. Both can be merged in one
		await CalendarModal({
			details: {
				setDateObj: setDateObj,
				form: form,
				minDate: moment().add(1, "day"),
				maxDate: moment().add(1, "year"),
				setRunOverrideCalendarStyles: setRunOverrideCalendarStyles,
				dateObj: dateObj,
			},
		});
	};
	const scrollRef = useRef<any>(null);
	return (
		<Loader
			isLoading={isLoading !== "" ? true : false}
			successComponent={
				<>
					{showSelectCurrencyPair ? (
						<div className="h-[100vh] overflow-scroll absolute right-0 left-0 bottom-0 top-0 z-50 bg-white">
							<SearchCurrencyPair
								setSelectedCurrencyFlagPair={(item: any) => {
									form.setField("currency_pair", item.pair);
								}}
								selectedCurrencyFlagPair={form?.value?.currency_pair || ""}
								setShowSelectCurrencyPair={setShowSelectCurrencyPair}
							/>
						</div>
					) : (
						<></>
					)}

					<div className="relative pt-4 bg-white flex flex-col h-full overflow-y-hidden">
						<Header
							className="flex items-center justify-between px-4 pb-2 border-b-semiLightGray border-b "
							displayTitle={<>Add trade</>}
							displaySubTitle={ledgerName}
							showEditIcon={false}
							backAction={() => {
								navigate(-1);
							}}
						/>
						{/* this padding is added for the absolutely placed item + bottom padding of the item */}
						<div
							ref={scrollRef}
							className="flex flex-col px-5 py-4 gap-y-4 pb-[86px] flex-1 overflow-y-scroll "
						>
							<TypesCard
								typesCard="trade"
								setOpenDateModal={showCalendarModal}
								form={form}
							/>
							<CurrencyInput
								setShowSelectCurrencyPair={setShowSelectCurrencyPair}
								form={form}
							/>
							<PrimaryInput
								suffix={
									<button
										className="absolute top-1/2 right-4 -translate-y-[50%] ml-4 flex"
										onClick={() => showInfoModal()}
									>
										<span
											onClick={() => console.log("suffix clicked")}
											className="cursor-pointer text-[24px] text-[#717171] pr-1"
										>
											<IIcon color={"#717171"} />
										</span>
									</button>
								}
								form={form}
								field="trade_amount"
								fieldType={"number"}
								inputMode="decimal"
								placeholder={{
									main: "Invoice value ",
									subString: form.getField("currency_pair").split("/")[0]
										? `e.g:  ${
												getCurrencySymbol(
													form.getField("currency_pair").split("/")[0],
												) || form.getField("currency_pair").split("/")[0]
										  } 500,00`
										: "e.g: $500,000",
								}}
								prefix={
									getCurrencySymbol(
										form.getField("currency_pair").split("/")[0],
									)
										? getCurrencySymbol(
												form.getField("currency_pair").split("/")[0],
										  )
										: form.getField("currency_pair").split("/")[0]
								}
								disabled={!form.getField("currency_pair")}
								onClickCallback={(e: any) => {
									if (!form.getField("currency_pair")) {
										alert("Please select the currency flag first");
									}
								}}
							/>

							<PrimaryInput
								suffix={
									<button
										className="absolute top-1/2 right-4 -translate-y-[50%] ml-4 flex"
										onClick={() => showInfoModal()}
									>
										<span
											onClick={() => console.log("suffix clicked")}
											className="cursor-pointer text-[24px] text-[#717171] pr-1"
										>
											<IIcon color={"#717171"} />
										</span>
									</button>
								}
								form={form}
								field="benchmark_rate"
								fieldType={"number"}
								inputMode="decimal"
								placeholder={{
									main: "Benchmark rate ",
									subString: form.getField("currency_pair").split("/")[1]
										? `e.g: ${
												getCurrencySymbol(
													form.getField("currency_pair").split("/")[1],
												) || form.getField("currency_pair").split("/")[1]
										  } 82.70`
										: "e.g: ₹82.70 ",
								}}
								prefix={
									getCurrencySymbol(
										form.getField("currency_pair").split("/")[1],
									)
										? getCurrencySymbol(
												form.getField("currency_pair").split("/")[1],
										  )
										: form.getField("currency_pair").split("/")[1]
								}
								disabled={!form.getField("currency_pair")}
							/>
							<div className="border-b-[1px] w-full border-mine-shaft-2 pt-2" />
							<div
								className="py-2 flex justify-between"
								onClick={() => {
									setShowCounterPartyFields(!showCounterPartyFields);
								}}
							>
								<label>Add counterparty details</label>
								<span>
									{showCounterPartyFields ? <ChevronUp /> : <ChevronDown />}
								</span>
							</div>
							{showCounterPartyFields ? (
								<div
									className={
										"flex flex-col gap-y-4 pb-10 transition-all duration-700" +
										(showCounterPartyFields ? "" : "hidden opacity-0")
									}
								>
									<PrimaryInput
										form={form}
										onClickCallback={(e: any) => {
											const targetElement = scrollRef.current;
											if (targetElement !== null)
												targetElement.scrollTo({
													top: targetElement.clientHeight,
													behavior: "smooth",
												});
										}}
										field="cp_invoice_number"
										onChange={(e) => {
											form.setField("cp_invoice_number", e.target.value);
										}}
										placeholder={{ main: "Add invoice number (optional)" }}
										suffix={
											<button
												className="absolute top-1/2 right-4 -translate-y-[50%] ml-4 flex"
												onClick={() => showInfoModal()}
											>
												<span
													onClick={() => {}}
													className="cursor-pointer text-[24px] text-[#717171] pr-1"
												>
													<IIcon color={"#717171"} />
												</span>
											</button>
										}
									/>

									<PrimaryInput
										form={form}
										field="bank_name"
										onClickCallback={(e: any) => {
											const targetElement = scrollRef.current;
											if (targetElement !== null)
												targetElement.scrollTo({
													top: targetElement.clientHeight,
													behavior: "smooth",
												});
										}}
										onChange={(e) => {
											form.setField("bank_name", e.target.value);
										}}
										placeholder={{ main: "Add bank name (optional)" }}
									/>

									<PrimaryInput
										form={form}
										onClickCallback={(e: any) => {
											const targetElement = scrollRef.current;
											if (targetElement !== null)
												targetElement.scrollTo({
													top: targetElement.clientHeight,
													behavior: "smooth",
												});
										}}
										field="cp_name"
										onChange={(e) => {
											form.setField("cp_name", e.target.value);
										}}
										placeholder={{
											main: "Add counter party name (optional)",
										}}
										suffix={
											<button
												className="absolute top-1/2 right-4 -translate-y-[50%] ml-4 flex"
												onClick={() => showInfoModal()}
											>
												<span
													onClick={() => {}}
													className="cursor-pointer text-[24px] text-[#717171] pr-1"
												>
													<IIcon color={"#717171"} />
												</span>
											</button>
										}
									/>
								</div>
							) : (
								<></>
							)}
						</div>
						<div className="shadow-boxShadow sticky bottom-0 left-0 right-0 h-fit py-3 px-4 flex bg-white shadow-style-chooser gap-x-5 items-center justify-center">
							<UnderlineButton
								onClick={() => {
									navigate(-1);
								}}
								buttonText="Cancel"
							/>
							<PrimaryButton
								className="disabled:hover:bg-semiLightGray"
								disabled={disabled}
								onClick={() => handleTradeSave()}
								buttonText="Save"
							/>
						</div>
					</div>
				</>
			}
			loadingText={
				isLoading !== "" && isLoading === "getDetails"
					? ""
					: isLoading !== "" && isLoading === "Save"
					? "Saving.."
					: ""
			}
		/>
	);
};

export default AddTrade;
