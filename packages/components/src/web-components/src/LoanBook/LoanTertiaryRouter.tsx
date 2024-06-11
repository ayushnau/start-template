import React from "react";
import { Routes, Route } from "react-router-dom";
import PcfcLoanHome from "../PCFC/PcfcLoanHome";
import PCFCTab from "../PCFC/PCFCTab";
import RepayLoan from "../PCFC/RepayLoan";

export interface LoanTertiaryRouterInterface {
	setNavigationTabSwitch: any;
}

const LoanTertiaryRouter: React.FC<LoanTertiaryRouterInterface> = ({}) => {
	return (
		<Routes>
			<Route path="*" element={<PcfcLoanHome />} />
			{/* /trade/

			/eefc// */}
		</Routes>
	);
};

export default LoanTertiaryRouter;
