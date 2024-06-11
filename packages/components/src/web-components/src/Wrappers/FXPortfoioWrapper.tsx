import React from "react";
import PortfolioHome from "../PortfolioContent/PortfolioHome";
import { Routes, Route } from "react-router-dom";
import UseHedges from "../PortfolioContent/UseHedges";
import UseHedgeEefc from "../PortfolioContent/UseHedgeEefc";
import ImportNetOffEefc from "../PortfolioContent/ImportNetOffEefc";
import RecordPCFCRepayment from "../PortfolioContent/RecordPCFCRepayment";

export interface FXPortfolioWrapperInterface {}

const FXPortfolioWrapper: React.FC<FXPortfolioWrapperInterface> = ({}) => {
	return (
		<div className="w-full h-[calc(100vh-52px)] flex flex-col">
			<Routes>
				<Route
					path="/*"
					element={<PortfolioHome setNavigationTabSwitch={() => {}} />}
				/>
				<Route
					path="/ledger/:ledgerId/trade/:tradeId/use-hedges"
					element={<UseHedges />}
				/>
				<Route
					path="/eefc-account/:eefcId/use-hedges"
					element={<UseHedgeEefc />}
				/>
				<Route
					path="/eefc-account/:eefcId/import-net-off"
					element={<ImportNetOffEefc />}
				/>
				<Route
					path="/ledger/:ledgerId/trade/:tradeId/record-pcfc-repayment"
					element={<RecordPCFCRepayment />}
				/>
			</Routes>
		</div>
	);
};

export default FXPortfolioWrapper;
