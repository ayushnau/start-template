import React from "react";
import { getHedgesSummary } from "services";
import { Loader } from "../../../..";
import { Routes, Route } from "react-router-dom";
import HedgesSummaryMain from "./HedgesSummaryMain";
import {
	getSummaryFormattedMTMData,
	getSummaryFormattedVolumeData,
} from "utils";
import { EmptySummarySection } from "components";
import HedgesCurrencyDetails from "./HedgesCurrencyDetails";
import HedgesSummaryCurrencyPairDetails from "../../../summary/HedgesSummaryCurrencyPairDetails";

export interface HedgesSummaryInterface {}

const HedgesSummary: React.FC<HedgesSummaryInterface> = ({}) => {
	const [isLoading, setIsLoading] = React.useState(true);
	const [summaryData, setSummaryData] = React.useState<any>();

	const init = async () => {
		try {
			const hedges_summary_data: any = await getHedgesSummary();
			if (hedges_summary_data) {
				const mtm_data = getSummaryFormattedMTMData(
					hedges_summary_data.currency_data,
				);
				const volume_data = getSummaryFormattedVolumeData(
					hedges_summary_data.currency_pairs,
				);
				setSummaryData({
					mtmData: mtm_data,
					volumeData: volume_data,
					currency_data: hedges_summary_data.currency_data,
					currency_pairs: hedges_summary_data.currency_pairs,
				});
			}
		} catch (error) {
			console.log("Error while fetching hedges summary data:", error);
			throw error;
		} finally {
			setIsLoading(false);
		}
	};

	React.useEffect(() => {
		init();
	}, []);

	return (
		<Loader
			isLoading={isLoading}
			successComponent={
				<div className="w-full h-full flex">
					<div className="w-1/2 h-full px-6 pt-2 border-r border-mine-shaft-2">
						<HedgesSummaryMain summaryData={summaryData} />
					</div>
					<div className="w-1/2 h-full">
						<Routes>
							<Route path="/*" element={<EmptySummarySection />} />
							<Route
								path="/:currency/*"
								element={
									<HedgesCurrencyDetails
										currencyData={summaryData?.currency_pairs}
									/>
								}
							/>
							<Route
								path="/:currency/:currencyPair/*"
								element={
									<HedgesSummaryCurrencyPairDetails
										currencyPairData={summaryData?.currency_pairs}
									/>
								}
							/>
						</Routes>
					</div>
				</div>
			}
		/>
	);
};

export default HedgesSummary;
