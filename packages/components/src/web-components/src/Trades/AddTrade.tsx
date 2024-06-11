import {
	Header,
	TradeTypeCard,
	CurrencyInput,
	UnderlineButton,
	PrimaryButton,
	PrimaryInput,
	Loader,
} from "components";
import React, { useEffect, useState } from "react";
import { useBetaForm as useBetaForm } from "@locoworks/reusejs-toolkit-react-hooks";
import { getCurrencySymbol } from "services/fx/getCurrencySymbol";
import { ChevronDown, ChevronUp, IIcon } from "icons";
import { createTrade, getLedgersDetails, useModalNavigation } from "services";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setPortfolioTrades, setToastMessage } from "store";
import CalendarModal from "../Support/CalendarModal";
import showSelectCurrencyPairModal from "../Modals/SelectCurrencyPairModal";
import showInfoModal from "../Modals/InfoModal";
import moment from "moment";
import { setTradeCount } from "store/web-src/src/forexEntityCountSlice";
import { UPDATETRADEINFO as ADDTRADEINFO } from "utils";

const AddTrade = () => {
	// const [showSelectCurrencyPair, setShowSelectCurrencyPair] = useState(false);
	const [showCounterPartyFields, setShowCounterPartyFields] = useState(false);
	const [openDateModal, setOpenDateModal] = useState(false);
	const [disabled, setDisabled] = useState(true);
	useState(false);
	const [isLoading, setIsLoading] = useState("");
	const { ledgerId } = useParams();
	const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
	const dispatch = useDispatch();
	const { closeModalScreen, switchModalScreen } = useModalNavigation();

	const { id, name } = useSelector((state: any) => {
		const value = state?.ledgerInfo?.ledgerDetails;
		return { id: value.id, name: value.dump.name };
	});
	const [ledgerName, setLedgerName] = useState(name);

	const { tradeCount } = useSelector((state: any) => {
		return state.forexEntityCountSlice;
	});

	const getDetails = async () => {
		try {
			setIsLoading("getDetails");
			if (ledgerId == id) {
				setLedgerName(name);
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

	const validateForm = () => {
		if (
			isNaN(form.value.trade_amount.replaceAll(",", "")) ||
			isNaN(form.value.benchmark_rate.replaceAll(",", ""))
		) {
			return false;
		}
		return true;
	};

	const handleTradeSave = async () => {
		form.value.trade_amount = form.value.trade_amount.replace(/,/g, "");
		form.value.benchmark_rate = form.value.benchmark_rate.replace(/,/g, "");
		const payload = form.value;
		if (validateForm()) {
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
				const refreshToken = JSON.stringify(new Date());
				dispatch(setPortfolioTrades(refreshToken));
				switchModalScreen(`trade/${tradeId}`);
			} catch (error) {
				console.log(error);
			} finally {
				dispatch(setTradeCount(parseInt(tradeCount) + 1));
				setIsLoading("");
			}
		} else {
			alert("Please Enter a valid value for trade amount and benchmarkrates");
		}
	};

	useEffect(() => {
		if (
			form.getField("ledger_id") &&
			form.getField("currency_pair") &&
			form.getField("trade_type") &&
			form.getField("maturity_date") &&
			form.getField("benchmark_rate") &&
			+form.getField("trade_amount") !== 0
		) {
			setDisabled(false);
		} else {
			setDisabled(true);
		}
	}, [
		form.getField("ledger_id"),
		form.getField("currency_pair"),
		form.getField("trade_amount"),
		form.getField("trade_type"),
		form.getField("maturity_date"),
		form.getField("benchmark_rate"),
	]);

	useEffect(() => {
		form.value.trade_amount = form.value.trade_amount.replace(/,/g, "");
		form.value.benchmark_rate = form.value.benchmark_rate.replace(/,/g, "");
	}, [form.value.trade_amount, form.value.benchmark_rate]);

	return (
		<Loader
			isLoading={isLoading !== "" ? true : false}
			successComponent={
				<div className="relative pt-4 bg-white flex flex-col h-full overflow-y-hidden">
					<Header
						className="flex items-center justify-between px-4 pb-2 border-b-semiLightGray border-b "
						displayTitle={<>Add trade</>}
						displaySubTitle={ledgerName}
						showEditIcon={false}
						backAction={() => {
							closeModalScreen();
						}}
					/>
					{/* this padding is added for the absolutely placed item + bottom padding of the item */}
					<div className="flex flex-col px-5 py-4 gap-y-4 flex-1 overflow-y-scroll ">
						<TradeTypeCard setOpenDateModal={setOpenDateModal} form={form} />
						{openDateModal && (
							<CalendarModal
								closeModalCallback={(date: Date) => {
									setOpenDateModal(false);
									form.setField(
										"maturity_date",
										moment(date).format("YYYY-MM-DD"),
									);
								}}
								minDate={new Date()}
								outsideClickCallback={() => {
									setOpenDateModal(false);
								}}
								date={form.getField("maturity_date")}
							/>
						)}
						<CurrencyInput
							setShowSelectCurrencyPair={async () => {
								await showSelectCurrencyPairModal({
									form: form,
								});
							}}
							form={form}
						/>
						<PrimaryInput
							suffix={
								<button
									className="absolute top-1/2 right-4 -translate-y-[50%] ml-4 flex"
									onClick={() =>
										showInfoModal({ content: ADDTRADEINFO, web: true })
									}
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
								getCurrencySymbol(form.getField("currency_pair").split("/")[0])
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
							numberOnly
						/>

						<PrimaryInput
							suffix={
								<button
									className="absolute top-1/2 right-4 -translate-y-[50%] ml-4 flex"
									onClick={() =>
										showInfoModal({ content: ADDTRADEINFO, web: true })
									}
								>
									<span className="cursor-pointer text-[24px] text-[#717171] pr-1">
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
								getCurrencySymbol(form.getField("currency_pair").split("/")[1])
									? getCurrencySymbol(
											form.getField("currency_pair").split("/")[1],
									  )
									: form.getField("currency_pair").split("/")[1]
							}
							disabled={!form.getField("currency_pair")}
							numberOnly
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
									"flex flex-col gap-y-4 transition-all duration-700" +
									(showCounterPartyFields ? "" : "hidden opacity-0")
								}
							>
								<PrimaryInput
									form={form}
									field="cp_invoice_number"
									onChange={(e) => {
										form.setField("cp_invoice_number", e.target.value);
									}}
									placeholder={{ main: "Add invoice number (optional)" }}
									suffix={
										<button
											className="absolute top-1/2 right-4 -translate-y-[50%] ml-4 flex"
											onClick={() =>
												showInfoModal({ content: ADDTRADEINFO, web: true })
											}
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
									onChange={(e) => {
										form.setField("bank_name", e.target.value);
									}}
									placeholder={{ main: "Add bank name (optional)" }}
								/>

								<PrimaryInput
									form={form}
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
											onClick={() =>
												showInfoModal({ content: ADDTRADEINFO, web: true })
											}
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
								closeModalScreen();
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
