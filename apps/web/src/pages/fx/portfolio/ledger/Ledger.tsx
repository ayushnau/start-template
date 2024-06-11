import React, { useEffect, useState } from "react";
import { TabWrapper, Header, showDeleteConfirmationModal } from "components";
import TradeTab from "../Trade/TradeTab";
import { getLedgersDetails, deleteLedger, recalculateTrade } from "services";
import { Loader } from "components";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setToastMessage, setLedgerDetails } from "store";
import { EditModal } from "components";

interface LedgerProps {}

const Ledger: React.FC<LedgerProps> = ({}) => {
	const [isLoading, setLoading] = useState(true);
	const [ledgerName, setLedgerName] = useState("loding..");
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [currencyGroupingData, setCurrencyGroupingData] = React.useState<any>();
	const [maturityFilterData, setMaturityFiliterData] = React.useState<any>();

	const [numberOfTrades, setNumberOfTrades] = useState(0);
	const [showEditLedgerForm, setShowEditLedgerForm] = useState(false);
	const [completedMaturityFilterData, setCompletedMaturityFilterData] =
		useState<any>();
	const [activeMaturityFilterData, setActiveMaturityFilterData] = useState<any>(
		[],
	);
	const [completedMaturityGroupingData, setCompletedMaturityGroupingData] =
		useState<any>();
	const [activeMaturityGroupingData, setActiveMaturityGroupingData] =
		useState<any>([]);
	const [completedCurrencyGroupingData, setCompletedCurrencyGroupingData] =
		useState<any>();
	const [activeCurrencyGroupingData, setActiveCurrencyGroupingData] =
		useState<any>([]);
	const { id } = useParams();
	const ledgerId = id || "";

	const handleEditLedger = () => {
		setShowEditLedgerForm(true);
	};

	const deleteCallBackFunction = async () => {
		try {
			await deleteLedger(id);
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
			navigate("/fx-home", {
				state: { select: "portfolio", secondTab: "ledger" },
			});
		}
	};

	const handleDeleteLedger = async () => {
		await showDeleteConfirmationModal({
			title: "Delete ledger?",
			description:
				"Trades and Hedges inside this ledger (if any) will be removed permanently.",
			callbackYes: deleteCallBackFunction,
			makeModalFull: false,
		});
	};
	const getDateList = (dateValues: any) => {
		const dateList: any = [];
		dateValues.map((ele: any) => {
			dateList.push({
				label: Object.keys(ele)[0],
				count: ele[Object.keys(ele)[0]],
			});
		});
		return dateList;
	};

	const getDetails = async () => {
		try {
			setLoading(true);
			const response: any = await getLedgersDetails(ledgerId);
			if (response && response?.sucess) {
				const ledger = response.workbook;
				const dateValues: any = response?.maturity_grouping_data;
				const maturityDateList = getDateList(dateValues);
				setMaturityFiliterData([...maturityDateList]);

				setCompletedMaturityFilterData(
					getDateList(response.completed_maturity_grouping_data),
				);
				setActiveMaturityFilterData(
					getDateList(response.active_maturity_grouping_data),
				);

				if (response?.completed_maturity_grouping_data) {
					setCompletedMaturityGroupingData(
						getDateList(response.completed_maturity_grouping_data),
					);
				}
				if (response?.active_maturity_grouping_data) {
					setActiveMaturityGroupingData(
						getDateList(response.active_maturity_grouping_data),
					);
				}
				if (response?.completed_currency_grouping_data) {
					setCompletedCurrencyGroupingData(
						response.completed_currency_grouping_data,
					);
				}
				if (response?.active_currency_grouping_data) {
					setActiveCurrencyGroupingData(response.active_currency_grouping_data);
				}

				const currencyPairs: any = response?.currency_grouping_data;
				setCurrencyGroupingData(
					currencyPairs.map((pair: any) => pair.currency_pair).join(","),
				);
				setLedgerName(ledger.dump.name);
				setNumberOfTrades(ledger.active_trade_count);
				dispatch(setLedgerDetails(ledger));
			}
		} catch (error) {
			console.log("Error fetching Details");
			throw error;
		} finally {
			setLoading(false);
		}
	};

	const handleUpdateCallback = async () => {
		await recalculateTrade({});
		await getDetails();
	};

	useEffect(() => {
		getDetails();
	}, [ledgerId]);

	const handleEditLedgerForm = async () => {
		await EditModal({
			setShowEditLedgerForm,
			updateDetails: getDetails,
			ledgerName,
			ledgerId,
		});
	};

	useEffect(() => {
		if (showEditLedgerForm) handleEditLedgerForm();
	}, [showEditLedgerForm]);

	return (
		<Loader
			isLoading={isLoading}
			successComponent={
				<div className="h-full bg-white flex flex-col overflow-hidden">
					<Header
						className=" flex items-center justify-between px-4 py-[15px] -mb-2"
						backAction={() => {
							navigate("/fx-home", {
								state: { select: "portfolio", secondTab: "ledger" },
							});
						}}
						displayTitle={<>{ledgerName}</>}
						editAction={handleEditLedger}
						deleteAction={handleDeleteLedger}
					/>
					<TabWrapper
						tabs={[
							{
								label: `Trades ${
									numberOfTrades ? `(${numberOfTrades})` : "(0)"
								}`,
								activeTabName: "trade",
								component: (
									<TradeTab
										handleUpdateCallback={handleUpdateCallback}
										currency_filter_data={currencyGroupingData}
										maturity_filter_data={maturityFilterData}
										completedMaturityGroupingData={
											completedMaturityGroupingData
										}
										activeMaturityGroupingData={activeMaturityGroupingData}
										completedCurrencyGroupingData={
											completedCurrencyGroupingData
										}
										activeCurrencyGroupingData={activeCurrencyGroupingData}
										workbook_id={ledgerId}
										trade_count={numberOfTrades}
									/>
								),
							},
						]}
						setActiveTab={() => {}}
						activeTab={"trade"}
					/>
				</div>
			}
		/>
	);
};
export default Ledger;
