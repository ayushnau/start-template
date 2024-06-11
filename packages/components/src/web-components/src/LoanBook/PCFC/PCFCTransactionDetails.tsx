import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPcfcById, getTransactions, useModalNavigation } from "services";
import { useNavigate } from "react-router-dom";
import {
	Loader,
	Header,
	BadgeButton,
	TransactionTopCard,
	NoTransaction,
	ROITag,
	PCFCTransactionCard,
} from "components";
import { InfoModalV2 } from "components";
import { getCurrencySymbol } from "services/fx/getCurrencySymbol";
import { useSelector, useDispatch } from "react-redux";
import { clearTransactionPcfcFilter, StoreState } from "store";
import {
	formatNumberWithCommas,
	TRANSACTIONSINFO,
	TRANSACTIONPCFCFILTERSTATICS,
} from "utils";
import { BankIcon, CashConversionIcon } from "icons";

const FILTERVALUES: any = TRANSACTIONPCFCFILTERSTATICS;

const showInfoModal = async () => {
	await InfoModalV2({
		content: TRANSACTIONSINFO,
		web: true,
	});
};

const PCFCTransactionDetails = ({ web = false }) => {
	const navigate = useNavigate();
	const { pcfcId } = useParams();
	const [transactionList, setTransactionList] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [pnl, setPNL] = useState({ value: "", symbol: "" });

	const [filterTypePcfc] = useSelector((state: StoreState) => [
		state.transactionPcfcFilterSlice.filterTypePcfc,
	]);

	const { pcfc } = useSelector((state: any) => {
		const returnObject: any = {};
		if (pcfcId) {
			returnObject["pcfc"] = state?.pcfcListSlice?.pcfcList[pcfcId];
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
	});

	const setCardValuesTradeHandler = (
		transactionsArray: any,
		pcfc_data: any,
	) => {
		let pcfc_trade_amount = 0;
		let pcfc_trade_mtm = 0;

		let pcfc_eefc_amount = 0;
		let pcfc_eefc_mtm = 0;

		transactionsArray.forEach((txn: any) => {
			if (txn.type === "transaction_via_pcfc_trade") {
				pcfc_trade_amount = pcfc_trade_amount + +txn.amount;
				pcfc_trade_mtm = pcfc_trade_mtm + +txn.pnl;
			} else if (txn.type === "transaction_via_pcfc_eefc") {
				pcfc_eefc_amount = pcfc_eefc_amount + +txn.amount;
				pcfc_eefc_mtm = pcfc_eefc_mtm + +txn.pnl;
			}
		});

		const trade_percentage = (
			(pcfc_trade_amount / +pcfc_data.pcfc_amount) *
			100
		).toFixed(2);

		const eefc_percentage = (
			(pcfc_eefc_amount / +pcfc_data.pcfc_amount) *
			100
		).toFixed(2);

		const trade_card_data = {
			card1: {
				title: "Repay by Trade",
				percentage: trade_percentage,
				amount: pcfc_trade_amount.toString(),
				amount_currency: pcfc_data.base_currency,
				mtm: pcfc_trade_mtm.toString(),
				mtm_currency: pcfc_data.quote_currency,
				Icon: CashConversionIcon,
			},
			card2: {
				title: "Repay by EEFC",
				percentage: eefc_percentage,
				amount: pcfc_eefc_amount.toString(),
				amount_currency: pcfc_data.base_currency,
				mtm: pcfc_eefc_mtm.toString(),
				mtm_currency: pcfc_data.quote_currency,
				Icon: BankIcon,
			},
		};
		setCardValues({
			card1: trade_card_data.card1,
			card2: trade_card_data.card2,
		});
	};

	const updateTransaction = (transaction: any) => {
		return transaction.map((value: any) => {
			if (value.type === "transaction_via_pcfc_trade") {
				const transactionObject = JSON.parse(value.transaction_data);
				value.transaction_data = JSON.stringify(transactionObject);
				return value;
			}
			return value;
		});
	};

	const calculateTotalPNL = (transactions: any[]) => {
		let totalPNL = 0;
		transactions.map((ele) => {
			totalPNL = +totalPNL + +ele.pnl;
		});
		return totalPNL.toFixed(2).toString();
	};

	const ifPcfcTransactionHandler = async () => {
		let pcfcDetails: any = {};
		if (pcfc && pcfc?.uuid == pcfcId) {
			pcfcDetails = { pcfc: pcfc };
		} else {
			pcfcDetails = await getPcfcById(pcfcId);
		}
		setDataObject({
			amount: pcfcDetails.pcfc.pcfc_amount,
			amount_currency: pcfcDetails.pcfc.base_currency,
		});
		const response: any = await getTransactions({ pcfcId });
		if (response.success && response.transactions) {
			response.transactions = updateTransaction(response.transactions);

			setPNL({
				value: calculateTotalPNL(response.transactions),
				symbol: getPNLSymbol(response.transactions[0]),
			});

			setTransactionList(response.transactions);
			setCardValuesTradeHandler(response.transactions, pcfcDetails.pcfc);
		}
	};

	const getPNLSymbol = (transaction: any) => {
		if (transaction) {
			const data = JSON.parse(transaction?.transaction_data);
			return (
				data.benchmark_rates_currency ||
				data.benchmark_rate_currency ||
				data.current_market_rates_currency
			);
		}
	};

	const fetchTransactionData = async () => {
		try {
			if (pcfcId) {
				await ifPcfcTransactionHandler();
			}
		} catch (error) {
			console.log(error);
		}
	};

	const init = async () => {
		try {
			setIsLoading(true);
			if (pcfcId) {
				setFilterCheck(filterTypePcfc);
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

	const clearPcfcFilters = () => {
		dispatch(clearTransactionPcfcFilter());
	};

	React.useEffect(() => {
		init();
		return () => {
			if (pcfcId) {
				clearPcfcFilters();
			}
		};
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
												ROI
											</label>
											<ROITag
												roi={pcfc?.return_on_investment_rate}
												showInfo={false}
											/>
										</div>
									</div>

									<div className="flex flex-col w-full h-full items-center justify-center gap-y-3 px-4 py-3 border rounded-xl">
										<TransactionTopCard
											icon=""
											id={"card1"}
											{...cardvalues.card1}
											showMtmTags={false}
										/>
										<div className="w-full border-b border-dotted " />
										<TransactionTopCard
											icon=""
											id={"card2"}
											{...cardvalues.card2}
											showMtmTags={false}
										/>
									</div>
								</div>
								<div className="font-inter font-bold text-xl leading-[26px] pt-[14px] pb-1">
									Transactions
								</div>
								<div
									id="TransactionCardsWrapper"
									className="flex flex-col pt-2 pb-[80px]"
								>
									{transactionList.map((transaction: any, index: number) => {
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
											<PCFCTransactionCard
												key={index}
												showInfoModal={showInfoModal}
												{...temp}
											/>
										);
									})}
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

export default PCFCTransactionDetails;
