import React from "react";
import { Routes, Route } from "react-router-dom";
import NoToolsScreen from "./NoToolsScreen";
// import { useLocation } from "react-router-dom";
import RateCalculator from "./RateCalculator/RatesCalculator";
import RateAlerts from "./RateAlerts/RateAlerts";
import BorrowingCostComparisonHome from "./BorrowingCostComparison/BorrowingCostComparisonHome";
import ExportBorrowingForm from "./BorrowingCostComparison/ExportBorrowingForm";
import BorrowingDetails from "./BorrowingCostComparison/BorrowingDetails";
import TenorForm from "./BorrowingCostComparison/TenorForm";
import MoratoriumForm from "./BorrowingCostComparison/MoratoriumForm";
import FixingFrequencyForm from "./BorrowingCostComparison/FixingFrequencyForm";
import RepaymentForm from "./BorrowingCostComparison/RepaymentForm";
import INRDetails from "./BorrowingCostComparison/INRDetails";
import BorrowingResults from "./BorrowingCostComparison/BorrowingResults";
import IEForm from "./ImportExportTools/IEForm";
import AddEdcTradeDetails from "./CheckEdc/AddEdcTradeDetails";
import CalculateRolloverChargesHome from "./CalculateRolloverCharges/CalculateRolloverChargesHome";
import CashVSHedgePickUpHome from "./CashVSHedgePickUp/CashVSHedgePickUpHome";
import CVHHedgeDetails from "./CashVSHedgePickUp/CVHHedgeDetails";
import AmountForm from "./CashVSHedgePickUp/AmountForm";
import CashVSHedgePickupResult from "./CashVSHedgePickUp/CashVSHedgePickupResult";
import AverageList from "./CashVSHedgePickUp/AverageList";
import FcnrCostCalculatorHome from "./FcnrCostCalculator/FcnrCostCalculatorHome";
import FcnrLoanDate from "./FcnrCostCalculator/FcnrLoanDate";
import FcnrLoanAmt from "./FcnrCostCalculator/FcnrLoanAmt";
import FcnrLoanTenor from "./FcnrCostCalculator/FcnrLoanTenor";
import FcnrInterestRate from "./FcnrCostCalculator/FcnrInterestRate";
import FcnrSpread from "./FcnrCostCalculator/FcnrSpread";
import FcnrResults from "./FcnrCostCalculator/FcnrResults";
import FcnrLoanRepayment from "./FcnrCostCalculator/FcnrLoanRepaymentRate";
import FcnrTenorForm from "./FcnrCostCalculator/FcnrTenorForm";
import BcCostCalculatorHome from "./BcCostCalculator/BcCostCalculatorHome";
import BcLoanStartDate from "./BcCostCalculator/BcLoanStartDate";
import BcLoanAmt from "./BcCostCalculator/BcLoanAmt";
import BcTenor from "./BcCostCalculator/BcTenor";
import BcInterestRate from "./BcCostCalculator/BcInterestRate";
import BcFixingFreq from "./BcCostCalculator/BcFixingFreq";
import BcSpread from "./BcCostCalculator/BcSpread";
import BcResults from "./BcCostCalculator/BcResults";
import BcLoanRepayment from "./BcCostCalculator/BcLoanRepayment";

export interface ToolsSecondaryRouterInterface {}

const ToolsSecondaryRouter: React.FC<ToolsSecondaryRouterInterface> = ({}) => {
	return (
		<Routes>
			<Route path="*" element={<NoToolsScreen />} />
			<Route path="/rate-calculator" element={<RateCalculator web />} />
			<Route path="/rate-alerts" element={<RateAlerts />} />
			{/* Borrowing Cost Comparison Routings */}
			<Route
				path="/borrowing-cost-comparison"
				element={<BorrowingCostComparisonHome />}
			/>
			<Route
				path="/borrowing-cost-comparison/export"
				element={<ExportBorrowingForm />}
			/>
			<Route
				path="/borrowing-cost-comparison/import"
				element={<ExportBorrowingForm />}
			/>
			<Route
				path="/borrowing-cost-comparison/details"
				element={<BorrowingDetails />}
			/>
			<Route
				path="/borrowing-cost-comparison/details/tenor"
				element={<TenorForm />}
			/>
			<Route
				path="/borrowing-cost-comparison/details/moratorium"
				element={<MoratoriumForm />}
			/>
			<Route
				path="/borrowing-cost-comparison/details/fixing"
				element={<FixingFrequencyForm />}
			/>
			<Route
				path="/borrowing-cost-comparison/details/repayment"
				element={<RepaymentForm />}
			/>
			<Route
				path="/borrowing-cost-comparison/details/inr"
				element={<INRDetails />}
			/>
			<Route
				path="/borrowing-cost-comparison/details/results"
				element={<BorrowingResults />}
			/>
			<Route
				path="/check-edc/add-trade-details"
				element={<AddEdcTradeDetails />}
			/>
			<Route
				path="/calculate-rollover-charges"
				element={<CalculateRolloverChargesHome web />}
			/>

			{/* Import Export Tools Routing */}
			<Route path="/import-cost-analyser" element={<IEForm />} />
			<Route path="/export-quote-evaluation" element={<IEForm />} />
			<Route
				path="/cash-vs-hedge-pickup"
				element={<CashVSHedgePickUpHome web />}
			/>
			<Route
				path="/cash-vs-hedge-pickup/hedge-breakdown"
				element={<CVHHedgeDetails web />}
			/>
			<Route
				path="/cash-vs-hedge-pickup/amount-form"
				element={<AmountForm web />}
			/>
			<Route
				path="/cash-vs-hedge-pickup/results"
				element={<CashVSHedgePickupResult web />}
			/>
			<Route
				path="/cash-vs-hedge-pickup/results/average-list"
				element={<AverageList web />}
			/>
			<Route
				path="/fcnr-cost-calculator"
				element={<FcnrCostCalculatorHome web />}
			/>
			<Route
				path="/fcnr-cost-calculator/details"
				element={<FcnrLoanDate web />}
			/>
			<Route
				path="/fcnr-cost-calculator/details/loan_amt"
				element={<FcnrLoanAmt web />}
			/>
			<Route
				path="/fcnr-cost-calculator/details/loan_amt/tenor"
				element={<FcnrLoanTenor web />}
			/>
			<Route
				path="/fcnr-cost-calculator/details/loan_amt/tenor/int_rate/"
				element={<FcnrInterestRate web />}
			/>

			<Route
				path="/fcnr-cost-calculator/details/loan_amt/tenor/int_rate/sofr"
				element={<FcnrTenorForm web />}
			/>
			<Route
				path="/fcnr-cost-calculator/details/loan_amt/tenor/int_rate/sofr/spread"
				element={<FcnrSpread web />}
			/>
			<Route
				path="/fcnr-cost-calculator/details/loan_amt/tenor/int_rate/result"
				element={<FcnrResults web />}
			/>
			<Route
				path="/fcnr-cost-calculator/details/loan_amt/tenor/int_rate/repay_rate"
				element={<FcnrLoanRepayment web />}
			/>
			{/* BC/SC Tool routes */}
			<Route path="/bc-sc-calculator" element={<BcCostCalculatorHome web />} />
			<Route
				path="/bc-sc-calculator/details"
				element={<BcLoanStartDate web />}
			/>
			<Route
				path="/bc-sc-calculator/details/loan_amt"
				element={<BcLoanAmt web />}
			/>
			<Route
				path="/bc-sc-calculator/details/loan_amt/tenor"
				element={<BcTenor web />}
			/>
			<Route
				path="/bc-sc-calculator/details/loan_amt/tenor/int_rate"
				element={<BcInterestRate web />}
			/>
			<Route
				path="/bc-sc-calculator/details/loan_amt/tenor/int_rate/freq/"
				element={<BcFixingFreq web />}
			/>
			<Route
				path="/bc-sc-calculator/details/loan_amt/tenor/int_rate/freq/spread"
				element={<BcSpread web />}
			/>
			<Route
				path="/bc-sc-calculator/details/loan_amt/tenor/int_rate/repay_rate"
				element={<BcLoanRepayment web />}
			/>
			<Route
				path="/bc-sc-calculator/details/loan_amt/tenor/int_rate/result"
				element={<BcResults web />}
			/>
		</Routes>
	);
};

export default ToolsSecondaryRouter;
