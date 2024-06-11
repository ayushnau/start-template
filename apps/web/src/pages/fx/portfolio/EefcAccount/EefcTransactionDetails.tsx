import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getEEFCDetails, getTransactions, useModalNavigation } from "services";
import { useNavigate } from "react-router-dom";
import {
	Loader,
	Header,
	BadgeButton,
	TransactionTopCard,
	NoTransaction,
	EEFCTransactionCard,
} from "components";
import { InfoModalV2 } from "components";
import { getCurrencySymbol } from "services/fx/getCurrencySymbol";
import { useSelector, useDispatch } from "react-redux";
import {
	setTransactionEefcFilter,
	clearTransactionEefcFilter,
	StoreState,
} from "store";
import {
	formatNumberWithCommas,
	TRANSACTIONSINFO,
	TRANSACTIONEEFCFILTERSTATICS,
} from "utils";
import { twMerge } from "tailwind-merge";
import { CashPaymentIcon, NetOff, UseHedgesIcon } from "icons";

const FILTERVALUES: any = TRANSACTIONEEFCFILTERSTATICS;

const showInfoModal = async () => {
	await InfoModalV2({
		content: TRANSACTIONSINFO,
		web: true,
	});
};

const EefcTransactionDetails = ({ web = false }) => {
	const navigate = useNavigate();
	const { eefcId } = useParams();
	const [transactionList, setTransactionList] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [pnl, setPNL] = useState({ value: "", symbol: "" });
	const [cashEefcObjectState, setCashEefcObjectState] = useState<any>(null);
	const [useHedgeEefcObjectState, setUseHedgeEefcObjectState] =
		useState<any>(null);
	const [importNetOffEefcObject, setImportNetOffEefcObject] =
		useState<any>(null);

	const [filterTypeEefc] = useSelector((state: StoreState) => [
		state.transactionEefcFilterSlice.filterTypeEefc,
	]);

	const { eefc } = useSelector((state: any) => {
		const returnObject: any = {};
		if (eefcId) {
			returnObject["eefc"] = state?.portfolioEEFCsList?.eefcList[eefcId];
		}
		return returnObject;
	});

	const dispatch = useDispatch();
	const { stepBackNavigation } = useModalNavigation();

	const [filterCheck, setFilterCheck] = useState<any>();

	const [dataObject, setDataObject] = useState({
		amount: "",
		amount_currency: "",
	});

	const [cardvalues, setCardValues] = useState<any>({
		card1: {
			title: "",
			percentage: "",
			amount: "",
			amount_currency: "",
			mtm: "",
			mtm_currency: "",
		},
		card2: {
			title: "",
			percentage: "",
			amount: "",
			amount_currency: "",
			mtm: "",
			mtm_currency: "",
		},
		card3: {
			title: "",
			percentage: "",
			amount: "",
			amount_currency: "",
			mtm: "",
			mtm_currency: "",
		},
	});

	const getFilteredTransactions = (transactions: any) => {
		if (filterCheck && (filterCheck !== "" || filterCheck !== "all")) {
			return transactions.filter((ele: any) => filterCheck.includes(ele.type));
		}
		return transactions;
	};

	const setCardValuesTradeHandler = (
		transactionsArray: any,
		eefc_data: any,
		cashEefcObject: any,
		importNetOffEefcObject: any,
		useHedgeEefcObject: any,
	) => {
		let cash_amount = 0;
		let hedge_used_amount = 0;
		let import_net_off_amount = 0;

		let cash_mtm = 0;
		let hedge_used_mtm = 0;
		let import_net_off_mtm = 0;

		transactionsArray.forEach((txn: any) => {
			if (txn.type === "transaction_via_cash_eefc") {
				cash_amount = cashEefcObject?.amount || 0;
				cash_mtm = cashEefcObject?.pnl;
			} else if (txn.type === "transaction_via_eefc_use_hedge_payment") {
				hedge_used_amount = useHedgeEefcObject?.amount || 0;
				hedge_used_mtm = useHedgeEefcObject?.pnl;
			} else if (txn.type === "transaction_via_eefc_trade_payment") {
				import_net_off_amount = importNetOffEefcObject?.amount || 0;
				import_net_off_mtm = importNetOffEefcObject?.pnl;
			}
		});

		const cash_percentage = cashEefcObject?.percentage_amount || "0";

		const hedge_used_percentage = useHedgeEefcObject.percentage_amount || "0";

		const import_net_off_percentage =
			importNetOffEefcObject.percentage_amount || "0";

		const trade_card_data = {
			card1: {
				title: "Cash conversion",
				percentage: cash_percentage,
				amount: cash_amount.toString(),
				amount_currency: eefc_data.base_currency,
				mtm: cash_mtm.toString(),
				mtm_currency: eefc_data.quote_currency,
				Icon: CashPaymentIcon,
				eefcStatus: true,
			},
			card2: {
				title: "Import net-off",
				percentage: import_net_off_percentage,
				amount: import_net_off_amount.toString(),
				amount_currency: eefc_data.base_currency,
				mtm: import_net_off_mtm.toString(),
				mtm_currency: eefc_data.quote_currency,
				Icon: NetOff,
				eefcStatus: true,
			},
			card3: {
				title: "Hedge used",
				percentage: hedge_used_percentage,
				amount: hedge_used_amount.toString(),
				amount_currency: eefc_data.base_currency,
				mtm: hedge_used_mtm.toString(),
				mtm_currency: eefc_data.quote_currency,
				Icon: UseHedgesIcon,
				eefcStatus: true,
			},
		};
		setCardValues({
			card1: trade_card_data.card1,
			card2: trade_card_data.card2,
			card3: trade_card_data.card3,
		});
	};
	const updateTransaction = (transaction: any) => {
		return transaction.map((value: any) => {
			if (value.type === "transaction_via_eefc_trade_payment") {
				const transactionObject = JSON.parse(value.transaction_data);
				delete transactionObject.trade_pnl;
				delete transactionObject.trade_benchmark_rate;
				value.transaction_data = JSON.stringify(transactionObject);
				return value;
			}
			return value;
		});
	};

	const ifEefcTransactionHandler = async () => {
		let eefcDetails: any = {};
		if (eefc && eefc?.uuid == eefcId) {
			eefcDetails = { eefc: eefc };
		} else {
			eefcDetails = await getEEFCDetails(eefcId);
		}
		setDataObject({
			amount: eefcDetails.eefc.eefc_amount,
			amount_currency: eefcDetails.eefc.base_currency,
		});
		const response: any = await getTransactions({ eefcId });
		if (response.success && response.transactions) {
			response.transactions = updateTransaction(response.transactions);
			const cashPNL = response?.cashEefcObject?.pnl
				? +response.cashEefcObject.pnl
				: 0;
			const importNetOffPNL = response.importNetOffEefcObject.pnl
				? +response.importNetOffEefcObject.pnl
				: 0;
			const useHedgePNL = response.useHedgeEefcObject.pnl
				? +response.useHedgeEefcObject.pnl
				: 0;

			const totalCalculatedPNL = cashPNL + importNetOffPNL + useHedgePNL;
			setPNL({
				value: `${totalCalculatedPNL}`,
				symbol: getPNLSymbol(response.transactions[0]),
			});
			setCardValuesTradeHandler(
				response.transactions,
				eefcDetails.eefc,
				response.cashEefcObject,
				response.importNetOffEefcObject,
				response.useHedgeEefcObject,
			);
			setCashEefcObjectState(response.cashEefcObject || null);
			setImportNetOffEefcObject(response.importNetOffEefcObject || null);
			setUseHedgeEefcObjectState(response.useHedgeEefcObject || null);

			setTransactionList(response.transactions);
		}
	};

	const getPNLSymbol = (transaction: any) => {
		if (transaction) {
			const data = JSON.parse(transaction?.transaction_data);
			return (
				data.benchmark_rates_currency ||
				data.benchmark_rate_currency ||
				data.hedge_rate_currency ||
				data.hedged_rates_currency ||
				data.current_market_rates_currency
			);
		}
	};

	const fetchTransactionData = async () => {
		try {
			if (eefcId) {
				await ifEefcTransactionHandler();
			}
		} catch (error) {
			console.log(error);
		}
	};

	const init = async () => {
		try {
			setIsLoading(true);
			if (eefcId) {
				setFilterCheck(filterTypeEefc);
			}
			await fetchTransactionData();
		} catch (error) {
			console.log("Error fetching Eefcs Data:", error);
		} finally {
			setTimeout(() => {
				setIsLoading(false);
			}, 1000);
		}
	};

	const handleBackBtnClick = () => {
		if (web) {
			stepBackNavigation("transactions");
		} else {
			navigate(-1);
		}
	};

	const clearEefcFilters = () => {
		dispatch(clearTransactionEefcFilter());
	};

	React.useEffect(() => {
		init();
		// ! temporary off
		// return () => {
		// 	if (eefcId) {
		// 		clearEefcFilters();
		// 	}
		// };
	}, [filterCheck]);

	return (
		<Loader
			isLoading={isLoading}
			successComponent={
				<div className="bg-white h-full flex flex-col">
					<Header
						className="flex items-center justify-between px-4  py-4"
						displayTitle={`Transaction history`}
						backAction={handleBackBtnClick}
						showEditIcon={false}
						displayTitleStyles={"font-inter text-base font-bold w-full ml-4"}
					/>
					<div className="border-t-[1px] w-full h-full flex flex-col border-mine-shaft-2">
						{transactionList && transactionList.length > 0 ? (
							<div className="relative overflow-y-scroll px-5">
								<div
									id="total_section"
									className="border-mine-shaft-2 pb-6 border-b mb-2 flex flex-col items-center justify-center"
								>
									<div className="flex" style={{ columnGap: "5.75rem" }}>
										<div className="flex flex-col items-center justify-center gap-x-10">
											<label className="font-inter text-sm leading-[22px] text-mine-shaft-3 pt-4">
												Total amount
											</label>
											<label className="font-inter text-xl font-bold mt-1 leading-[26px] -tracking-[0.35px] pb-4">{`${getCurrencySymbol(
												dataObject.amount_currency,
											)}${formatNumberWithCommas(dataObject.amount)}`}</label>
										</div>
										<div className="flex flex-col items-center justify-center">
											<label className="font-inter text-sm leading-[22px] text-mine-shaft-3 pt-4">
												Total PNL
											</label>
											<label
												className={twMerge(
													"font-inter text-xl font-bold mt-1 leading-[26px] -tracking-[0.35px] pb-4",
													pnl.value.includes("-")
														? "text-bean-red-dark"
														: "text-mountain-meadow-3",
												)}
											>{`${getCurrencySymbol(
												pnl.symbol,
											)}${formatNumberWithCommas(pnl.value)}`}</label>
										</div>
									</div>

									<div className="flex flex-col w-full h-full items-center justify-center gap-y-3 px-4 py-3 border rounded-xl">
										<TransactionTopCard
											icon=""
											id={"card1"}
											{...cardvalues.card1}
										/>
										<div className="w-full border-b border-dotted " />
										<TransactionTopCard
											icon=""
											id={"card2"}
											{...cardvalues.card2}
										/>
										<div className="w-full border-b border-dotted " />
										<TransactionTopCard
											icon=""
											id={"card3"}
											{...cardvalues.card3}
										/>
									</div>
								</div>
								<div className="font-inter font-bold text-xl leading-[26px] pt-[14px] pb-1">
									Transactions
								</div>
								<div id="FilterButtonsList" className="flex gap-x-2 py-2">
									<BadgeButton
										state={
											filterCheck === undefined || filterCheck === ""
												? "selected"
												: "inactive"
										}
										label="All"
										onClick={() => {
											setFilterCheck(FILTERVALUES["all"].value);
											if (eefcId) {
												dispatch(
													setTransactionEefcFilter(FILTERVALUES["all"].value),
												);
											}
										}}
									/>
									{eefcId &&
										cashEefcObjectState &&
										Object.keys(cashEefcObjectState).length > 0 && (
											<>
												<BadgeButton
													state={
														filterCheck === FILTERVALUES["cash"].value
															? "selected"
															: "inactive"
													}
													label="Cash"
													onClick={() => {
														dispatch(
															setTransactionEefcFilter(
																FILTERVALUES["cash"].value,
															),
														);
														setFilterCheck(FILTERVALUES["cash"].value);
													}}
												/>
											</>
										)}

									{eefcId &&
										useHedgeEefcObjectState &&
										Object.keys(useHedgeEefcObjectState).length > 0 && (
											<>
												<BadgeButton
													state={
														filterCheck === FILTERVALUES["hedgeUsed"].value
															? "selected"
															: "inactive"
													}
													label="Hedge used"
													onClick={() => {
														dispatch(
															setTransactionEefcFilter(
																FILTERVALUES["hedgeUsed"].value,
															),
														);
														setFilterCheck(FILTERVALUES["hedgeUsed"].value);
													}}
												/>
											</>
										)}
									{eefcId &&
										importNetOffEefcObject &&
										Object.keys(importNetOffEefcObject).length > 0 && (
											<>
												<BadgeButton
													state={
														filterCheck === FILTERVALUES["import_net_off"].value
															? "selected"
															: "inactive"
													}
													label="Import net-off"
													onClick={() => {
														dispatch(
															setTransactionEefcFilter(
																FILTERVALUES["import_net_off"].value,
															),
														);
														setFilterCheck(
															FILTERVALUES["import_net_off"].value,
														);
													}}
												/>
											</>
										)}
								</div>
								<div
									id="TransactionCardsWrapper"
									className="flex flex-col pt-2 pb-[80px]"
								>
									{getFilteredTransactions(transactionList).map(
										(transaction: any, index: number) => {
											const temp = {
												amount: {
													value: transaction?.amount,
													currency: transaction?.amount_currency,
												},
												pnl: transaction.pnl,
												created_at: transaction.date_of_transaction,
												transaction_data: JSON.parse(
													transaction?.transaction_data,
												),
												type: transaction.type,
											};
											return (
												<EEFCTransactionCard
													key={index}
													showInfoModal={showInfoModal}
													{...temp}
												/>
											);
										},
									)}
								</div>
							</div>
						) : (
							<NoTransaction />
						)}
					</div>
				</div>
			}
		/>
	);
};

export default EefcTransactionDetails;
