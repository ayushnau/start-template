import React from "react";
import { isObjectEmpty } from "utils";
import { AddItemPrompt, UpdatedPrompt } from "../..";
import { NoItemIcon } from "icons";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import ButtonTab from "./ButtonTab";
import MTMTab from "./MTMTab";
import VolumeTab from "./VolumeTab";
import { SummaryDataInterface } from "interfaces";
import { twMerge } from "tailwind-merge";
import { useModalNavigation } from "services";

export interface SummaryMainInterface {
	summaryData?: SummaryDataInterface;
	handleUpdate: () => void;
	web?: boolean;
	latestUpdateTime?: string;
	totalTradesAndHedgesCount?: number;
}

const SummaryMain: React.FC<SummaryMainInterface> = ({
	summaryData,
	handleUpdate,
	web = false,
	latestUpdateTime = moment().format("h:mma"),
	totalTradesAndHedgesCount,
}) => {
	const navigate = useNavigate();

	const buttonLabels = {
		label1: "MTM",
		label2: "Volume",
	};
	const { fullNavigation } = useModalNavigation();

	return (
		<div className="w-full h-full">
			<UpdatedPrompt
				className={twMerge("mt-0 mb-0", web ? "hidden" : "")}
				showClock
				text={`Last Updated : ${latestUpdateTime}`}
				updateAction={handleUpdate}
			/>
			{isObjectEmpty(summaryData as unknown as Record<string, unknown>) ? (
				<div className="h-[calc(100vh-250px)] flex items-center justify-center">
					<AddItemPrompt
						iconImageUrl={""}
						iconImage={<NoItemIcon />}
						heading="No ledgers"
						subHeading="Add your first ledger now!"
						buttonText="+ Add ledger"
						onButtonClick={() => {
							if (web) {
								fullNavigation(
									`/fx-home/portfolio/create-ledger`,
									`/fx-home/portfolio`,
								);
							} else {
								navigate("/create-ledger");
							}
						}}
					/>
				</div>
			) : (
				<div className="flex flex-col px-5 pt-4">
					<ButtonTab
						buttonWrapperStyle="w-full"
						buttonLabels={buttonLabels}
						tabs={{
							tab1: <MTMTab mtmData={summaryData?.mtmData} web={web} />,
							tab2: <VolumeTab volumeData={summaryData?.volumeData} />,
						}}
					/>
				</div>
			)}
		</div>
	);
};

export default SummaryMain;
