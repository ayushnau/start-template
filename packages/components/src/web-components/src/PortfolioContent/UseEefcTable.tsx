import React, { useState, useRef, useEffect } from "react";
import { twMerge } from "tailwind-merge";
import { SubTitle2, SubTitle3 } from "../../../Typography";
import TableUseHedgeButton from "./TableUseHedgeButton";
import moment from "moment";
import { getCurrencySymbol } from "services/fx/getCurrencySymbol";
import { formatNumberWithCommas } from "utils";
import TagRenderer from "../Hedges/TagRenderer";
import AmountInput from "./AmountInput";
import { useBetaForm as useBetaForm } from "@locoworks/reusejs-toolkit-react-hooks";
import TransactionDateInput from "./TransactionDateInput";
import { useParams } from "react-router-dom";
import {
	commaFormatted,
	createTransactions,
	useModalNavigation,
} from "services";
import { useSelector } from "react-redux";
import { updatePortfolioEEFCSpecificRecord } from "store/src/portfolioEEFCsListSlice";
import { useDispatch } from "react-redux";
import { setToastMessage } from "store";

import { showDeleteConfirmationModal, Loader } from "components";
import TableUseEefcButton from "./TableUseEefcButton";
const HedgeUtilisationHeaderColumnList = [
	"#",
	"Bank Name",
	"Reference no.",
	"Maturity date",
	"Hedge rate",
	"Market rate",
	"Gain/Risk",
	"Available amount",
	"Amount to be used",
	"Utilisation date",
	"",
];

const HedgesUtilisationKeyList = [
	{ key: "#" },
	{ key: "bank_name" },
	{ key: "bank_ref" },
	{ key: "maturity_date" },
	{ key: "hedged_rates" },
	{ key: "current_market_rates" },
	{ key: "mtm" },
	{ key: "remaining_amount" },
	{ key: "amount_to_be_used" },
	{ key: "utilisation_date" },
	{ key: "use_hedge_cta" },
];

const LedgerUtilisationHeaderColumnList = [
	"#",
	"Ledger",
	"Maturity date",
	"Bank Name",
	"Benchmark",
	"Invoice number",
	"Remaining Balance",
	"Unhedged Amount",
	"Amount to be used",
	"Utilisation date",
	"",
];

const LedgerUtilisationKeyList = [
	{ key: "#" },
	{ key: "ledger" },
	{ key: "maturity_date" },
	{ key: "bank_name" },
	{ key: "benchmark" },
	{ key: "invoice_number" },
	{ key: "remaining_balance" },
	{ key: "unhedged_amount" },
	{ key: "amount_to_be_used" },
	{ key: "utilisation_date" },
	{ key: "use_eefc_cta" },
];

export interface UseEefcTableInterface {
	dataSet?: any;
	type: string;
}

const UseEefcTable: React.FC<UseEefcTableInterface> = ({ dataSet, type }) => {
	const tableRef = React.useRef<any>();
	const { eefcId } = useParams();
	const hedgesList = useSelector((state: any) => {
		return state?.portfolioHedgesList?.hedgeList;
	});
	const tradesList = useSelector((state: any) => {
		return state?.portfolioAllTradesAllLedgerList?.tradeList;
	});

	const dispatch = useDispatch();
	const { fullNavigation } = useModalNavigation();
	const [currentActiveHedge, setCurrentActiveHedge] = useState<any>("");
	const [resetAllEditState, setResetAllEditState] = useState<any>(false);
	const [confirmModalActive, setConfirmModalActive] = useState<any>(false);
	const [isLoading, setIsLoading] = useState(false);

	const eefcDetails = useSelector((state: any) => {
		if (eefcId) {
			return state?.portfolioEEFCsList?.eefcList[eefcId];
		}
	});
	const form = useBetaForm({
		eefc_uuid: eefcId,
		hedge_uuid: "",
		trade_uuid: "",
		amount: "",
		amount_currency: eefcDetails.base_currency,
		type:
			type === "useHedges"
				? "transaction_via_eefc_use_hedge_payment"
				: "transaction_via_eefc_trade_payment",
		date_of_transaction: "",
		validated: "",
		bank_name: "",
		ledger_name: "",
		trade_benchmark_rate: "",
	});

	const handleRowClick = async (ele: any) => {
		if (
			(form.value.amount !== "" || form.value.date_of_transaction !== "") &&
			ele.uuid !== currentActiveHedge
		) {
			setConfirmModalActive(true);
			await showDeleteConfirmationModal({
				title:
					type === "useHedges"
						? "Are you sure you want to use another hedge?"
						: "Are you sure you want to use another trade?",
				description:
					type === "useHedges"
						? "The data you entered for the current hedge will be deleted."
						: "The data you entered for the current trade will be deleted.",
				callbackYes: () => {
					setResetAllEditState(true);
					handleSelectRow(ele);
					setConfirmModalActive(false);
				},
				callbackNo: () => {
					setConfirmModalActive(false);
				},
				web: true,
				makeModalFull: false,
			});
		} else {
			handleSelectRow(ele);
		}
	};
	const handleSelectRow = (ele: any) => {
		type === "useHedges"
			? form.setField("hedge_uuid", ele?.uuid)
			: form.setField("trade_uuid", ele?.uuid);
		form.setField("ledger_name", ele.ledger_name);
		if (type !== "useHedges")
			form.setField("trade_benchmark_rate", ele?.benchmark_rate);
		form.setField("bank_name", ele.bank_name);
		setCurrentActiveHedge(ele?.uuid);
	};

	const validateAmount = () => {
		let id: any;
		if (type === "useHedges") {
			id = form.value.hedge_uuid;
			return +form.value.amount <= +hedgesList[id].remaining_amount;
		} else {
			id = form.value.trade_uuid;
			return +form.value.amount <= +tradesList[id].remaining_amount;
		}
	};

	const handleUseHedgeButtonClick = async () => {
		await showDeleteConfirmationModal({
			title: "Confirm hedge use",
			cancelButtonText: "Cancel",
			approveButtonText: "Confirm",
			approveButtonClasses:
				"bg-cornflower-blue-2 border-none ring-none hover:bg-cornflower-blue-2 text-white",
			descriptionComponent: (
				<div className="rounded-lg bg-color-black-1 w-full p-2 flex items-center justify-between gap-x-[10px]">
					<div className="flex-1">
						<SubTitle2 classes="text-mine-shaft-4">
							Amount to be used:
						</SubTitle2>
						<div className="flex items-center ">
							<p className="font-semibold">
								{getCurrencySymbol(form.value.amount_currency)}
							</p>
							<SubTitle2 classes="font-bold">
								{commaFormatted(form.value.amount)}
							</SubTitle2>
						</div>
					</div>
					<div className="flex-1">
						<SubTitle2 classes="text-mine-shaft-4">
							Date of Transaction:
						</SubTitle2>
						<div>
							<SubTitle2 classes="font-bold">
								{moment(form.value.date_of_transaction).format("DD/MM/YYYY")}
							</SubTitle2>
						</div>
					</div>
				</div>
			),
			callbackYes: async () => {
				try {
					setIsLoading(true);
					if (validateAmount()) {
						const response: any = await createTransactions(form.value);
						if (response.success) {
							dispatch(updatePortfolioEEFCSpecificRecord(response.eefc));
							dispatch(
								setToastMessage({
									message: `Payment recorded!`,
									type: "neutral",
								}),
							);

							form.setField("date_of_transaction", "");
							form.setField("amount", "");
						}
					}
				} catch (err) {
					setIsLoading(false);
					console.log("error occured: ", err);
					dispatch(
						setToastMessage({
							message: `⚠️ Error: Please try again`,
							type: "error",
							className: "bg-[#BA1A1A]",
						}),
					);
				} finally {
					setIsLoading(false);
				}
			},
			web: true,
			makeModalFull: false,
		});
	};

	const handleUseLedgerButtonClick = async () => {
		await showDeleteConfirmationModal({
			title: "Confirm EEFC use",
			cancelButtonText: "Cancel",
			approveButtonText: "Confirm",
			approveButtonClasses:
				"bg-cornflower-blue-2 border-none ring-none hover:bg-cornflower-blue-2 text-white",
			descriptionComponent: (
				<>
					<div className="bg-color-black-1 flex flex-col w-full rounded-lg">
						<div className="p-2 flex items-center justify-between gap-x-[10px]">
							<div className="flex-1">
								<SubTitle2 classes="text-mine-shaft-4">
									Amount to be used:
								</SubTitle2>
								<div className="flex items-center ">
									<p className="font-semibold">
										{getCurrencySymbol(form.value.amount_currency)}
									</p>
									<SubTitle2 classes="font-bold">
										{commaFormatted(form.value.amount)}
									</SubTitle2>
								</div>
							</div>
							<div className="flex-1">
								<SubTitle2 classes="text-mine-shaft-4">
									Date of Transaction:
								</SubTitle2>
								<div>
									<SubTitle2 classes="font-bold">
										{moment(form.value.date_of_transaction).format(
											"DD/MM/YYYY",
										)}
									</SubTitle2>
								</div>
							</div>
						</div>
						<div className="p-2 flex items-center justify-between gap-x-[10px]">
							<div className="flex-1">
								<SubTitle2 classes="text-mine-shaft-4">Ledger:</SubTitle2>
								<div>
									<SubTitle2 classes="font-bold">
										{form.value.ledger_name === "" ||
										form.value.ledger_name === null
											? "-"
											: form.value.ledger_name}
									</SubTitle2>
								</div>
							</div>
							<div className="flex-1">
								<SubTitle2 classes="text-mine-shaft-4">Bank Name:</SubTitle2>
								<div>
									<SubTitle2 classes="font-bold">
										{form.value.bank_name === "" ||
										form.value.bank_name === null
											? "-"
											: form.value.bank_name}
									</SubTitle2>
								</div>
							</div>
						</div>
					</div>
				</>
			),
			callbackYes: async () => {
				try {
					const requestObject = {
						trade_uuid: form.value.trade_uuid,
						eefc_uuid: eefcId,
						amount: form.value.amount,
						amount_currency: eefcDetails?.base_currency,
						type: "transaction_via_eefc_trade_payment",
						date_of_transaction: form.value.date_of_transaction,
						transaction_data: {
							cash_rate: eefcDetails?.benchmark_rate,
							cash_rate_currency: eefcDetails?.quote_currency,
							trade_benchmark_rate: form.value.trade_benchmark_rate,
						},
					};
					if (validateAmount()) {
						const response: any = await createTransactions(requestObject);
						if (response.success) {
							dispatch(updatePortfolioEEFCSpecificRecord(response.eefc));
							dispatch(
								setToastMessage({
									message: `Payment recorded!`,
									type: "neutral",
								}),
							);
						}
					}
				} catch (err) {
					console.log("error occured: ", err);
					dispatch(
						setToastMessage({
							message: `⚠️ Error: Please try again`,
							type: "error",
							className: "bg-[#BA1A1A]",
						}),
					);
				}
			},
			web: true,
			makeModalFull: false,
		});
	};

	const renderSubTitle3String = (label: string) => {
		return <SubTitle3 classes="text-mine-shaft-4 text-sm">{label}</SubTitle3>;
	};

	const returnCellDisplayElementHedger = (
		key: string,
		index: number,
		hedge_data: any,
	) => {
		const hedge_uuid: number = hedge_data?.uuid;
		const hedge_base_currency: string = hedge_data?.base_currency;
		const hedge_quote_currency: string = hedge_data?.quote_currency;
		switch (key) {
			case "#":
				return renderSubTitle3String((index + 1).toFixed());
			case "bank_name":
				return hedge_data?.bank_name || null;
			case "bank_ref":
				if (hedge_data[key]) {
					return renderSubTitle3String(hedge_data[key]);
				} else {
					return renderSubTitle3String("-");
				}
			case "maturity_date":
				return renderSubTitle3String(
					moment(hedge_data[key]).format("DD/MM/YYYY"),
				);
			case "use_hedge_cta":
				return (
					<TableUseHedgeButton
						handleUseHedgeButtonClick={handleUseHedgeButtonClick}
						hedge_uuid={hedge_uuid}
						currentActiveHedge={currentActiveHedge}
						form={form}
					/>
				);
			case "hedged_rates":
				return `${getCurrencySymbol(
					hedge_quote_currency,
				)}${formatNumberWithCommas(hedge_data?.hedged_rates)}`;
			case "current_market_rates":
				return renderSubTitle3String(
					`${getCurrencySymbol(hedge_quote_currency)}${formatNumberWithCommas(
						hedge_data[key],
					)}`,
				);
			case "remaining_amount":
				return renderSubTitle3String(
					`${getCurrencySymbol(hedge_base_currency)}${formatNumberWithCommas(
						hedge_data?.unlinked_amount,
					)}`,
				);
			case "mtm":
				const mtm = hedge_data[key];

				const isPastMaturityDate = moment(
					hedge_data["maturity_date"],
					"YYYY-MM-DD",
				).isBefore(moment().subtract(1, "days"));
				return (
					<TagRenderer
						is_hedge_matured={false}
						isPastMaturityDate={isPastMaturityDate}
						tableSrc={"hedge"}
						currentMarketRates={eefcDetails?.current_market_rates}
						currency={hedge_quote_currency}
						value={mtm}
					/>
				);
			case "amount_to_be_used":
				return (
					<AmountInput
						hedgeDetails={hedge_data}
						reset={resetAllEditState}
						form={form}
						firstElement={index === 0}
						isModalActive={confirmModalActive}
						errorStates={[
							"Amount Cant be Greater than Remaining EEFC or Available amount",
						]}
						eefcDetails={eefcDetails}
						isLinkedElement={false}
					/>
				);
			default:
				return (
					<TransactionDateInput
						reset={resetAllEditState}
						setReset={setResetAllEditState}
						hedgeDetails={hedge_data}
						form={form}
						isLinkedHedge={true}
						isModalActive={confirmModalActive}
						minDate={new Date(hedge_data.created_at)}
						maxDate={
							new Date() < new Date(hedge_data?.maturity_date)
								? new Date()
								: new Date(hedge_data?.maturity_date)
						}
					/>
				);
		}
	};

	const returnCellDisplayElementLedger = (
		key: string,
		index: number,
		trade_data: any,
	) => {
		const trade_uuid: number = trade_data?.uuid;
		const trade_base_currency: string = trade_data?.base_currency;
		const trade_quote_currency: string = trade_data?.quote_currency;

		switch (key) {
			case "#":
				return renderSubTitle3String((index + 1).toFixed());
			case "benchmark":
				return `${getCurrencySymbol(trade_quote_currency)}${
					trade_data.benchmark_rate
				}`;
			case "ledger":
				return renderSubTitle3String(`${trade_data.ledger_name}`);
			case "bank_name":
			case "bank_ref":
				if (trade_data[key]) {
					return renderSubTitle3String(trade_data[key]);
				} else {
					return renderSubTitle3String("-");
				}
			case "maturity_date":
				return renderSubTitle3String(
					moment(trade_data[key]).format("DD/MM/YYYY"),
				);
			case "invoice_number":
				if (
					trade_data.invoice_number !== null &&
					trade_data.invoice_number !== undefined
				) {
					return renderSubTitle3String(trade_data.invoice_number);
				}
				return "-";
			case "remaining_balance":
				return `${getCurrencySymbol(
					trade_base_currency,
				)}${formatNumberWithCommas(trade_data.remaining_amount)}`;
			case "unhedged_amount":
				return `${getCurrencySymbol(
					trade_base_currency,
				)}${formatNumberWithCommas(trade_data.unhedged_amount)}`;
			case "use_eefc_cta":
				return (
					<TableUseEefcButton
						handleUseEefcButtonClick={handleUseLedgerButtonClick}
						trade_uuid={trade_uuid}
						currentActivetrade={currentActiveHedge}
						form={form}
					/>
				);
			case "hedged_rates":
			case "current_market_rates":
				return renderSubTitle3String(
					`${getCurrencySymbol(trade_quote_currency)}${formatNumberWithCommas(
						trade_data[key],
					)}`,
				);
			case "remaining_amount":
				return renderSubTitle3String(
					`${getCurrencySymbol(trade_base_currency)}${formatNumberWithCommas(
						trade_data.link_amount,
					)}`,
				);
			case "mtm":
				const mtm = trade_data[key];
				const isPastMaturityDate = moment(
					trade_data.hedge["maturity_date"],
					"YYYY-MM-DD",
				).isBefore(moment().subtract(1, "days"));
				return (
					<TagRenderer
						is_hedge_matured={false}
						isPastMaturityDate={isPastMaturityDate}
						tableSrc={"hedge"}
						currentMarketRates={eefcDetails.current_market_rates}
						currency={trade_quote_currency}
						value={mtm}
					/>
				);
			case "amount_to_be_used":
				return (
					<AmountInput
						tradeDetails={trade_data}
						reset={resetAllEditState}
						form={form}
						firstElement={index === 0}
						isModalActive={confirmModalActive}
						errorStates={[
							"Amount Cant be Greater than Remaining EEFC or Available amount",
						]}
						eefcDetails={eefcDetails}
						isLinkedElement={false}
					/>
				);
			default:
				return (
					<TransactionDateInput
						reset={resetAllEditState}
						setReset={setResetAllEditState}
						hedgeDetails={trade_data}
						form={form}
						isLinkedHedge={true}
						isModalActive={confirmModalActive}
						minDate={new Date(trade_data.created_at)}
						maxDate={
							new Date() < new Date(trade_data?.maturity_date)
								? new Date()
								: new Date(trade_data?.maturity_date)
						}
					/>
				);
		}
	};

	const returnBackgroundColorString = (
		index: number,
		backgroundActive?: boolean,
	) => {
		return backgroundActive
			? "bg-cornflower-blue-1"
			: index % 2 === 0
			? "bg-white"
			: "bg-mine-shaft-1";
	};

	const returnRightBorder = (key: string) => {
		if (key === "#") {
			return (
				<div className="absolute inset-0 border-r z-[5] pointer-events-none border-color-black-1 -ml-4" />
			);
		}
	};

	return (
		<Loader
			isLoading={isLoading}
			loadingText={"Making Transaction..."}
			successComponent={
				<table
					ref={tableRef}
					className="flex-1 table-auto whitespace-nowrap w-full h-fit"
				>
					<colgroup>
						<col className="w-7 flex items-center justify-center" />
					</colgroup>
					<thead>
						<tr
							key="table_header"
							className="w-full sticky top-0 bg-white z-[3] gap-x-4 pl-4"
						>
							{type === "useHedges"
								? HedgeUtilisationHeaderColumnList.map((ele, index) => {
										return (
											<th
												key={index}
												className={twMerge(
													"py-2 font-normal px-3 text-start",
													ele === "#" ? "sticky left-0 bg-white" : "",
												)}
											>
												{returnRightBorder(ele)}
												<SubTitle2 classes="text-color-black-5 whitespace-nowrap">
													{ele}
												</SubTitle2>
												{ele === "Gain/Risk" && (
													<span
														className="cursor-pointer text-color-black-5 text-sm justify-center"
														onClick={() => {
															// handleInfoIconClick();
														}}
													>
														{" ⓘ"}
													</span>
												)}
												<div className="absolute inset-0 border-b border-mine-shaft-2 z-[5] pointer-events-none -ml-4" />
											</th>
										);
								  })
								: LedgerUtilisationHeaderColumnList.map((ele, index) => {
										return (
											<th
												key={index}
												className={twMerge(
													"py-2 font-normal px-3 text-start",
													ele === "#" ? "sticky left-0 bg-white" : "",
												)}
											>
												{returnRightBorder(ele)}
												<SubTitle2 classes="text-color-black-5 whitespace-nowrap">
													{ele}
												</SubTitle2>
												{ele === "Gain/Risk" && (
													<span
														className="cursor-pointer text-color-black-5 text-sm justify-center"
														onClick={() => {
															// handleInfoIconClick();
														}}
													>
														{" ⓘ"}
													</span>
												)}
												<div className="absolute inset-0 border-b border-mine-shaft-2 z-[5] pointer-events-none -ml-4" />
											</th>
										);
								  })}
						</tr>
					</thead>
					<tbody className="h-full w-full">
						{dataSet?.map((ele: any, iindex: number) => {
							return (
								<tr
									onClick={() => {
										handleRowClick(ele);
									}}
									// onMouseOver={() => handleRowClick(ele)}
									key={iindex + "row"}
									className={twMerge(
										"px-4 py-2 h-10 w-fit items-center justify-start",
										returnBackgroundColorString(iindex),
									)}
								>
									{type === "useHedges"
										? HedgesUtilisationKeyList.map(
												(cell_ele: any, index: number) => {
													return (
														<td
															key={"cell" + cell_ele.key + index}
															className={twMerge(
																"py-2 font-normal px-3 ",
																cell_ele.key === "#" ? "sticky left-0" : "",

																returnBackgroundColorString(
																	iindex,
																	currentActiveHedge === ele?.uuid,
																),
															)}
														>
															{returnRightBorder(cell_ele.key)}
															{returnCellDisplayElementHedger(
																cell_ele.key,
																iindex,
																ele,
															)}
														</td>
													);
												},
										  )
										: LedgerUtilisationKeyList.map(
												(cell_ele: any, index: number) => {
													return (
														<td
															key={"cell" + cell_ele.key + index}
															className={twMerge(
																"py-2 font-normal px-3 ",
																cell_ele.key === "#" ? "sticky left-0" : "",

																returnBackgroundColorString(
																	iindex,
																	currentActiveHedge === ele?.uuid,
																),
															)}
														>
															{returnRightBorder(cell_ele.key)}
															{returnCellDisplayElementLedger(
																cell_ele.key,
																iindex,
																ele,
															)}
														</td>
													);
												},
										  )}
								</tr>
							);
						})}
					</tbody>
				</table>
			}
		/>
	);
};

export default UseEefcTable;
