import React, { useEffect, useState } from "react";
import { TabWrapper } from "components";
import Summary from "../../../../../../apps/wiredup/src/pages/fx/portfolio/ledger/Summary";
import LedgersV2 from "./LedgersV2";
import {
	getAllLedger,
	recalculateHedge,
	recalculateTrade,
	recalculateSummary,
	recalculateEEFC,
	rateLimitedCalculateLedgerSummary,
	rateLimitedCalculateHedgesSummary,
	getAllEEFCs,
} from "services";
import { Loader } from "components";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import SummarySecondaryRouter from "./SummarySecondaryRouter";
import { useDispatch, useSelector } from "react-redux";
import { StoreState, setPortfolioSelectedTab } from "store";
import {
	setHedgeCount,
	setLedgerCount,
	setEefcCount,
} from "store/web-src/src/forexEntityCountSlice";
import HedgesTabRouter from "../Hedges/HedgesTabRouter";
import EefcAccountTabRouter from "../EEFC/EefcAccountTabRouter";
import { getIDFromParams } from "utils";

interface PortfolioProps {
	setNavigationTabSwitch: Function;
}

const PortfolioHome: React.FC<PortfolioProps> = ({
	setNavigationTabSwitch,
}) => {
	const { state } = useLocation();
	const { selectedTab, updated_at } = useSelector(
		(state: StoreState) => state?.portfolioSelectedTab,
	);
	const modalOpened = useSelector((state: StoreState) => {
		return state?.portfolioModal.displayModalScreen;
	});
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [activePortfolioTab, setActivePortfolioTab] = useState(
		selectedTab || "Summary",
	);
	const params = useParams();
	const [activePortfolioTabButtonText, setActivePortfolioTabButtonText] =
		useState("+ Add Summary");
	const [showAddLedger, setShowAddLedger] = useState(false);
	const [ledgerData, setLedgerData] = useState<any>();
	const [eefcData, setEefcData] = useState<any>();
	const [isLoading, setIsLoading] = useState(false);
	const { hedgesRefresh, ledgersRefresh, tradesRefresh, eefcsRefresh } =
		useSelector((state: any) => state);
	const [refreshChild, setRefreshChild] = useState(false);

	const currentSelectedLedgerId = useSelector((state: any) => {
		return state.ledgerInfo.currentSelectedLedgerId;
	});
	const setActiveTabInStore = (activeTab: string) => {
		setActivePortfolioTab(activeTab);
		dispatch(setPortfolioSelectedTab(activeTab));
	};
	const count = useSelector((state: StoreState) => {
		return state.forexEntityCountSlice;
	});

	useEffect(() => {
		if (state?.secondTab && state.secondTab === "summary") {
			setActiveTabInStore("Summary");
		} else if (state?.secondTab && state.secondTab === "ledger") {
			setActiveTabInStore("Ledger");
		} else if (state?.secondTab && state.secondTab === "hedges") {
			setActiveTabInStore("Hedges");
		} else if (state?.secondTab && state.secondTab === "eefc") {
			setActiveTabInStore("EEFC");
		}
	}, [state]);

	useEffect(() => {
		switch (activePortfolioTab) {
			case "Summary":
				setActivePortfolioTabButtonText("+ Add summary");
				break;
			case "Ledger":
				setActivePortfolioTabButtonText("+ Add ledger");
				break;
			case "Hedges":
				setActivePortfolioTabButtonText("+ Add hedge");
				break;
			case "EEFC":
				setActivePortfolioTabButtonText("+ Add credit entry");
				break;
			default:
				break;
		}
	}, [activePortfolioTab, state, selectedTab]);

	const handleTabRefresh = async () => {
		if (activePortfolioTab === "Summary") {
			await recalculateSummary().then((value) => {
				setRefreshChild((prev) => !prev);
			});
		} else if (activePortfolioTab === "Hedges") {
			if (params["*"]?.includes("summary")) {
				await rateLimitedCalculateHedgesSummary().then((value) => {
					setRefreshChild((prev) => !prev);
				});
			} else {
				await recalculateHedge({}).then((value) => {
					setRefreshChild((prev) => !prev);
				});
			}
		} else if (activePortfolioTab === "Ledger") {
			if (params["*"]?.includes("summary")) {
				const selected_ledger_id = getIDFromParams(
					params["*"],
					/ledger\/(\d+)\/summary/,
				);
				await rateLimitedCalculateLedgerSummary(
					parseInt(selected_ledger_id),
				).then((value) => {
					setRefreshChild((prev) => !prev);
				});
			} else {
				await recalculateTrade({}).then((value) => {
					setRefreshChild((prev) => !prev);
				});
			}
		} else if (activePortfolioTab === "EEFC") {
			await recalculateEEFC({}).then((value) => {
				setRefreshChild((prev) => !prev);
			});
		}
	};

	const getLedgerCount = async () => {
		try {
			setIsLoading(true);
			const response: any = await getAllLedger();
			dispatch(setLedgerCount(response.ledger_count));
			dispatch(setHedgeCount(response.hedges_count));
			setLedgerData(response.data);
			const ledgerData = response.data;
			if (activePortfolioTab.toLowerCase() === "ledger") {
				if (ledgerData && typeof ledgerData === "object") {
					if (
						ledgerData.length > 0 &&
						!params["*"]?.includes("summary") &&
						!modalOpened
					) {
						const first_ledger: any = ledgerData[0];
						if (!currentSelectedLedgerId || currentSelectedLedgerId === "")
							navigate(`/fx-home/portfolio/ledger/${first_ledger?.id}`);
						else {
							navigate(`/fx-home/portfolio/ledger/${currentSelectedLedgerId}`);
						}
					}
				}
			}
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	};
	const getEEFCCount = async () => {
		try {
			setIsLoading(true);
			const response: any = await getAllEEFCs({});
			dispatch(setEefcCount(response.eefc_count));
			setEefcData(response.data);
			const eefcData = response.data;
			if (activePortfolioTab.toLowerCase() === "eefc") {
				if (eefcData && typeof eefcData === "object") {
					if (
						eefcData.length > 0 &&
						!params["*"]?.includes("eefc") &&
						!modalOpened
					) {
						const first_eefc: any = eefcData[0];
						navigate(`/fx-home/portfolio/eefc/${first_eefc?.id}`);
					}
				}
			}
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		getLedgerCount();
		getEEFCCount();
	}, [
		refreshChild,
		hedgesRefresh,
		tradesRefresh,
		ledgersRefresh,
		eefcsRefresh,
	]);

	const tabsCallback = (activeTabName = "") => {
		if (activeTabName.toLowerCase() === "ledger") {
			if (ledgerData && typeof ledgerData === "object") {
				if (ledgerData.length > 0) {
					const first_ledger: any = ledgerData[0];
					navigate(`/fx-home/portfolio/ledger/${first_ledger?.id}`);
				} else {
					navigate(`/fx-home/portfolio`);
				}
			}
		} else {
			navigate("/fx-home/portfolio");
		}
	};

	return (
		<Loader
			isLoading={isLoading}
			successComponent={
				<TabWrapper
					web
					updateAction={handleTabRefresh}
					time={updated_at}
					callback={tabsCallback}
					tabs={[
						{
							label: "Summary",
							activeTabName: "Summary",
							component: (
								<Summary
									showAddLedger={showAddLedger}
									setShowAddLedger={setShowAddLedger}
									setNavigationTabSwitch={setNavigationTabSwitch}
									web={true}
								/>
							),
						},
						{
							label: `Ledgers ${
								count.ledgerCount ? `(${count.ledgerCount})` : "(0)"
							}`,
							activeTabName: "Ledger",
							component: <LedgersV2 ledgerData={ledgerData} />,
						},
						{
							label: `Hedges ${
								count.hedgeCount ? `(${count.hedgeCount})` : "(0)"
							}`,
							activeTabName: "Hedges",
							component: (
								<HedgesTabRouter
									setNavigationTabSwitch={setNavigationTabSwitch}
									hedgesCount={count.hedgeCount}
								/>
							),
						},
						{
							label: `EEFC Account ${
								count.eefcCount ? `(${count.eefcCount})` : "(0)"
							}`,
							activeTabName: "EEFC",
							component: (
								<EefcAccountTabRouter
									setNavigationTabSwitch={setNavigationTabSwitch}
									eefcCount={count.eefcCount}
								/>
							),
						},
					]}
					setActiveTab={setActiveTabInStore}
					activeTab={activePortfolioTab}
					secondTab={
						activePortfolioTab === "Summary" ? (
							<SummarySecondaryRouter />
						) : (
							<></>
						)
					}
				/>
			}
		/>
	);
};

export default PortfolioHome;
