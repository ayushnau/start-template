import React from "react";
import SummaryDetailsCard from "./SummaryDetailsCard";
import Divider from "../global/Divider";
import VolumeDetails from "./VolumeDetails";
import AverageDetails from "./AverageDetails";
import GainRiskSection from "./GainRiskSection";
import { AddItemPrompt } from "../..";
import { NoItemIcon } from "icons";
import showInfoModal from "../global/modals/InfoModal";
import {
	VolumeDetailsInterface,
	AverageDetailsInterface,
	GainRiskSectionInterface,
	SummaryCardValuesInterface,
} from "interfaces";

export interface ExportTabInterface {
	currency:string
	exportData: {
		summaryCardValues: SummaryCardValuesInterface;
		volumeData: VolumeDetailsInterface;
		averageData: AverageDetailsInterface;
		gainriskData: GainRiskSectionInterface;
		weightedTotalAverageRates?: string;
	};
	isEmpty?: boolean;
	infoCallbackOverride?: () => void;
	showUpdatedAtBanner?: boolean;
}

const ExportTab: React.FC<ExportTabInterface> = ({
	currency,
	exportData,
	isEmpty,
	infoCallbackOverride,
	showUpdatedAtBanner = true,
}) => {
	const handleInfoIconClick = () => {
		if (infoCallbackOverride) {
			infoCallbackOverride();
		} else {
			showInfoModal({
				fillContent: [
					{
						title: "Gain",
						description: `When an open position(both hedged and unhedged combined) of a trade is marked-to-market, its value is refreshed to reflect the current market price.`,
						descriptionList: [
							"For an export, if the market price has increased for an unhedged position or if the market price has decreased for a hedged position, since the position was opened, the unrealised gain is displayed.",
							"For an import, if the market price has decreased for an unhedged position or if the market price has increased for a hedged position, since the position was opened, the unrealised gain is displayed.",
							"This gain represents the potential profit that could be realised if the position were to be closed or completed at that moment.",
						],
					},
					{
						title: "Loss",
						description: `TBD`,
					},
					{
						title: "Weighted average rate",
						description: `TBD`,
					},
				],
			});
		}
	};

	if (isEmpty) {
		return (
			<div className="h-[calc(100vh-200px)] flex items-center justify-center">
				<AddItemPrompt
					iconImageUrl={""}
					iconImage={<NoItemIcon />}
					heading="No export data"
					subHeading="Your export data will be visible here once you add"
					subHeadingPadding="px-16 pt-2"
				/>
			</div>
		);
	}
	return (
		<div className="pt-4">
			<SummaryDetailsCard
				summaryCardValues={exportData.summaryCardValues}
				Currency={currency}
				infoCallbackOverride={infoCallbackOverride}
				showUpdatedAtBanner={showUpdatedAtBanner}
				totalAverageRate={exportData?.averageData?.weightedTotalAverageRates}
			/>
			<Divider marginTop="mt-[18px]" marginBottom="mb-4" />
			<VolumeDetails {...exportData.volumeData} />
			<Divider marginTop="my-4" />
			<AverageDetails
				{...exportData.averageData}
				infoIconCallback={handleInfoIconClick}
			/>
			<Divider marginTop="my-4" />
			<GainRiskSection {...exportData.gainriskData} />
		</div>
	);
};

export default ExportTab;
