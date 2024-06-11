import React, { useEffect, useState } from "react";
import { TabWrapper, Loader } from "components";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { StoreState, setLoanBookSelectedTab } from "store";
import PcfcBookTab from "./PcfcBookTab";
import PCRELocalTabRouter from "./PCRE-Local/PCRELocalTabRouter";
import FCNRTabRouter from "./FCNR/FCNRTabRouter";
import BSSCLAITabRouter from "./BS-SC-LAI/BSSCLAITabRouter";
import LoanTertiaryRouter from "./LoanTertiaryRouter";

export interface LoanBookProps {
	setNavigationTabSwitch: Function;
}

const LoanBookHome: React.FC<LoanBookProps> = ({ setNavigationTabSwitch }) => {
	const { state } = useLocation();
	const dispatch = useDispatch();
	const { selectedTab } = useSelector(
		(state: StoreState) => state?.loanBookSelectedTab,
	);
	const [activeLoanBookTab, setActiveLoanBookTab] = useState(
		selectedTab || "Pcfc",
	);
	const [isLoading, setIsLoading] = useState(false);
	const setActiveTabInStore = (activeTab: string) => {
		setActiveLoanBookTab(activeTab);
		dispatch(setLoanBookSelectedTab(activeTab));
	};

	useEffect(() => {
		if (state?.secondTab && state.secondTab === "pcfc") {
			setActiveTabInStore("Pcfc");
		} else if (state?.secondTab && state.secondTab === "pcre") {
			setActiveTabInStore("Pcre");
		} else {
			setActiveTabInStore("Pcfc");
		}
	}, [state]);

	return (
		<Loader
			isLoading={isLoading}
			successComponent={
				<TabWrapper
					web
					tabs={[
						{
							label: "PCFC/PSFC",
							activeTabName: "Pcfc",
							component: (
								<>
									<LoanTertiaryRouter
										setNavigationTabSwitch={setNavigationTabSwitch}
									/>
								</>
							),
						},
						{
							label: `PCRE/Local`,
							activeTabName: "Pcre",
							component: (
								<>
									<PCRELocalTabRouter
										setNavigationTabSwitch={setNavigationTabSwitch}
									/>
								</>
							),
						},
						{
							label: `FCNR`,
							activeTabName: "Fcnr",
							component: (
								<>
									<FCNRTabRouter
										setNavigationTabSwitch={setNavigationTabSwitch}
									/>
								</>
							),
						},
						{
							label: `BC/SC/LAI`,
							activeTabName: "Bs",
							component: (
								<>
									<BSSCLAITabRouter
										setNavigationTabSwitch={setNavigationTabSwitch}
									/>
								</>
							),
						},
					]}
					setActiveTab={setActiveTabInStore}
					activeTab={activeLoanBookTab}
					secondTab={<></>}
				/>
			}
		/>
	);
};

export default LoanBookHome;
