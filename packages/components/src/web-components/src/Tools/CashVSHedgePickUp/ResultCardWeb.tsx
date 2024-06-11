import React from "react";
import ToolCard from "../Support/ToolCard";
import { SubTitle2, H6, SubTitle3 } from "../../../../Typography";
import { PrimaryButton, SecondaryButton } from "components";
import { InfoDescription } from "../Support/InfoDescription";
import TickIcon from "icons/TickIcon";
import GreenTickIcon from "icons/src/TickIcons/GreenTickIcon";

export interface ResultCardWebInterface {
	response_string: string;
	response_data: any;
	handleAverageListNavigation: () => void;
}

const ResultCardWeb: React.FC<ResultCardWebInterface> = ({
	response_string,
	response_data,
	handleAverageListNavigation,
}) => {
	const baseUrl = window.location.origin;
	const url1 = `${baseUrl}/Botton_decoration_web.png`;

	return (
		<ToolCard classes="gap-y-3 relative pb-8">
			<div className="flex gap-y-1">
				<div className="flex flex-col w-1/2">
					<SubTitle2>Suggested action:</SubTitle2>
					<H6 classes="text-mountain-meadow-2">{response_string}</H6>
				</div>
				<div className="flex flex-col w-1/2">
					<SubTitle2>Cash rate</SubTitle2>
					<div className="flex gap-x-[5px] items-center">
						<H6 classes="text-mountain-meadow-2">{response_data?.cash}</H6>
						<GreenTickIcon className="h-5 w-5" />
					</div>
				</div>
			</div>
			<div className="flex flex-col">
				<SecondaryButton
					className="w-fit h-8 px-4 rounded-lg transition-all duration-200 ease-in-out hover:border-1"
					buttonText="View Hedge book"
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
				className="absolute bottom-0 w-full -translate-x-4 rounded-b-xl overflow-hidden"
				alt="Connect And Consult Image"
			/>
		</ToolCard>
	);
};

export default ResultCardWeb;
