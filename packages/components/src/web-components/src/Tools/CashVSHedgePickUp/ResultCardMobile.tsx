import React from "react";
import ToolCard from "../Support/ToolCard";
import { SubTitle2, H6, SubTitle3 } from "../../../../Typography";
import { PrimaryButton } from "components";
import { InfoDescription } from "../Support/InfoDescription";

export interface ResultCardMobileInterface {
	response_string: string;
	response_data: any;
	handleAverageListNavigation: () => void;
}

const ResultCardMobile: React.FC<ResultCardMobileInterface> = ({
	response_string,
	response_data,
	handleAverageListNavigation,
}) => {
	const baseUrl = window.location.origin;
	const url1 = `${baseUrl}/Botton_decoration.png`;

	return (
		<ToolCard classes="gap-y-3 relative pb-8">
			<div className="flex flex-col gap-y-1">
				<SubTitle2>Suggested action:</SubTitle2>
				<H6 classes="text-mountain-meadow-2">{response_string}</H6>
			</div>
			<ToolCard classes="px-3 py-2 bg-mine-shaft-1 border-0 flex-row">
				<div className="flex flex-col w-1/2">
					<SubTitle3>Hedge rate</SubTitle3>
					<SubTitle2>{response_data.weighted_avg_for_month}</SubTitle2>
				</div>
				<div className="flex flex-col w-1/2">
					<SubTitle3>Cash rate</SubTitle3>
					<SubTitle2>{response_data?.cash}</SubTitle2>
				</div>
			</ToolCard>
			<div className="flex flex-col">
				<PrimaryButton
					className="w-fit h-8 px-4 rounded-lg"
					buttonText="View Hedges"
					onClick={handleAverageListNavigation}
				/>
				<div className="border-b border-mine-shaft-2 my-4 w-full" />
				<div className="flex flex-col gap-y-4">
					<InfoDescription>
						The suggested action is based on comparison between cash rate and
						the weighted average hedge rate (adjusted for the early delivery
						forward points).
					</InfoDescription>
					<InfoDescription>
						If the total hedges for the current month exceed the total
						receivables/payables of the month, we recommend using the hedges
						only. This prevents over-hedging or hedge cancellations.
					</InfoDescription>
				</div>
			</div>
			<img
				src={url1}
				className="absolute bottom-0 w-full -translate-x-4"
				alt="Connect And Consult Image"
			/>
		</ToolCard>
	);
};

export default ResultCardMobile;
