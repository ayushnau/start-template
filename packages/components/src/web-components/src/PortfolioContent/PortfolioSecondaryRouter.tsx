import React from "react";
import { Routes, Route } from "react-router-dom";
import EmptyLedgersSection from "./EmptyLedgersSection";
import Ledger from "./Ledger";
import { LedgersSummary } from "../../../summary/LedgersSummary";

export interface PortfolioSecondaryRouterInterface {}

const PortfolioSecondaryRouter: React.FC<
	PortfolioSecondaryRouterInterface
> = ({}) => {
	return (
		<Routes>
			{/* Trade Routes are here */}
			<Route path="*" element={<EmptyLedgersSection />} />
			<Route path="/ledger/:id/*" element={<Ledger />} />
			<Route path="/ledger/:id/summary/*" element={<LedgersSummary />} />
		</Routes>
	);
};

export default PortfolioSecondaryRouter;
