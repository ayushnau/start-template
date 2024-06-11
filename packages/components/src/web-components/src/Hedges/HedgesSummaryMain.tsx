import React from "react";
import { Header } from "../../../..";
import ButtonTab from "../../../summary/ButtonTab";
import { useNavigate } from "react-router-dom";
import MTMTab from "../../../summary/MTMTab";
import VolumeTab from "../../../summary/VolumeTab";

const buttonLabels = {
	label1: "MTM",
	label2: "Volume",
};

export interface HedgesSummaryMainInterface {
	summaryData?: any;
}

const HedgesSummaryMain: React.FC<HedgesSummaryMainInterface> = ({
	summaryData,
}) => {
	const navigate = useNavigate();
	return (
		<div className="flex flex-col gap-y-1">
			<Header
				displayTitle="Hedges summary"
				className="py-2 flex gap-x-2 items-center justify-center"
				displayTitleStyles="ml-0"
				showEditIcon={false}
				backAction={() => {
					navigate(`/fx-home/portfolio`);
				}}
			/>
			<ButtonTab
				buttonStyles="w-[167.5px]"
				buttonLabels={buttonLabels}
				customGap="gap-y-1"
				buttonWrapperStyle="w-fit"
				tabs={{
					tab1: (
						<MTMTab mtmData={summaryData?.mtmData} web={true} notMainSummary />
					),
					tab2: (
						<VolumeTab volumeData={summaryData?.volumeData} notMainSummary />
					),
				}}
			/>
		</div>
	);
};

export default HedgesSummaryMain;
