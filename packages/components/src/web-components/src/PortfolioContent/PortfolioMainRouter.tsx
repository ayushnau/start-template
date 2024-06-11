import React from "react";
import { Routes, Route } from "react-router-dom";
import PortfolioHome from "./PortfolioHome";
import CreateLedger from "./CreateLedger";

export interface PortfolioMainRouterInterface {}

const PortfolioMainRouter: React.FC<PortfolioMainRouterInterface> = ({}) => {
	return (
		<Routes>
			<Route
				path="/*"
				element={<PortfolioHome setNavigationTabSwitch={() => {}} />}
			/>
			<Route path="/create-ledger" element={<CreateLedger />} />
		</Routes>
	);
};

export default PortfolioMainRouter;
