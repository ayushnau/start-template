import React from "react";
import { Routes, Route } from "react-router-dom";
import { Chooser } from "components";
import Register from "./pages/auth/Register";
import VerifyOtp from "./pages/auth/VerifyOtp";
import SetPassword from "./pages/auth/SetPassword";
import Login from "./pages/login/login";
import EnterPassword from "./pages/login/EnterPassword";
import LoginBack from "./pages/login/loginBack";
import Banker from "./pages/screens/Banker";
import Business from "./pages/screens/Business";
import ResetPassword from "./pages/login/ResetPassword";
import TermsAndConditions from "./pages/termsAndPolicies/TermsAndConditions";
import PrivacyPolicies from "./pages/termsAndPolicies/PrivacyPolicies";
import FxHome from "./pages/fx/FxHome";
import EditWatchList from "./pages/fx/EditWatchList";
import SearchAndAddCurrencyPairs from "./pages/fx/SearchAndAddCurrencyPairs";
import SelectCurrencyPair from "./pages/fx/Components/SelectCurrencyPair";
import Logout from "./pages/logout/Logout";
import ProtectedRoute from "./ProtectedRoute";
import AddTrade from "./pages/fx/portfolio/Trade/AddTrade";
import CashPayment from "./pages/fx/portfolio/Trade/RecordCashPayment";
import CreateLedger from "./pages/fx/portfolio/ledger/CreateLedger";
import Ledger from "./pages/fx/portfolio/ledger/Ledger";
import Trade from "./pages/fx/portfolio/Trade/Trade";
import UpdateTrade from "./pages/fx/portfolio/Trade/UpdateTrade";
import AddHedge from "./pages/fx/portfolio/Hedges/AddHedge";
import Hedge from "./pages/fx/portfolio/Hedges/Hedge";
import UpdateHedge from "./pages/fx/portfolio/Hedges/UpdateHedge";
import UpdateEefcAccount from "components/src/web-components/src/EEFC/UpdateEefcAccount";
import LinkHedges from "./pages/fx/portfolio/Trade/LinkHedges";
import LinkedHedges from "./pages/fx/portfolio/Trade/LinkedHedges";
import RecordPaymentsHome from "./pages/fx/portfolio/Trade/RecordPaymentsHome";
import UseHedge from "./pages/fx/portfolio/Trade/UseHedge";
import CancelHedge from "./pages/fx/portfolio/Hedges/CancelHedge";
import { default as HedgeUseHedge } from "./pages/fx/portfolio/Hedges/UseHedge";
import UpdateUnlinkHedge from "./pages/fx/portfolio/Hedges/UpdateUnlinkHedge";
import TransactionDetails from "./pages/fx/portfolio/TransactionDetails";
import EefcTransactionDetails from "./pages/fx/portfolio/EefcAccount/EefcTransactionDetails";
import EefcViewBalance from "./pages/fx/portfolio/EefcAccount/EefcViewBalance";
import CurrencyDetails from "./pages/fx/portfolio/ledger/CurrencyDetails";
import CurrencyPairDetails from "./pages/fx/portfolio/ledger/CurrencyPairDetails";
import BorrowingCostComparison from "./pages/fx/borrowingCostComparison";
import ExportBorrowingForm from "./pages/fx/borrowingCostComparison/ExportBorrowingForm";
import BorrowingDetailsScreen from "./pages/fx/borrowingCostComparison/BorrowingDetails";
import TenorFormScreen from "./pages/fx/borrowingCostComparison/TenorForm";
import FixingFrequencyFormScreen from "./pages/fx/borrowingCostComparison/FixingFrequencyForm";
import INRDetailsScreen from "./pages/fx/borrowingCostComparison/INRDetails";
import BorrowingResultsScreen from "./pages/fx/borrowingCostComparison/BorrowingResults";
import MoratoriumFormScreen from "./pages/fx/borrowingCostComparison/MoratoriumForm";
import RepaymentFormScreen from "./pages/fx/borrowingCostComparison/RepaymentForm";
import RateCalculator from "./pages/fx/Components/RateCalculator";
import RateAlerts from "./pages/fx/alerts/NoAlerts";
import IEForm from "./pages/fx/importExport/IEForm";
import MonthSelectionForm from "./pages/fx/importExport/MonthSelectionForm";
import EnterAmountForm from "./pages/fx/importExport/EnterAmountForm";
import QuoteReview from "./pages/fx/importExport/QuoteReview";
import ContactUs from "./pages/fx/AccountsScreens/ContactUs";
import Subscription from "./pages/fx/AccountsScreens/Subscription";
import { UnknownRouteHandler } from "components";
import AddEdcTradeDetails from "components/src/web-components/src/Tools/CheckEdc/AddEdcTradeDetails";
import CVHHedgeDetails from "components/src/web-components/src/Tools/CashVSHedgePickUp/CVHHedgeDetails";
import CashVSHedgePickUpHome from "components/src/web-components/src/Tools/CashVSHedgePickUp/CashVSHedgePickUpHome";
import AmountForm from "components/src/web-components/src/Tools/CashVSHedgePickUp/AmountForm";
import CashVSHedgePickupResult from "components/src/web-components/src/Tools/CashVSHedgePickUp/CashVSHedgePickupResult";
import AverageList from "components/src/web-components/src/Tools/CashVSHedgePickUp/AverageList";
import CalculateRolloverChargesHome from "components/src/web-components/src/Tools/CalculateRolloverCharges/CalculateRolloverChargesHome";
import FcnrCostCalculatorHome from "components/src/web-components/src/Tools/FcnrCostCalculator/FcnrCostCalculatorHome";
import FcnrLoanDate from "components/src/web-components/src/Tools/FcnrCostCalculator/FcnrLoanDate";
import FcnrLoanAmt from "components/src/web-components/src/Tools/FcnrCostCalculator/FcnrLoanAmt";
import FcnrLoanTenor from "components/src/web-components/src/Tools/FcnrCostCalculator/FcnrLoanTenor";
import FcnrInterestRate from "components/src/web-components/src/Tools/FcnrCostCalculator/FcnrInterestRate";
import FcnrSpread from "components/src/web-components/src/Tools/FcnrCostCalculator/FcnrSpread";
import FcnrResults from "components/src/web-components/src/Tools/FcnrCostCalculator/FcnrResults";
import FcnrLoanRepayment from "components/src/web-components/src/Tools/FcnrCostCalculator/FcnrLoanRepaymentRate";
import FcnrTenorForm from "components/src/web-components/src/Tools/FcnrCostCalculator/FcnrTenorForm";
import BcCostCalculatorHome from "components/src/web-components/src/Tools/BcCostCalculator/BcCostCalculatorHome";
import BcLoanStartDate from "components/src/web-components/src/Tools/BcCostCalculator/BcLoanStartDate";
import BcLoanAmt from "components/src/web-components/src/Tools/BcCostCalculator/BcLoanAmt";
import BcTenor from "components/src/web-components/src/Tools/BcCostCalculator/BcTenor";
import BcInterestRate from "components/src/web-components/src/Tools/BcCostCalculator/BcInterestRate";
import BcFixingFreq from "components/src/web-components/src/Tools/BcCostCalculator/BcFixingFreq";
import BcSpread from "components/src/web-components/src/Tools/BcCostCalculator/BcSpread";
import BcResults from "components/src/web-components/src/Tools/BcCostCalculator/BcResults";
import BcLoanRepayment from "components/src/web-components/src/Tools/BcCostCalculator/BcLoanRepayment";
interface RoutesListProps {
	setKeyboardOpen: (isOpen: boolean) => void;
}

const RoutesList: React.FC<{}> = () => {
	return (
		<Routes>
			<Route path="/" element={<Business />} />
			<Route path="/info-business-page" element={<Business />} />
			{/* <Route path="/info-banker-page" element={<Banker />} /> */}
			<Route path="/register" element={<Register />} />
			<Route path="/verify" element={<VerifyOtp />} />
			<Route path="/set-password" element={<SetPassword />} />
			<Route path="/login" element={<Login />} />
			<Route path="/enter-password" element={<EnterPassword />} />
			<Route path="/login-back" element={<LoginBack />} />
			<Route path="/reset-password" element={<ResetPassword />} />
			<Route path="/terms-and-conditions" element={<TermsAndConditions />} />
			<Route path="/privacy-policy" element={<PrivacyPolicies />} />
			<Route
				path="/fx-home"
				element={<ProtectedRoute children={<FxHome />} />}
			/>
			<Route
				path="/fx-home/contact-us"
				element={<ProtectedRoute children={<ContactUs />} />}
			/>
			<Route
				path="/fx-home/subscription"
				element={<ProtectedRoute children={<Subscription />} />}
			/>
			<Route
				path="/fx-home/rate-calculator"
				element={<ProtectedRoute children={<RateCalculator />} />}
			/>
			<Route
				path="/fx-home/rate-alerts"
				element={<ProtectedRoute children={<RateAlerts />} />}
			/>
			{/* RateAlerts */}
			<Route path="/edit-watchlist" element={<EditWatchList />} />
			<Route path="/search-and-add" element={<SearchAndAddCurrencyPairs />} />
			<Route path="/select-pair" element={<SelectCurrencyPair />} />
			<Route path="/logout" element={<Logout />} />
			<Route
				path="/create-ledger"
				element={<ProtectedRoute children={<CreateLedger />} />}
			/>
			<Route
				path="/ledger/:id"
				element={<ProtectedRoute children={<Ledger />} />}
			/>
			<Route
				path="ledger/:ledgerId/trade/:tradeId"
				element={<ProtectedRoute children={<Trade />} />}
			/>
			<Route
				path="/add-trade/:ledgerId"
				element={<ProtectedRoute children={<AddTrade />} />}
			/>
			<Route
				path="/ledger/:ledgerId/trade/:tradeId/cash-payment"
				element={<ProtectedRoute children={<CashPayment />} />}
			/>
			<Route
				path="ledger/:ledgerId/update-trade/:tradeId"
				element={<ProtectedRoute children={<UpdateTrade />} />}
			/>
			<Route
				path="/add-hedge"
				element={<ProtectedRoute children={<AddHedge />} />}
			/>
			<Route
				path="/hedge/:hedgeId"
				element={<ProtectedRoute children={<Hedge />} />}
			/>
			<Route
				path="/update-hedge/:hedgeId"
				element={<ProtectedRoute children={<UpdateHedge />} />}
			/>
			<Route
				path="/update-unlinked-hedge/:hedgeId"
				element={<ProtectedRoute children={<UpdateUnlinkHedge />} />}
			/>
			<Route
				path="/cancel-hedge/:hedgeId"
				element={<ProtectedRoute children={<CancelHedge />} />}
			/>
			<Route
				path="/use-hedge/:hedgeId"
				element={<ProtectedRoute children={<HedgeUseHedge />} />}
			/>
			<Route
				path="/ledger/:ledgerId/trade/:tradeId/linked"
				element={<ProtectedRoute children={<LinkedHedges />} />}
			/>
			<Route
				path="/ledger/:ledgerId/trade/:tradeId/record-payments"
				element={<ProtectedRoute children={<RecordPaymentsHome />} />}
			/>
			<Route
				path="/ledger/:ledgerId/trade/:tradeId/hedge/:hedgeId/use-hedge"
				element={<ProtectedRoute children={<UseHedge />} />}
			/>
			<Route
				path="/ledger/:ledgerId/trade/:tradeId/link-hedge"
				element={<ProtectedRoute children={<LinkHedges />} />}
			/>
			<Route
				path="/ledger/:ledgerId/trade/:tradeId/transactions"
				element={<ProtectedRoute children={<TransactionDetails />} />}
			/>
			<Route
				path="/hedge/:hedgeId/transactions"
				element={<ProtectedRoute children={<TransactionDetails />} />}
			/>
			<Route
				path="/fx-home/summary/:currency"
				element={<ProtectedRoute children={<CurrencyDetails />} />}
			/>
			<Route
				path="/fx-home/summary/:currency/:currencyPair"
				element={<ProtectedRoute children={<CurrencyPairDetails />} />}
			/>
			<Route
				path="/fx-home/borrowing-cost-comparison"
				element={<ProtectedRoute children={<BorrowingCostComparison />} />}
			/>
			<Route
				path="/fx-home/borrowing-cost-comparison/export"
				element={<ProtectedRoute children={<ExportBorrowingForm />} />}
			/>
			<Route
				path="/fx-home/borrowing-cost-comparison/details"
				element={<ProtectedRoute children={<BorrowingDetailsScreen />} />}
			/>
			<Route
				path="/fx-home/borrowing-cost-comparison/details/tenor"
				element={<ProtectedRoute children={<TenorFormScreen />} />}
			/>
			<Route
				path="/fx-home/borrowing-cost-comparison/details/moratorium"
				element={<ProtectedRoute children={<MoratoriumFormScreen />} />}
			/>
			<Route
				path="/fx-home/borrowing-cost-comparison/details/repayment"
				element={<ProtectedRoute children={<RepaymentFormScreen />} />}
			/>
			<Route
				path="/fx-home/borrowing-cost-comparison/details/fixing"
				element={<ProtectedRoute children={<FixingFrequencyFormScreen />} />}
			/>
			<Route
				path="/fx-home/borrowing-cost-comparison/details/inr"
				element={<ProtectedRoute children={<INRDetailsScreen />} />}
			/>
			<Route
				path="/fx-home/borrowing-cost-comparison/details/results"
				element={<ProtectedRoute children={<BorrowingResultsScreen />} />}
			/>
			{/* FX-Tools Import Export */}
			<Route
				path="/fx-home/import-cost-analyser"
				element={<ProtectedRoute children={<IEForm />} />}
			/>
			<Route
				path="/fx-home/export-quote-evaluation"
				element={<ProtectedRoute children={<IEForm />} />}
			/>
			<Route
				path="/fx-home/import-cost-analyser/select-months"
				element={<ProtectedRoute children={<MonthSelectionForm />} />}
			/>
			<Route
				path="/fx-home/export-quote-evaluation/select-months"
				element={<ProtectedRoute children={<MonthSelectionForm />} />}
			/>
			<Route
				path="/fx-home/import-cost-analyser/enter-amount"
				element={<ProtectedRoute children={<EnterAmountForm />} />}
			/>
			<Route
				path="/fx-home/export-quote-evaluation/enter-amount"
				element={<ProtectedRoute children={<EnterAmountForm />} />}
			/>
			<Route
				path="/fx-home/import-cost-analyser/review"
				element={<ProtectedRoute children={<QuoteReview />} />}
			/>
			<Route
				path="/fx-home/export-quote-evaluation/review"
				element={<ProtectedRoute children={<QuoteReview />} />}
			/>
			<Route
				path="/fx-home/check-edc/add-trade-details"
				element={<ProtectedRoute children={<AddEdcTradeDetails mobile />} />}
			/>
			<Route
				path="/fx-home/cash-vs-hedge-pickup"
				element={<ProtectedRoute children={<CashVSHedgePickUpHome />} />}
			/>
			<Route
				path="/fx-home/cash-vs-hedge-pickup/hedge-breakdown"
				element={<ProtectedRoute children={<CVHHedgeDetails />} />}
			/>
			<Route
				path="/fx-home/cash-vs-hedge-pickup/amount-form"
				element={<ProtectedRoute children={<AmountForm />} />}
			/>
			<Route
				path="/fx-home/cash-vs-hedge-pickup/results"
				element={<ProtectedRoute children={<CashVSHedgePickupResult />} />}
			/>
			<Route
				path="/fx-home/cash-vs-hedge-pickup/results/average-list"
				element={<ProtectedRoute children={<AverageList />} />}
			/>

			<Route
				path="/fx-home/calculate-rollover-charges"
				element={<ProtectedRoute children={<CalculateRolloverChargesHome />} />}
			/>
			<Route
				path="/fx-home/fcnr-cost-calculator"
				element={<ProtectedRoute children={<FcnrCostCalculatorHome />} />}
			/>

			<Route
				path="/fx-home/fcnr-cost-calculator/details"
				element={<ProtectedRoute children={<FcnrLoanDate />} />}
			/>
			<Route
				path="/fx-home/fcnr-cost-calculator/details/loan_amt"
				element={<ProtectedRoute children={<FcnrLoanAmt />} />}
			/>
			<Route
				path="/fx-home/fcnr-cost-calculator/details/loan_amt/tenor"
				element={<ProtectedRoute children={<FcnrLoanTenor />} />}
			/>
			<Route
				path="/fx-home/fcnr-cost-calculator/details/loan_amt/tenor/int_rate"
				element={<ProtectedRoute children={<FcnrInterestRate />} />}
			/>
			<Route
				path="/fx-home/fcnr-cost-calculator/details/loan_amt/tenor/int_rate/sofr"
				element={<ProtectedRoute children={<FcnrTenorForm />} />}
			/>
			<Route
				path="/fx-home/fcnr-cost-calculator/details/loan_amt/tenor/int_rate/sofr/spread"
				element={<ProtectedRoute children={<FcnrSpread />} />}
			/>
			<Route
				path="/fx-home/fcnr-cost-calculator/details/loan_amt/tenor/int_rate/result"
				element={<ProtectedRoute children={<FcnrResults />} />}
			/>
			<Route
				path="/fx-home/fcnr-cost-calculator/details/loan_amt/tenor/int_rate/repay_rate"
				element={<ProtectedRoute children={<FcnrLoanRepayment />} />}
			/>
			{/* bc/sc Tool routes */}
			<Route
				path="/fx-home/bc-sc-calculator"
				element={<ProtectedRoute children={<BcCostCalculatorHome />} />}
			/>
			<Route
				path="/fx-home/bc-sc-calculator/details/"
				element={<ProtectedRoute children={<BcLoanStartDate />} />}
			/>
			<Route
				path="/fx-home/bc-sc-calculator/details/loan_amt"
				element={<ProtectedRoute children={<BcLoanAmt />} />}
			/>
			<Route
				path="/fx-home/bc-sc-calculator/details/loan_amt/tenor"
				element={<ProtectedRoute children={<BcTenor />} />}
			/>
			<Route
				path="fx-home/bc-sc-calculator/details/loan_amt/tenor/int_rate"
				element={<ProtectedRoute children={<BcInterestRate />} />}
			/>
			<Route
				path="fx-home/bc-sc-calculator/details/loan_amt/tenor/int_rate/freq"
				element={<ProtectedRoute children={<BcFixingFreq />} />}
			/>
			<Route
				path="fx-home/bc-sc-calculator/details/loan_amt/tenor/int_rate/freq/spread"
				element={<ProtectedRoute children={<BcSpread />} />}
			/>
			<Route
				path="fx-home/bc-sc-calculator/details/loan_amt/tenor/int_rate/repay_rate"
				element={<ProtectedRoute children={<BcLoanRepayment />} />}
			/>
			<Route
				path="fx-home/bc-sc-calculator/details/loan_amt/tenor/int_rate/result"
				element={<ProtectedRoute children={<BcResults />} />}
			/>
			<Route path="*" element={<UnknownRouteHandler />} />
			{/* EEFC Account */}
			<Route
				path="/update-eefc-account/:eefcId"
				element={<ProtectedRoute children={<UpdateEefcAccount />} />}
			/>
			<Route
				path="/eefc-account/:eefcId/transactions"
				element={<ProtectedRoute children={<EefcTransactionDetails />} />}
			/>
			<Route
				path="/eefc-account/:eefcId/view_balances"
				element={<ProtectedRoute children={<EefcViewBalance />} />}
			/>
		</Routes>
	);
};

export default RoutesList;
