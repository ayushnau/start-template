import {
	Header,
	CurrencyInput,
	Loader,
	PrimaryInput,
	PrimaryButton,
	SecondaryButton,
	InfoModal,
	showDeleteConfirmationModal,
	TypesCard,
	CalendarModal,
} from "components";
import React, { useEffect, useState } from "react";
import SearchCurrencyPair from "../../Components/SelectCurrencyPair";
import { useBetaForm as useBetaForm } from "@locoworks/reusejs-toolkit-react-hooks";
import { getCurrencySymbol } from "services/fx/getCurrencySymbol";
import { ChevronDown, ChevronUp, IIcon } from "icons";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { setToastMessage } from "store";
import { overrideCalendarStyles, updateTrade, deleteTrade } from "services";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { UPDATETRADEINFO } from "utils";

const formatedDate = (date: any) => {
	return moment(date, "YYYY-MM-DD").format("YYYY-MM-DD");
};

const showInfoModal = async () => {
	await InfoModal({
		fillContent: UPDATETRADEINFO,
	});
};

const formatNumberWithCommas = (number: any): string => {
	if (number !== undefined) {
		const parts = number.toString().split(".");
		parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		return parts.join(".");
	}
	return "";
};

const UpdateTrade = () => {
	const [showSelectCurrencyPair, setShowSelectCurrencyPair] = useState(false);
	const [showCounterPartyFields, setShowCounterPartyFields] = useState(false);
	const [openDateModal, setOpenDateModal] = useState(false);
	const dispatch = useDispatch();
	const [error, setError] = useState(false);
	const [disabled, setDisabled] = useState(true);
	const [isLoading, setLoading] = useState(true);
	const [dateObj, setDateObj] = useState(Date());
	const [loadingFor, setLoadingFor] = useState("");
	const [LedgerName, setLedgerName] = useState("");
	const [isEditing, setIsEditing] = useState(false);
	const [runOverrideCalendarStyles, setRunOverrideCalendarStyles] =
		useState(false);

	const location = useLocation();
	const navigate = useNavigate();
	const { ledgerId, tradeId } = useParams();

	const { trade, ledgerName } = useSelector((state: any) => {
		const responseObject: any = {};
		if (tradeId) {
			responseObject["trade"] = state?.portfolioTradesList?.tradeList[tradeId];
		}
		if (ledgerId) {
			const ledger = state?.ledgerInfo?.ledgerDetails;
			if (ledgerId == ledger.id) {
				responseObject["ledgerName"] =
					state?.ledgerInfo?.ledgerDetails?.name ||
					state?.ledgerInfo?.ledgerDetails?.dump?.name;
			}
		}
		return responseObject;
	});

	const init = async () => {
		try {
			setLoading(true);
			form.value.currency_pair = trade.currency_pair;
			form.value.trade_amount = trade.trade_amount;
			form.value.trade_type = trade.trade_type;
			form.value.maturity_date = formatedDate(trade.maturity_date);
			form.value.benchmark_rate = trade.benchmark_rate;
			form.value.uuid = trade.uuid;
			form.value.cp_invoice_number = trade.cp_invoice_number;
			form.value.bank_name = trade.bank_name || "";
			form.value.cp_name = trade.cp_name;

			if (form.value.cp_invoice_number || form.value.cp_name) {
				setShowCounterPartyFields(true);
			}
			setDisabled(false);
			setLedgerName(ledgerName);
		} catch (error) {
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		init();
	}, []);

	useEffect(() => {
		if (location.state && location.state.updateDate) {
			showCalendarModal(true);
		}
	}, []);

	const showCalendarModal = async (addImmediateFunction?: boolean) => {
		const details = {
			setDateObj: setDateObj,
			form: form,
			setRunOverrideCalendarStyles: setRunOverrideCalendarStyles,
			dateObj: dateObj,
			minDate: moment().add(1, "day"),
			maxDate: moment().add(1, "year"),
			immediateCalledFunction: () => {},
		};
		if (addImmediateFunction) {
			details.immediateCalledFunction = handleTradeUpdate;
		}
		await CalendarModal({
			details: details,
		});
	};

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
			navigate("/fx-home", {
				state: { select: "portfolio", secondTab: "ledger" },
			});
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	const handleDeleteLedger = async () => {
		try {
			await showDeleteConfirmationModal({
				title: "Delete trade?",
				description:
					"All the details of this trade will be removed permanently.",
				callbackYes: deleteCallBackFunction,
				makeModalFull: false,
			});
		} catch (error) {
			console.log("Error deleting Trade:", error);
			throw error;
		} finally {
			setLoading(false);
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
			+form.value.trade_amount < +trade?.hedged_amount + +trade?.paid_amount ||
			+form.value.trade_amount === 0
		) {
			setError(true);
			setDisabled(true);
		} else {
			setDisabled(false);
			setError(false);
		}
	}, [form.value.trade_amount]);

	const handleTradeUpdate = async () => {
		try {
			setLoadingFor("update");
			setLoading(true);
			form.value.trade_amount = form.value.trade_amount.replace(/,/g, "");
			form.value.benchmark_rate = form.value.benchmark_rate.replace(/,/g, "");
			const payload = form.value;
			const response: any = await updateTrade(payload, form.value.uuid);
			const id = response?.trade_id;
			dispatch(
				setToastMessage({
					message: `Trade Updated!`,
					type: "neutral",
				}),
			);
			navigate(`/ledger/${ledgerId}/trade/${id}`);
		} catch (error) {
			console.log("Error updating trade:", error);
			throw error;
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

					<div className="relative py-4">
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
						<div className="flex flex-col mx-5 mt-5 gap-y-4 pb-[76px]">
							<TypesCard
								typesCard="trade"
								setOpenDateModal={showCalendarModal}
								form={form}
								disabled
							/>
							<CurrencyInput
								setShowSelectCurrencyPair={setShowSelectCurrencyPair}
								form={form}
								disabled
							/>
							<div>
								<PrimaryInput
									suffix={
										<button
											className="absolute top-1/2 right-4 -translate-y-[50%] ml-4 flex"
											onClick={() => showInfoModal()}
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
										onClick={() => showInfoModal()}
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
												onClick={() => showInfoModal()}
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
												onClick={() => showInfoModal()}
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
					<div className="shadow-boxShadow fixed bottom-0 left-0 right-0 h-fit py-3 px-4 flex  bg-white shadow-style-chooser gap-x-5 items-center justify-center md:w-1/3 m-auto">
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
				</>
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
