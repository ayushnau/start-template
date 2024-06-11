import React from "react";
import SummaryDetailsCard from "./SummaryDetailsCard";
import Divider from "../global/Divider";
import VolumeDetails from "./VolumeDetails";
import AverageDetails from "./AverageDetails";
import GainRiskSection from "./GainRiskSection";
import { AddItemPrompt } from "../..";
import { NoItemIcon } from "icons";
import {
	VolumeDetailsInterface,
	AverageDetailsInterface,
	GainRiskSectionInterface,
	SummaryCardValuesInterface,
} from "interfaces";

export interface ImportTabInterface {
	currency:string;
	importData: {
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

const ImportTab: React.FC<ImportTabInterface> = ({
	currency,
	importData,
	isEmpty,
	infoCallbackOverride,
	showUpdatedAtBanner = true,
}) => {
	if (isEmpty) {
		return (
			<div className="h-[calc(100vh-200px)] flex items-center justify-center">
				<AddItemPrompt
					iconImageUrl={""}
					iconImage={<NoItemIcon />}
					heading="No import data"
					subHeading="Your import data will be visible here once you add"
					subHeadingPadding="px-16 pt-2"
				/>
			</div>
		);
	}
	return (
		<div className="pt-4">
			<SummaryDetailsCard
				Currency={currency}
				summaryCardValues={importData.summaryCardValues}
				infoCallbackOverride={infoCallbackOverride}
				showUpdatedAtBanner={showUpdatedAtBanner}
				totalAverageRate={importData?.averageData?.weightedTotalAverageRates}
			/>
			<Divider marginTop="mt-[18px]" marginBottom="mb-4" />
			<VolumeDetails {...importData.volumeData} />
			<Divider marginTop="my-4" />
			<AverageDetails
				{...importData.averageData}
				infoIconCallback={infoCallbackOverride}
			/>
			<Divider marginTop="my-4" />
			<GainRiskSection {...importData.gainriskData} />
		</div>
	);
};

export default ImportTab;
