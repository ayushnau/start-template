import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
	getHedgeDetails,
	getTradeDetails,
	getTransactions,
	useModalNavigation,
} from "services";
import { useNavigate } from "react-router-dom";
import {
	Loader,
	Header,
	BadgeButton,
	TransactionTopCard,
	NoTransaction,
	TransactionCard,
	InfoModalV2,
	TransactionDropDown,
} from "components";
import { getCurrencySymbol } from "services/fx/getCurrencySymbol";
import { useSelector, useDispatch } from "react-redux";
import {
	setTransactionFilterTrade,
	setTransactionFilterHedge,
	clearTransactionFilterTrade,
	clearTransactionFilterHedge,
	StoreState,
} from "store";
import {
	formatNumberWithCommas,
	TRANSACTIONSINFO,
	TRANSACTIONFILTERSTATICS,
	TRANSACTION_OPTIONS,
} from "utils";
import { twMerge } from "tailwind-merge";
import { useBetaForm } from "@locoworks/reusejs-toolkit-react-hooks";

const FILTERVALUES: any = TRANSACTIONFILTERSTATICS;
const activeTransactionOptions = TRANSACTION_OPTIONS;

const showInfoModal = async () => {
	await InfoModalV2({
		content: TRANSACTIONSINFO,
		web: true,
	});
};

const TransactionDetails = ({ web = false }) => {
	const navigate = useNavigate();
	const { tradeId, hedgeId } = useParams();
	const [transactionList, setTransactionList] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [pnl, setPNL] = useState({ value: "", symbol: "" });

	const [filterTypeTrade, filterTypeHedge] = useSelector(
		(state: StoreState) => [
			state.transactionFilterSlice.filterTypeTrade,
			state.transactionFilterSlice.filterTypeHedge,
		],
	);
	const { trade, tradeType, hedge } = useSelector((state: any) => {
		const returnObject: any = {};
		if (tradeId) {
			returnObject["trade"] = state?.portfolioTradesList?.tradeList[tradeId];
		}
		const tradeList: any = state?.portfolioTradesList?.tradeList;
		if (tradeId && tradeList) {
			returnObject["tradeType"] = tradeList[tradeId]?.trade_type;
		}
		if (hedgeId) {
			returnObject["hedge"] = state?.portfolioHedgesList?.hedgeList[hedgeId];
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
			title: "TITLE 1",
			percentage: 10,
			amount: "4500",
			amount_currency: "USD",
			mtm: "-100",
			mtm_currency: "INR",
		},
		card2: {
			title: "TITLE 2",
			percentage: 20,
			amount: "4000",
			amount_currency: "USD",
			mtm: "24000",
			mtm_currency: "INR",
		},
		card3: {
			title: "TITLE 3",
			percentage: 10,
			amount: "50,000",
			amount_currency: "USD",
			mtm: "24000",
			mtm_currency: "INR",
		},
		card4: {
			title: "TITLE 4",
			percentage: 2,
			amount: "840",
			amount_currency: "USD",
			mtm: "24000",
			mtm_currency: "INR",
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
		trade_data: any,
	) => {
		let cash_amount = 0;
		let hedge_used_amount = 0;
		let eefc_transfer = 0;
		let bank_charges = 0;
		let from_eefc = 0;
		let pcfc_repayment = 0;

		let cash_mtm = 0;
		let hedge_used_mtm = 0;
		let pcfc_used_mtm = 0;

		transactionsArray.forEach((txn: any) => {
			if (txn.type === "transaction_via_cash_trade") {
				cash_amount = cash_amount + +txn.amount;
				cash_mtm = cash_mtm + +txn.pnl;
			} else if (txn.type === "transaction_via_hedge_trade") {
				hedge_used_amount = hedge_used_amount + +txn.amount;
				hedge_used_mtm = hedge_used_mtm + +txn.pnl;
			} else if (
				txn.type === "transaction_via_eefc_trade_payment" &&
				tradeType === "import"
			) {
				from_eefc += +txn.amount;
			} else if (txn.type === "transfer_to_eefc" && tradeType === "export") {
				eefc_transfer += +txn.amount;
			} else if (txn.type === "transaction_via_bank_charges") {
				bank_charges += +txn.amount;
			} else if (
				txn.type === "transaction_via_pcfc_trade" &&
				tradeType === "export"
			) {
				pcfc_repayment += +txn.amount;
				pcfc_used_mtm = pcfc_used_mtm + +txn.pnl;
			}
		});

		const cash_percentage = (
			(cash_amount / +trade_data.trade_amount) *
			100
		).toFixed(2);
		const hedge_used_percentage = (
			(hedge_used_amount / +trade_data.trade_amount) *
			100
		).toFixed(2);

		const bank_charges_percentage = (
			(bank_charges / +trade_data.trade_amount) *
			100
		).toFixed(2);
		const transfer_to_eefc_percentage = (
			(eefc_transfer / +trade_data.trade_amount) *
			100
		).toFixed(2);
		const from_eefc_percentage = (
			(from_eefc / +trade_data.trade_amount) *
			100
		).toFixed(2);

		const from_pcfc_percentage = (
			(pcfc_repayment / +trade_data.trade_amount) *
			100
		).toFixed(2);

		const trade_card_data = {
			card1: {
				title: "Cash",
				percentage: cash_percentage,
				amount: cash_amount.toString(),
				amount_currency: trade_data.base_currency,
				mtm: cash_mtm.toString(),
				mtm_currency: trade_data.quote_currency,
			},
			card2: {
				title: "Hedge used",
				percentage: hedge_used_percentage,
				amount: hedge_used_amount.toString(),
				amount_currency: trade_data.base_currency,
				mtm: hedge_used_mtm.toString(),
				mtm_currency: trade_data.quote_currency,
			},
			card3: {
				title: "Transfer to EEFC account",
				percentage: transfer_to_eefc_percentage,
				amount: eefc_transfer.toString(),
				amount_currency: trade_data.base_currency,
				mtm: hedge_used_mtm.toString(),
				mtm_currency: trade_data.quote_currency,
			},
			card4: {
				title: "Bank charges",
				percentage: bank_charges_percentage,
				amount: bank_charges.toString(),
				amount_currency: trade_data.base_currency,
				mtm: hedge_used_mtm.toString(),
				mtm_currency: trade_data.quote_currency,
			},
			card5: {
				title: "Via EEFC account",
				percentage: from_eefc_percentage,
				amount: from_eefc.toString(),
				amount_currency: trade_data.base_currency,
				mtm: hedge_used_mtm.toString(),
				mtm_currency: trade_data.quote_currency,
			},
			card6: {
				title: "PCFC repayment",
				percentage: from_pcfc_percentage,
				amount: pcfc_repayment.toString(),
				amount_currency: trade_data.base_currency,
				mtm: pcfc_used_mtm.toString(),
				mtm_currency: trade_data.quote_currency,
			},
		};
		setCardValues({
			card1: trade_card_data.card1,
			card2: trade_card_data.card2,
			card3: trade_card_data.card3,
			card4: trade_card_data.card4,
			card5: trade_card_data.card5,
			card6: trade_card_data.card6,
		});
	};

	const setCardValuesHedgeHandler = (
		transactionsArray: any,
		hedge_data: any,
	) => {
		let cancelled_amount = hedge_data.cancelled_amount;
		let used_amounnt = hedge_data.used_amount;

		let cancelled_mtm = 0;
		let used_mtm = 0;

		transactionsArray.forEach((txn: any) => {
			if (txn.type === "transaction_via_cancel_hedge") {
				cancelled_mtm = cancelled_mtm + +txn.pnl;
			} else if (
				txn.type === "transaction_via_use_hedge" ||
				txn.type === "transaction_via_hedge_trade"
			) {
				used_mtm = used_mtm + +txn.pnl;
			}
		});

		const cancelled_percentage = (
			(cancelled_amount / hedge_data.hedge_amount) *
			100
		).toFixed(2);
		const used_percentage = (
			(used_amounnt / hedge_data.hedge_amount) *
			100
		).toFixed(2);

		const hedge_card_data = {
			card1: {
				title: "Used",
				percentage: used_percentage,
				amount: used_amounnt.toString(),
				amount_currency: hedge_data.base_currency,
				mtm: used_mtm.toString(),
				mtm_currency: hedge_data.quote_currency,
			},
			card2: {
				title: "Cancelled",
				percentage: cancelled_percentage,
				amount: cancelled_amount.toString(),
				amount_currency: hedge_data.base_currency,
				mtm: cancelled_mtm.toString(),
				mtm_currency: hedge_data.quote_currency,
			},
		};

		setCardValues({
			card1: hedge_card_data.card1,
			card2: hedge_card_data.card2,
		});
	};
	const updateTransactions = (transactions: any) => {
		return transactions.map((value: any) => {
			if (value.type === "transaction_via_eefc_trade_payment") {
				let currentTransactionData = JSON.parse(value.transaction_data);
				if (currentTransactionData.trade_benchmark_rate !== undefined)
					currentTransactionData.benchmark_rates =
						currentTransactionData.trade_benchmark_rate;
				if (currentTransactionData.trade_pnl !== undefined)
					value.pnl = currentTransactionData.trade_pnl;
				delete currentTransactionData.trade_benchmark_rate;
				delete currentTransactionData.trade_pnl;
				value.transaction_data = JSON.stringify(currentTransactionData);
				return value;
			}
			return value;
		});
	};

	const ifTradeTransactionHandler = async () => {
		let tradeDetails: any = {};
		if (trade && trade?.uuid == tradeId) {
			tradeDetails = { trade: trade };
		} else {
			tradeDetails = await getTradeDetails(tradeId);
		}
		setDataObject({
			amount: tradeDetails.trade.paid_amount,
			amount_currency: tradeDetails.trade.base_currency,
		});
		const response: any = await getTransactions({ tradeId });
		if (response.success && response.transactions) {
			response.transactions = updateTransactions(response.transactions);
			setTransactionList(response.transactions);
			setCardValuesTradeHandler(response.transactions, tradeDetails.trade);
			setPNL({
				value: calculateTotalPNL(response.transactions),
				symbol: getPNLSymbol(response.transactions[0]) || "INR",
			});
		}
	};

	const getPNLSymbol = (transaction: any) => {
		if (transaction) {
			const data = transaction?.transaction_data
				? JSON.parse(transaction?.transaction_data)
				: {};
			return (
				data.benchmark_rates_currency ||
				data.benchmark_rate_currency ||
				data.hedge_rate_currency ||
				data.hedged_rates_currency ||
				data.current_market_rates_currency
			);
		}
	};

	const calculateTotalPNL = (transactions: any[]) => {
		let totalPNL = 0;
		transactions.map((ele) => {
			totalPNL = +totalPNL + +ele.pnl;
		});
		return totalPNL.toFixed(2).toString();
	};

	const ifHedgeTransactionHandler = async () => {
		let hedgeDetails: any = {};
		if (hedge && hedge?.uuid == hedgeId) {
			hedgeDetails = { trade: hedge };
		} else {
			hedgeDetails = await getHedgeDetails(hedgeId);
		}
		setDataObject({
			amount: (
				+hedgeDetails.trade.used_amount + +hedgeDetails.trade.cancelled_amount
			).toFixed(),
			amount_currency: hedgeDetails.trade.base_currency,
		});

		const response: any = await getTransactions({ hedgeId });

		if (response.success && response.transactions) {
			setPNL({
				value: calculateTotalPNL(response.transactions),
				symbol: getPNLSymbol(response.transactions[0]),
			});
			setTransactionList(response.transactions);
			setCardValuesHedgeHandler(response.transactions, hedgeDetails.trade);
		}
	};

	const fetchTransactionData = async () => {
		try {
			if (tradeId) {
				await ifTradeTransactionHandler();
			} else if (hedgeId) {
				await ifHedgeTransactionHandler();
			}
		} catch (error) {
			console.log(error);
		}
	};

	const init = async () => {
		try {
			setIsLoading(true);
			if (tradeId) {
				setFilterCheck(filterTypeTrade);
			}
			if (hedgeId) {
				setFilterCheck(filterTypeHedge);
			}
			await fetchTransactionData();
		} catch (error) {
			console.log("Error fetching Trades Data:", error);
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

	const clearTradeFilters = () => {
		dispatch(clearTransactionFilterTrade());
	};
	const clearHedgeFilters = () => {
		dispatch(clearTransactionFilterHedge());
	};

	React.useEffect(() => {
		init();
		return () => {
			if (tradeId) {
				clearTradeFilters();
			} else if (hedgeId) {
				clearHedgeFilters();
			}
		};
	}, []);

	const [active_form_values] = useSelector((state: any) => {
		return [state.tradeFilterSlice.status];
	});

	const setActiveValuesCallback = (option: any) => {
		if (option["label"]["main"] === "PCFC repayment") {
			dispatch(setTransactionFilterTrade(FILTERVALUES["pcfcRepayment"].value));
			setFilterCheck(FILTERVALUES["pcfcRepayment"].value);
		} else if (option["label"]["main"] === "Bank Charges") {
			dispatch(setTransactionFilterTrade(FILTERVALUES["bankCharges"].value));
			setFilterCheck(FILTERVALUES["bankCharges"].value);
		}
	};

	const returnActiveDefaultValues = () => {
		if (active_form_values.value !== "") {
			return [activeTransactionOptions[active_form_values.value - 1]];
		}
	};

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
									<div className="flex gap-x-4 justify-between w-full px-[85px]">
										<div className="flex flex-col items-center justify-center">
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
										<TransactionTopCard id={"card1"} {...cardvalues.card1} />
										<div className="w-full border-b border-dotted " />
										<TransactionTopCard id={"card2"} {...cardvalues.card2} />
										<div className="w-full border-b border-dotted " />
										{tradeId ? (
											tradeType === "export" ? (
												<>
													<TransactionTopCard
														id={"card3"}
														{...cardvalues.card3}
														showMtmTags={false}
													/>
													<div className="w-full border-b border-dotted " />
													<TransactionTopCard
														id={"card4"}
														{...cardvalues.card4}
														showMtmTags={false}
													/>
													<div className="w-full border-b border-dotted " />
													<TransactionTopCard
														id={"card6"}
														{...cardvalues.card6}
														showMtmTags={true}
													/>
												</>
											) : (
												<TransactionTopCard
													id={"card5"}
													{...cardvalues.card4}
													showMtmTags={false}
												/>
											)
										) : (
											<></>
										)}
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
											if (tradeId) {
												dispatch(
													setTransactionFilterTrade(FILTERVALUES["all"].value),
												);
											} else if (hedgeId) {
												dispatch(
													setTransactionFilterHedge(FILTERVALUES["all"].value),
												);
											}
										}}
									/>
									{tradeId && (
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
														setTransactionFilterTrade(
															FILTERVALUES["cash"].value,
														),
													);
													setFilterCheck(FILTERVALUES["cash"].value);
												}}
											/>
											<BadgeButton
												state={
													filterCheck === FILTERVALUES["hedgeUsed"].value
														? "selected"
														: "inactive"
												}
												label="Hedge used"
												onClick={() => {
													dispatch(
														setTransactionFilterTrade(
															FILTERVALUES["hedgeUsed"].value,
														),
													);
													setFilterCheck(FILTERVALUES["hedgeUsed"].value);
												}}
											/>
											{/* Data are copying from hedges here we need to remove this */}
											{tradeType === "export" ? (
												<>
													<BadgeButton
														state={
															filterCheck === FILTERVALUES["eefcTransfer"].value
																? "selected"
																: "inactive"
														}
														label="EEFC transfer"
														onClick={() => {
															dispatch(
																setTransactionFilterTrade(
																	FILTERVALUES["eefcTransfer"].value,
																),
															);
															setFilterCheck(
																FILTERVALUES["eefcTransfer"].value,
															);
														}}
													/>

													<TransactionDropDown
														options={activeTransactionOptions}
														callback={setActiveValuesCallback}
														defaultValue={returnActiveDefaultValues()}
														isActiveApplied={active_form_values.value === 2}
													/>
												</>
											) : (
												<BadgeButton
													state={
														filterCheck === FILTERVALUES["eefcPaid"].value
															? "selected"
															: "inactive"
													}
													label="Via EEFC Account"
													onClick={() => {
														dispatch(
															setTransactionFilterTrade(
																FILTERVALUES["eefcPaid"].value,
															),
														);
														setFilterCheck(FILTERVALUES["eefcPaid"].value);
													}}
												/>
											)}
										</>
									)}
									{hedgeId && (
										<>
											<BadgeButton
												state={
													filterCheck === FILTERVALUES["used"].value
														? "selected"
														: "inactive"
												}
												label="Used"
												onClick={() => {
													dispatch(
														setTransactionFilterHedge(
															FILTERVALUES["used"].value,
														),
													);
													setFilterCheck(FILTERVALUES["used"].value);
												}}
											/>
											<BadgeButton
												state={
													filterCheck === FILTERVALUES["cancelled"].value
														? "selected"
														: "inactive"
												}
												label="Cancelled"
												onClick={() => {
													dispatch(
														setTransactionFilterHedge(
															FILTERVALUES["cancelled"].value,
														),
													);
													setFilterCheck(FILTERVALUES["cancelled"].value);
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
												<TransactionCard
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

export default TransactionDetails;
