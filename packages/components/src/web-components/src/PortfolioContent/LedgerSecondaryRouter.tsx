import React from "react";
import { Routes, Route } from "react-router-dom";
import Trade from "./Trade";
import TransactionDetails from "../../../../../../apps/wiredup/src/pages/fx/portfolio/TransactionDetails";
import UpdateTrade from "../Trades/UpdateTrade";
import AddTrade from "../Trades/AddTrade";
// import Ledger from "./Ledger";
import RecordCashPayment from "../Trades/RecordCashPayment";
import LinkHedges from "../Trades/LinkHedges";
import LinkedHedges from "../Trades/LinkedHedges";
import UseHedge from "../Trades/UseHedge";
import RecordPaymentsHome from "../Trades/RecordPayments";
import Hedge from "../Hedges/Hedge";
import AddHedge from "../Hedges/AddHedge";
import UpdateHedge from "../Hedges/UpdateHedge";
import HedgeUseHedge from "../Hedges/UseHedge";
import CancelHedge from "../Hedges/CancelHedge";
import CreateLedger from "./CreateLedger";
import UpdateUnlinkHedge from "../Hedges/UpdateUnlinkHedge";
import RecordCashBulkPayment from "./RecordCashBulkPayment";
import AddCreditEntry from "../EEFC/AddCreditEntry";
import TransferToEefc from "./TransferToEefc";
import AddBankCharges from "./AddBankCharges";
import EEFCAccount from "../EEFC/EEFCAccount";
import UpdateEefcAccount from "../EEFC/UpdateEefcAccount";
import EefcCashRecordPayment from "../EEFC/EefcCashRecordPayment";
import EefcTransactionDetails from "../../../../../../apps/wiredup/src/pages/fx/portfolio/EefcAccount/EefcTransactionDetails";

const LedgerSecondaryRouter: React.FC = () => {
	return (
		<Routes>
			<Route path="/create-ledger" element={<CreateLedger />} />
			<Route path="/ledger/:ledgerId/add-trade/*" element={<AddTrade />} />
			<Route path="/ledger/:ledgerId/trade/:tradeId" element={<Trade />} />
			<Route
				path="/ledger/:ledgerId/trade/:tradeId/record-cash-bulk-payment"
				element={<RecordCashBulkPayment />}
			/>
			<Route
				path="/ledger/:ledgerId/trade/:tradeId/cash-payment"
				element={<RecordCashPayment />}
			/>
			<Route
				path="/ledger/:ledgerId/update-trade/:tradeId"
				element={<UpdateTrade />}
			/>
			<Route
				path="/ledger/:ledgerId/trade/:tradeId/transactions"
				element={<TransactionDetails web={true} />}
			/>
			<Route
				path="/ledger/:ledgerId/trade/:tradeId/linked/add-hedge"
				element={<AddHedge />}
			/>
			<Route
				path="/ledger/:ledgerId/trade/:tradeId/link-hedge"
				element={<LinkHedges />}
			/>
			<Route
				path="/ledger/:ledgerId/trade/:tradeId/linked"
				element={<LinkedHedges />}
			/>
			<Route
				path="/ledger/:ledgerId/trade/:tradeId/hedge/:hedgeId/use-hedge"
				element={<UseHedge />}
			/>
			<Route
				path="/ledger/:ledgerId/trade/:tradeId/record-payments"
				element={<RecordPaymentsHome />}
			/>
			<Route
				path="/ledger/:ledgerId/trade/:tradeId/transfer-to-eefc"
				element={<TransferToEefc />}
			/>
			<Route
				path="/ledger/:ledgerId/trade/:tradeId/add-bank-charges"
				element={<AddBankCharges />}
			/>
			{/* Hedge Routes */}
			<Route path="/hedge/:hedgeId" element={<Hedge />} />
			<Route path="/add-hedge/" element={<AddHedge />} />
			<Route path="/update-hedge/:hedgeId" element={<UpdateHedge />} />
			<Route path="/cancel-hedge/:hedgeId" element={<CancelHedge />} />
			<Route path="/use-hedge/:hedgeId" element={<HedgeUseHedge />} />
			<Route
				path="/update-unlinked-hedge/:hedgeId"
				element={<UpdateUnlinkHedge />}
			/>
			<Route
				path="/hedge/:hedgeId/transactions"
				element={<TransactionDetails web={true} />}
			/>
			{/* EEFC Routes */}
			<Route path="/add-credit-entry" element={<AddCreditEntry />} />
			<Route path="/eefc-account/:eefcId" element={<EEFCAccount />} />
			<Route
				path="/update-eefc-account/:eefcId"
				element={<UpdateEefcAccount />}
			/>
			<Route
				path="/eefc-account/:eefcId/record-cash-payment"
				element={<EefcCashRecordPayment />}
			/>
			<Route
				path="/eefc-account/:eefcId/transactions"
				element={<EefcTransactionDetails web={true} />}
			/>
		</Routes>
	);
};

export default LedgerSecondaryRouter;
