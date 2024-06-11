import React from "react";
import { Routes, Route } from "react-router-dom";
import CurrencyDetails from "../Summary/CurrencyDetails";
import CurrencyPairDetails from "../Summary/CurrencyPairDetails";
import EmptySummarySection from "./EmptySummarySection";

const SummarySecondaryRouter: React.FC = () => {
	return (
		<Routes>
			<Route path="*" element={<EmptySummarySection />} />
			<Route path="/summary/:currency" element={<CurrencyDetails />} />
			<Route
				path="/summary/:currency/:currencyPair"
				element={<CurrencyPairDetails web={true} />}
			/>
		</Routes>
	);
};

export default SummarySecondaryRouter;
