import React from "react";
import LoanBookHome from "../LoanBook/LoanBookHome";
import { Routes, Route } from "react-router-dom";
import RepayLoan from "../PCFC/RepayLoan";

export interface LoanBookWrapperInterface {}

const LoanBookWrapper: React.FC<LoanBookWrapperInterface> = ({}) => {
	return (
		<div className="w-full h-[calc(100vh-52px)] flex flex-col">
			<Routes>
				<Route
					path="/*"
					element={<LoanBookHome setNavigationTabSwitch={() => {}} />}
				/>
				<Route path="/loan-repay/:pcfcId/*" element={<RepayLoan />} />
			</Routes>
		</div>
	);
};

export default LoanBookWrapper;
