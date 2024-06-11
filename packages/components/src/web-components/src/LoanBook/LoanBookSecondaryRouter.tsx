import React from "react";
import { Routes, Route } from "react-router-dom";
import CurrencyDetails from "../Summary/CurrencyDetails";
import AddLoan from "./AddLoan";
import AddLoanStepTwo from "./AddLoanStepTwo";
import LoansListTable from "./LoansListTable";
import LoanPcfcQuestions from "./LoanPcfcQuestions";
import PCFC from "./PCFC/PCFC";
import UpdatePcfc from "./PCFC/UpdatePcfc";
import UpdateLoanStepTwo from "./PCFC/UpdateLoanStepTwo";
import PCFCTransactionDetails from "./PCFC/PCFCTransactionDetails";

const LoanBookSecondaryRouter: React.FC = () => {
	return (
		<Routes>
			<Route path="/add-loan/" element={<AddLoan />} />
			<Route path="/pcfc-faqs/" element={<LoanPcfcQuestions />} />
			<Route path="/add-loan/step-two" element={<AddLoanStepTwo />} />
			<Route path="/add-loan/step-two/list" element={<LoansListTable />} />
			<Route path="/pcfc/:pcfcId" element={<PCFC />} />
			<Route path="/update-pcfc/:pcfcId" element={<UpdatePcfc />} />
			<Route
				path="/update-pcfc/step-two/:pcfcId"
				element={<UpdateLoanStepTwo />}
			/>
			<Route
				path="/pcfc/:pcfcId/transactions"
				element={<PCFCTransactionDetails />}
			/>
		</Routes>
	);
};

export default LoanBookSecondaryRouter;
