import { getPortfolioCount } from "services";
import { useNavigate } from "react-router-dom";
import { StoreState, setPortfolioSelectedTab } from "store";
import Summary from "./portfolio/ledger/Summary";
import React, { useEffect, useState } from "react";
import HedgesTab from "./portfolio/Trade/HedgesTab";
import EefcAccountTab from "./portfolio/EefcAccount/EefcAccountTab";
import { useSelector, useDispatch } from "react-redux";
import LedgerList from "./portfolio/ledger/LedgerList";
import { HeadingWithButton, TabWrapper, Loader } from "components";

interface PortfolioProps {
	setNavigationTabSwitch: Function;
}

const Portfolio: React.FC<PortfolioProps> = ({ setNavigationTabSwitch }) => {
	const storeState = useSelector(
		(state: StoreState) => state?.portfolioSelectedTab?.selectedTab,
	);
	const [activePortfolioTab, setActivePortfolioTab] = useState(
		storeState || "Summary",
	);
	const [activePortfolioTabButtonText, setActivePortfolioTabButtonText] =
		useState("+ Add Summary");
	const [showAddLedger, setShowAddLedger] = useState(false);
	const [ledgerCount, setLedgerCount] = useState(0);
	const [hedgesCount, setHedgeCount] = useState(0);
	const [eefcCount, setEefcCount] = useState(0);
	const [isLoading, setIsLoading] = useState(false);

	const navigate = useNavigate();
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(setPortfolioSelectedTab(activePortfolioTab));
		setActivePortfolioTab(activePortfolioTab);
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

			default:
				break;
		}
	}, [activePortfolioTab]);

	const init = async () => {
		try {
			setIsLoading(true);
			const result: any = await getPortfolioCount();

			if (result) {
				setLedgerCount(result.ledger_count);
				setHedgeCount(result.hedges_count);
				setEefcCount(result.eefcs_count);
			}
		} catch (error) {
			console.log("Error while Fetching Portfolio Counts :", error);
			throw error;
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		init();
	}, []);

	return (
		<Loader
			isLoading={isLoading}
			successComponent={
				<>
					<div className="px-5 portfolio">
						{activePortfolioTab === "Ledger" ||
						activePortfolioTab === "Hedges" ? (
							<div className="pt-1">
								<HeadingWithButton
									heading="Portfolio"
									buttonText={activePortfolioTabButtonText}
									onButtonClick={() => {
										if (activePortfolioTab == "Ledger")
											navigate("/create-ledger");
										if (activePortfolioTab == "Hedges")
											navigate(`/add-hedge`, { state: { action: "create" } });
									}}
									HeadingClassName={
										"font-bold tracking--0.5 leading-34 font-inter text-25 text-blackDark "
									}
									wrapperClassname="pt-1"
								/>
							</div>
						) : (
							<div className="font-bold tracking--0.5 leading-34 font-inter text-25 text-blackDark pt-2">
								Portfolio
							</div>
						)}
					</div>

					<TabWrapper
						tabs={[
							{
								label: "Summary",
								activeTabName: "Summary",
								component: (
									<Summary
										showAddLedger={showAddLedger}
										setShowAddLedger={setShowAddLedger}
										setNavigationTabSwitch={setNavigationTabSwitch}
									/>
								),
							},
							{
								label: `Ledgers ${ledgerCount ? `(${ledgerCount})` : "(0)"}`,
								activeTabName: "Ledger",
								component: (
									<LedgerList
										showAddLedger={showAddLedger}
										setShowAddLedger={setShowAddLedger}
										setNavigationTabSwitch={setNavigationTabSwitch}
									/>
								),
							},
							{
								label: `Hedges ${hedgesCount ? `(${hedgesCount})` : "(0)"}`,
								activeTabName: "Hedges",
								component: (
									<HedgesTab
										setNavigationTabSwitch={setNavigationTabSwitch}
										hedgesCount={hedgesCount}
									/>
								),
							},
							{
								label: `EEFC Account ${eefcCount ? `(${eefcCount})` : "(0)"}`,
								activeTabName: "EEFC Account",
								component: (
									<EefcAccountTab
										setNavigationTabSwitch={setNavigationTabSwitch}
										eefcCount={eefcCount}
									/>
								),
							},
						]}
						setActiveTab={setActivePortfolioTab}
						activeTab={activePortfolioTab}
						enabledScrollView={true}
					/>
				</>
			}
		/>
	);
};

export default Portfolio;
