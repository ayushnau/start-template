import React, { useState, useRef } from "react";
import {
	Header,
	showBulkUploadModal,
	Loader,
	SecondaryButton,
	PrimaryButton,
} from "components";
import {
	getLedgersDetails,
	handleDownloadCSV,
	deleteLedger,
	recalculateTrade,
	rateLimitedCalculateLedgerSummary,
} from "services";
import TradeTab from "./TradeTab";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import showEditLedgerModal from "../Modals/EditLedgerModal";
import showDeleteLedgerModal from "../Modals/DeleteLedgerModal";
import { setLedgerCount } from "store/web-src/src/forexEntityCountSlice";
import { ChevronDown } from "icons";
import {
	setLedgerDetails,
	StoreState,
	setPortfolioLedgers,
	setToastMessage,
	setPortfolioModal,
	setCurrentSelectedLedgerId,
} from "store";
import { H6, SubTitle2, SubTitle3 } from "../../../Typography";
import TradesMoreDropDown from "../Trades/TradesMoreDropDown";
import { twMerge } from "tailwind-merge";

interface LedgerProps {}

const Ledger: React.FC<LedgerProps> = ({}) => {
	const [isLoading, setLoading] = useState(true);
	const [ledgerName, setLedgerName] = useState("Loading..");
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [currency_grouping_data, setCurrencyGroupingData] = useState<any>([]);
	const [maturity_grouping_data, setMaturityGroupingData] = useState<any>("");
	const [numberOfTrades, setNumberOfTrades] = useState(0);
	const [showMoreDropDown, setShowMoreDropdown] = React.useState(false);
	const [deleteMode, setDeleteMode] = React.useState(false);
	const [completedMaturityGroupingData, setCompletedMaturityGroupingData] =
		useState<any>();
	const [activeMaturityGroupingData, setActiveMaturityGroupingData] =
		useState<any>([]);
	const [completedCurrencyGroupingData, setCompletedCurrencyGroupingData] =
		useState<any>();
	const [activeCurrencyGroupingData, setActiveCurrencyGroupingData] =
		useState<any>([]);
	const { tradesRefresh, hedgesRefresh, ledgersRefresh } = useSelector(
		(state: StoreState) => state?.portfolioTradesHedges,
	);
	const { filter, status } = useSelector(
		(state: any) => state?.tradeFilterSlice,
	);

	const showLedgerUpdatedToastMessage = () => {
		dispatch(
			setToastMessage({
				message: `Ledger updated!`,
				type: "neutral",
			}),
		);
	};

	const { ledgerCount } = useSelector((state: any) => {
		return state.forexEntityCountSlice;
	});

	let id = useSelector((state: any) => {
		return state?.ledgerInfo?.currentSelectedLedgerId;
	});
	const { id: paramsId } = useParams();

	if (id === undefined || id === "") {
		id = paramsId;
	}
	const ledgerId = id || "";
	const tradesListRef = useRef<any>(null);

	const handleDownloadCsvForTrades = async () => {
		let headers: any = [];
		if (status.label === "active") {
			headers = [
				"trade_type",
				"maturity_date",
				"currency_pair",
				"benchmark_rate",
				"trade_amount",
				"hedged_amount",
				"mtm",
				"cp_invoice_number",
				"cp_name",
				"bank_name",
			];
		} else {
			headers = [
				"trade_type",
				"maturity_date",
				"currency_pair",
				"benchmark_rate",
				"trade_amount",
				"hedged_amount",
				"pnl",
				"cp_invoice_number",
				"cp_name",
				"bank_name",
			];
		}

		handleDownloadCSV({
			headers,
			jsonData: tradesListRef.current,
			type: "trades",
		});
	};

	const handleEditLedger = async () => {
		const response = await showEditLedgerModal({
			ledgerId: id,
			ledgerName: ledgerName,
			showToast: showLedgerUpdatedToastMessage,
		});
		if (response) {
			dispatch(setPortfolioLedgers(JSON.stringify(new Date())));
		}
	};

	const deleteCallBackFunction = async () => {
		try {
			setLoading(true);
			await deleteLedger(id);
			dispatch(setPortfolioLedgers(JSON.stringify(new Date())));
			dispatch(
				setToastMessage({
					message: "Ledger deleted!",
					type: "neutral",
					className: "mb-10",
				}),
			);
		} catch (error) {
			console.log("Error while deleting Ledger");
		} finally {
			setLoading(false);
			navigate("/fx-home/portfolio", {
				state: { select: "portfolio", secondTab: "ledger" },
			});

			dispatch(setLedgerCount(parseInt(ledgerCount) - 1));
		}
	};

	const handleDeleteLedger = async () => {
		await showDeleteLedgerModal({
			deleteCallback: deleteCallBackFunction,
		});
		dispatch(setCurrentSelectedLedgerId(""));
	};

	const handleBulkUploadReload = async () => {
		setLoading(true);
		await recalculateTrade({});
		window.location.reload();
	};

	const getDateList = (dateValues: any) => {
		return dateValues.map((ele: any) => {
			return {
				label: Object.keys(ele)[0],
				count: ele[Object.keys(ele)[0]],
			};
		});
	};
	const getDetails = async () => {
		try {
			setLoading(true);
			const response: any = await getLedgersDetails(ledgerId);
			if (response.sucess && response.workbook.dump.name) {
				dispatch(setLedgerDetails(response.workbook));
				setLedgerName(response.workbook.dump.name);
				setNumberOfTrades(response.workbook.active_trade_count);
				if (
					response?.maturity_grouping_data &&
					response?.maturity_grouping_data?.length > 0
				) {
					setMaturityGroupingData(getDateList(response.maturity_grouping_data));
				}
				if (response?.completed_maturity_grouping_data) {
					setCompletedMaturityGroupingData(
						getDateList(response?.completed_maturity_grouping_data),
					);
				}
				if (response?.active_maturity_grouping_data) {
					setActiveMaturityGroupingData(
						getDateList(response?.active_maturity_grouping_data),
					);
				}
				if (response?.completed_currency_grouping_data) {
					setCompletedCurrencyGroupingData(
						response?.completed_currency_grouping_data,
					);
				}
				if (response?.active_currency_grouping_data) {
					setActiveCurrencyGroupingData(
						response?.active_currency_grouping_data,
					);
				}

				if (
					response?.currency_grouping_data &&
					response?.currency_grouping_data?.length > 0
				) {
					setCurrencyGroupingData(
						response?.currency_grouping_data
							?.map((pair: any) => pair.currency_pair)
							.join(","),
					);
				}
			}
		} catch (error) {
			console.log("Error fetching Details");
		} finally {
			setLoading(false);
		}
	};

	const handleShowBulkUploadModal = async () => {
		await showBulkUploadModal({
			ledgerId: ledgerId,
			reloadCallback: handleBulkUploadReload,
		});
	};

	const handleViewSummaryClick = async () => {
		try {
			setLoading(true);
			await rateLimitedCalculateLedgerSummary(parseInt(ledgerId));
			navigate("summary");
		} catch (error) {
			console.log(">>>>Error while calculating Ledgers sumary data", error);
		} finally {
			setLoading(false);
		}
	};

	React.useEffect(() => {
		getDetails();
	}, [ledgerId, tradesRefresh, hedgesRefresh, ledgersRefresh]);

	return (
		<Loader
			isLoading={isLoading}
			successComponent={
				<div className="h-full bg-white flex flex-col pl-5 pr-4 overflow-hidden">
					<Header
						className="flex gap-y-[2px] items-center justify-between py-[15px] -mb-2 w-full"
						backAction={() => {
							navigate("/fx-home/portfolio", {
								state: { select: "portfolio", secondTab: "ledger" },
							});
						}}
						showEditIcon={false}
						displayTitle={
							<H6>
								{`${numberOfTrades} ${
									numberOfTrades > 1 ? " Trades" : " Trade"
								}`}
							</H6>
						}
						displaySubTitle={<SubTitle3>{ledgerName}</SubTitle3>}
						showBackArrow={false}
						headerCustomComponent={
							<div
								className={twMerge(
									"flex items-center gap-x-3 ml-auto",
									deleteMode ? "hidden" : "",
								)}
							>
								{numberOfTrades > 0 && (
									<>
										<PrimaryButton
											className="w-fit h-8 rounded-lg whitespace-nowrap"
											buttonText="+ Add Trade"
											onClick={() => {
												navigate("add-trade");
												dispatch(
													setPortfolioModal({
														displayModalScreen: true,
														modalScreen: "add-trade",
													}),
												);
											}}
										/>
										<SecondaryButton
											className="w-fit h-8 rounded-lg whitespace-nowrap"
											buttonText="View Summary"
											onClick={handleViewSummaryClick}
										/>
									</>
								)}
								<SecondaryButton
									className="relative w-fit h-8 rounded-lg whitespace-nowrap hover:border pr-3 py-3 flex items-center"
									buttonText={
										<label className="flex gap-x-1">
											<SubTitle2 classes="font-semibold">More</SubTitle2>
											<ChevronDown color="#212121" />
											{showMoreDropDown && (
												<div className="absolute bottom-0 z-50 translate-y-full left-0 -translate-x-1/2 py-2 bg-transparent">
													<TradesMoreDropDown
														tradesExists={numberOfTrades > 0}
														className="min-w-[190px]"
														downloadCSVCallback={async () => {
															await handleDownloadCsvForTrades();
														}}
														bulkUploadCallback={async () => {
															await handleShowBulkUploadModal();
														}}
														deleteTradesCallback={() => {
															setDeleteMode(true);
														}}
														editLedgerCallback={async () => {
															await handleEditLedger();
														}}
														deleteLedgerCallback={async () => {
															await handleDeleteLedger();
														}}
													/>
												</div>
											)}
										</label>
									}
									onClick={() => {
										setShowMoreDropdown((prev) => !prev);
									}}
									onMouseEnter={() => {
										setShowMoreDropdown(true);
									}}
									onMouseLeave={() => {
										setShowMoreDropdown(false);
									}}
								/>
							</div>
						}
					/>
					<TradeTab
						workbook_id={ledgerId}
						trade_count={numberOfTrades}
						currencyGroupingData={currency_grouping_data}
						maturityGroupingData={maturity_grouping_data}
						completedMaturityGroupingData={completedMaturityGroupingData}
						activeMaturityGroupingData={activeMaturityGroupingData}
						completedCurrencyGroupingData={completedCurrencyGroupingData}
						activeCurrencyGroupingData={activeCurrencyGroupingData}
						ref={tradesListRef}
						deleteMode={deleteMode}
						setDeleteMode={setDeleteMode}
					/>
				</div>
			}
		/>
	);
};
export default Ledger;
