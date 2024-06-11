import React from "react";
import ButtonTab from "./ButtonTab";
import MTMTab from "./MTMTab";
import VolumeTab from "./VolumeTab";
import { EmptySummarySection, Header } from "components";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import LedgersCurrencyDetails from "./LedgersCurrencyDetails";
import LedgersCurrencyPairDetails from "./LedgersCurrencyPairDetails";

export interface LedgersSummaryMainScreenInterface {
	summaryData: any;
	web?: boolean;
	name?: string;
}

const buttonLabels = {
	label1: "MTM",
	label2: "Volume",
};

const LedgersSummaryMainScreen: React.FC<LedgersSummaryMainScreenInterface> = ({
	summaryData,
	web = true,
}) => {
	const navigate = useNavigate();
	const { id, name } = useSelector(
		(state: any) => state?.ledgerInfo?.ledgerDetails,
	);

	return (
		<div className="w-full h-full flex">
			<div className="w-1/2 h-full px-6 pt-2 border-r border-mine-shaft-2">
				<Header
					displayTitle="Ledger summary"
					displaySubTitle={name}
					className="py-2 flex gap-x-2 items-center justify-center"
					subtitleWrapper="ml-0"
					showEditIcon={false}
					backAction={() => {
						navigate(`/fx-home/portfolio/ledger/${id}`);
					}}
				/>
				<ButtonTab
					buttonStyles="w-[167.5px]"
					buttonLabels={buttonLabels}
					customGap="gap-y-1"
					buttonWrapperStyle="w-fit"
					tabs={{
						tab1: (
							<MTMTab mtmData={summaryData?.mtmData} web={web} notMainSummary />
						),
						tab2: (
							<VolumeTab volumeData={summaryData?.volumeData} notMainSummary />
						),
					}}
				/>
			</div>
			<div className="w-1/2 h-full bg-aqua-400">
				<Routes>
					<Route path="/*" element={<EmptySummarySection />} />
					<Route
						path="/:currency/*"
						element={
							<LedgersCurrencyDetails
								currencyData={summaryData.currency_pairs}
							/>
						}
					/>
					<Route
						path="/:currency/:currencyPair/*"
						element={
							<LedgersCurrencyPairDetails
								currencyPairData={summaryData.currency_pairs}
							/>
						}
					/>
				</Routes>
			</div>
		</div>
	);
};

export default LedgersSummaryMainScreen;
