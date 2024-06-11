import {
	Header,
	CurrencyInput,
	Loader,
	PrimaryInput,
	PrimaryButton,
	SecondaryButton,
	showDeleteConfirmationModal,
	TypesCard,
} from "components";
import React, { useEffect, useState } from "react";
import { useBetaForm as useBetaForm } from "@locoworks/reusejs-toolkit-react-hooks";
import { getCurrencySymbol } from "services/fx/getCurrencySymbol";
import { ChevronDown, ChevronUp, IIcon } from "icons";
import { useParams } from "react-router-dom";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import {
	StoreState,
	setPortfolioModal,
	setPortfolioTrades,
	setToastMessage,
	updatePortfolioTradeSpecificRecord,
} from "store";
import {
	overrideCalendarStyles,
	updateTrade,
	getTradeDetails,
	deleteTrade,
	useModalNavigation,
} from "services";
import { useNavigate } from "react-router-dom";
import { getLedgersDetails } from "services";
import CalendarModal from "../Support/CalendarModal";
import showInfoModal from "../Modals/InfoModal";
import { setTradeCount } from "store/web-src/src/forexEntityCountSlice";
import { UPDATETRADEINFO, dateCorrection } from "utils";

const formatNumberWithCommas = (number: any): string => {
	if (number !== undefined) {
		const parts = number.toString().split(".");
		parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		return parts.join(".");
	}
	return "";
};

const UpdateTrade = () => {
	const [tradeData, setTradeData] = useState<any>();
	const [showCounterPartyFields, setShowCounterPartyFields] = useState(false);
	const [openDateModal, setOpenDateModal] = useState(false);
	const dispatch = useDispatch();
	const [runOverrideCalendarStyles, setRunOverrideCalendarStyles] =
		useState(false);
	const navigate = useNavigate();
	const [dateObj, setDateObj] = useState(Date());
	const { ledgerId, tradeId } = useParams();
	const [isLoading, setLoading] = useState(true);
	const [loadingFor, setLoadingFor] = useState("");
	const [LedgerName, setLedgerName] = useState("");
	const [disabled, setDisabled] = useState(true);
	const [error, setError] = useState(false);
	const [isEditing, setIsEditing] = useState(false);
	const { switchModalScreen, closeModalScreen } = useModalNavigation();

	const { tradeCount } = useSelector((state: StoreState) => {
		return state.forexEntityCountSlice;
	});

	const { id, name } = useSelector((state: any) => {
		const value = state?.ledgerInfo?.ledgerDetails;
		return { id: value.id, name: value.dump.name };
	});

	const init = async () => {
		const result: any = await getTradeDetails(tradeId);
		setTradeData(result.trade);
		form.value.currency_pair = result.trade.currency_pair;
		form.value.trade_amount = result.trade.trade_amount;
		form.value.trade_type = result.trade.trade_type;
		form.value.maturity_date = dateCorrection(result.trade.maturity_date);
		form.value.benchmark_rate = result.trade.benchmark_rate;
		form.value.uuid = result.trade.uuid;
		form.value.cp_invoice_number = result.trade.cp_invoice_number;
		form.value.bank_name = result.trade.bank_name || "";
		form.value.cp_name = result.trade.cp_name;

		await getDetails();
		setDisabled(false);
		if (form.value.cp_invoice_number || form.value.cp_name) {
			setShowCounterPartyFields(true);
		}
		setLoading(false);
	};

	const getDetails = async () => {
		try {
			if (ledgerId == id) {
				setLedgerName(name);
			} else {
				setLoading(true);
				const response: any = await getLedgersDetails(ledgerId);
				if (response.sucess && response.workbook.dump.name) {
					setLedgerName(response.workbook.dump.name);
				}
			}
		} catch (error) {
			console.log("Error fetching Details");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		init();
	}, []);

	const deleteCallBackFunction = async () => {
		try {
			setLoadingFor("delete");
			setLoading(true);
			deleteTrade(tradeId);
			dispatch(
				setToastMessage({
					message: `Trade Deleted!`,
					type: "neutral",
				}),
			);
			dispatch(setPortfolioModal({ displayModalScreen: false }));
			navigate(`/fx-home/portfolio/ledger/${ledgerId}`);
		} catch (error) {
			console.log(error);
		} finally {
			dispatch(setTradeCount(tradeCount - 1));
			setLoading(false);
		}
	};

	const handleDeleteLedger = async () => {
		const result = await showDeleteConfirmationModal({
			title: "Delete trade?",
			description: "All the details of this trade will be removed permanently.",
			callbackYes: deleteCallBackFunction,
			makeModalFull: false,
			web: true,
		});
		if (result) {
			const refreshToken = JSON.stringify(new Date());
			dispatch(setPortfolioTrades(refreshToken));
		}
	};

	const form = useBetaForm({
		ledger_id: ledgerId,
		currency_pair: "",
		trade_amount: "",
		trade_type: "",
		maturity_date: "",
		benchmark_rate: "",
		uuid: "",
		cp_invoice_number: "",
		bank_name: "",
		cp_name: "",
	});

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
	}, [form.value]);

	useEffect(() => {
		if (
			+form.value.trade_amount <
				+tradeData?.hedged_amount + +tradeData?.paid_amount ||
			+form.value.trade_amount === 0
		) {
			if (+form.value.trade_amount !== 0) setError(true);
			setDisabled(true);
		} else {
			setDisabled(false);
			setError(false);
		}
	}, [form.value.trade_amount]);

	const handleTradeUpdate = async () => {
		setLoadingFor("update");
		form.value.trade_amount = form.value.trade_amount.replace(/,/g, "");
		form.value.benchmark_rate = form.value.benchmark_rate.replace(/,/g, "");
		const payload = form.value;
		try {
			setLoading(true);
			const response: any = await updateTrade(payload, form.value.uuid);
			const id = response?.trade_id;
			dispatch(updatePortfolioTradeSpecificRecord(response?.trade));
			// const refreshToken = JSON.stringify(new Date());
			// dispatch(setPortfolioTrades(refreshToken));
			dispatch(
				setToastMessage({
					message: `Trade Updated!`,
					type: "neutral",
				}),
			);
			navigate(`/fx-home/portfolio/ledger/${ledgerId}/trade/${id}`, {
				state: { secondTab: "ledger" },
			});
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		if (openDateModal === true) {
			overrideCalendarStyles({
				minDate: moment().add(1, "day"),
				maxDate: moment().add(1, "year"),
			});
		}
	}, [openDateModal, form.getField("date"), runOverrideCalendarStyles]);

	return (
		<Loader
			isLoading={isLoading}
			successComponent={
				<div className="flex flex-col h-full">
					<div className="h-full relative py-4 overflow-y-scroll">
						<Header
							className="flex items-center justify-between px-4 pb-2 border-b-mine-shaft-2 border-b "
							displayTitle={<>Edit trade</>}
							displaySubTitle={LedgerName}
							showEditIcon={false}
							showDelete={true}
							backAction={() => {
								navigate(-1);
							}}
							deleteAction={() => {
								handleDeleteLedger();
							}}
						/>
						<div
							id="update-trade-form"
							className="flex flex-col mx-5 mt-5 gap-y-4 pb-[6px]"
						>
							<TypesCard
								typesCard="trade"
								setOpenDateModal={() => {
									setOpenDateModal(true);
								}}
								form={form}
								disabled
							/>
							{openDateModal && (
								<CalendarModal
									closeModalCallback={(date: Date) => {
										setOpenDateModal(false);
										form.setField(
											"maturity_date",
											moment(date).format("YYYY-MM-DD"),
										);
									}}
									date={form.getField("maturity_date")}
									outsideClickCallback={() => {
										setOpenDateModal(false);
									}}
								/>
							)}
							<CurrencyInput
								setShowSelectCurrencyPair={() => {}}
								form={form}
								disabled
							/>
							<div>
								<PrimaryInput
									suffix={
										<button
											className="absolute top-1/2 right-4 -translate-y-[50%] ml-4 flex"
											onClick={() =>
												showInfoModal({ content: UPDATETRADEINFO, web: true })
											}
										>
											<span
												onClick={() => console.log("suffix clicked")}
												className="cursor-pointer text-[24px] text-[#717171] pr-1 hover:bg-[#F3F3F3]"
											>
												<IIcon color={"#717171"} />
											</span>
										</button>
									}
									form={form}
									field="trade_amount"
									fieldType={"number"}
									value={
										isEditing
											? ""
											: formatNumberWithCommas(form.getField("trade_amount"))
									}
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
									onClickCallback={() => {
										if (!form.getField("currency_pair")) {
											alert("Please select the currency flag first");
										}
										setIsEditing(true);
									}}
									inputMode={"decimal"}
									errorMsg={
										error
											? "Invoice value cannot be less than the sum of the payment received and the hedges linked"
											: ""
									}
									errorWithIcon
									iconPlaceTop
								/>
							</div>

							<PrimaryInput
								suffix={
									<button
										className="absolute top-1/2 right-4 -translate-y-[50%] ml-4 flex"
										onClick={() => showInfoModal({ content: UPDATETRADEINFO })}
									>
										<span
											onClick={() => console.log("suffix clicked")}
											className="cursor-pointer text-[24px] text-[#717171] pr-1 hover:bg-[#F3F3F3]"
										>
											<IIcon color={"#717171"} />
										</span>
									</button>
								}
								form={form}
								field="benchmark_rate"
								fieldType={"number"}
								value={
									isEditing
										? ""
										: formatNumberWithCommas(form.getField("benchmark_rate"))
								}
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
								inputMode={"decimal"}
							/>

							<div className="border-b-[1px] w-full border-mine-shaft-2 pt-2" />
							<div
								className="mt-2 flex justify-between"
								onClick={() => {
									setShowCounterPartyFields(!showCounterPartyFields);
									setIsEditing(true);
								}}
							>
								<label>Counterparty details</label>
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
													showInfoModal({ content: UPDATETRADEINFO })
												}
											>
												<span
													onClick={() => {}}
													className="cursor-pointer text-[24px] text-mine-shaft-3 pr-1 hover:bg-[#F3F3F3]"
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
													showInfoModal({ content: UPDATETRADEINFO })
												}
											>
												<span
													onClick={() => {}}
													className="cursor-pointer text-[24px] text-mine-shaft-3 pr-1 hover:bg-[#F3F3F3]"
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
					</div>
					<div className="w-full h-fit py-3 px-4 flex bg-white shadow-style-chooser gap-x-5 items-center justify-center z-10">
						<SecondaryButton
							className="w-full bg-transparent underline text-black hover:font-bold border-none hover:bg-transparent"
							onClick={() => {
								navigate(-1);
							}}
							buttonText="Cancel"
						/>

						<PrimaryButton
							onClick={() => handleTradeUpdate()}
							className="w-full bg-cornflower-blue-2 text-white"
							buttonText="Save"
							disabled={disabled}
						/>
					</div>
				</div>
			}
			loadingText={
				loadingFor == ""
					? ""
					: loadingFor === "update"
					? "Updating.."
					: "Deleting.."
			}
		/>
	);
};

export default UpdateTrade;
