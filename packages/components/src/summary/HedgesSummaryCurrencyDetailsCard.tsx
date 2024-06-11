import React from "react";
import { IIcon } from "icons";
import { formatNumberWithCommas, getStateValue } from "utils";
import { getCurrencySymbol } from "services/fx/getCurrencySymbol";
import { MTMTag } from "../..";
import { SubTitle2, H6 } from "../Typography";
import showInfoModal from "../web-components/src/Modals/InfoModal";

const SUMMARY_CARD_INFO_CONTENT = [
	{
		title: "Total volume",
		description: [`TBD`],
	},
	{
		title: "Gain",
		description: [
			"When an open position(both hedged and unhedged combined) of a trade is marked-to-market, its value is refreshed to reflect the current market price",
			"For an export, if the market price has increased for an unhedged position or if the market price has decreased for a hedged position, since the position was opened, the unrealised gain is displayed.",
			"For an import, if the market price has decreased for an unhedged position or if the market price has increased for a hedged position, since the position was opened, the unrealised gain is displayed.",
			"This gain represents the potential profit that could be realised if the position were to be closed or completed at that moment.",
		],
	},
	{
		title: "Loss",
		description: [`TBD`],
	},
];

export interface HedgesSummaryCurrencyDetailsCardInterface {
	summaryCardValues: any;
	baseCurrency: string;
	quoteCurrency: string;
}

const HedgesSummaryCurrencyDetailsCard: React.FC<
	HedgesSummaryCurrencyDetailsCardInterface
> = ({ summaryCardValues, baseCurrency, quoteCurrency }) => {
	const handleInfoIconClick = () => {
		showInfoModal({
			web: true,
			content: SUMMARY_CARD_INFO_CONTENT,
		});
	};

	return (
		<div className="w-full h-fit pt-4 mt-4 border border-mine-shaft-2 rounded-xl flex flex-col gap-y-3">
			<div className="flex flex-col py-1 px-4 ">
				<div className="flex justify-between items-center">
					<label className="font-inter text-sm leading-[22px] text-mine-shaft-3">
						Total volume
					</label>
					<div onClick={handleInfoIconClick}>
						<IIcon color="#717171" />
					</div>
				</div>
				<label className="text-mine-shaft-4 font-inter text-xl font-bold leading-[26px] -tracking-[0.35px] mt-[6px]">
					{`${getCurrencySymbol(baseCurrency)} ${formatNumberWithCommas(
						summaryCardValues.total_volume,
					)}`}
				</label>
				<MTMTag
					showInfoIcon
					margin="mt-3"
					currency={quoteCurrency}
					amount={summaryCardValues.total_mtm.toFixed(4)}
					state={getStateValue(summaryCardValues.total_mtm.toFixed(4))}
					infoIconCallback={handleInfoIconClick}
					endLabel={
						summaryCardValues.total_mtm.toFixed(4).includes("-")
							? "Loss"
							: "Gain"
					}
					className="rounded-lg"
				/>

				{summaryCardValues.weighted_average_rate &&
					summaryCardValues.weighted_average_rate !== "-" && (
						<div className="flex flex-col justify-between mt-4 mb-3 gap-y-1">
							<SubTitle2>Weighted average rate</SubTitle2>
							<H6>
								{getCurrencySymbol(quoteCurrency) +
									summaryCardValues.weighted_average_rate.toFixed(2)}
							</H6>
						</div>
					)}
			</div>
		</div>
	);
};

export default HedgesSummaryCurrencyDetailsCard;
