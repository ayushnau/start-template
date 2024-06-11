import React, { useContext } from "react";
import { IIcon } from "icons";
import { formatNumberWithCommas, getStateValue } from "utils";
import { getCurrencySymbol } from "services/fx/getCurrencySymbol";
import { MTMTag, UpdatedPrompt } from "../..";
import moment from "moment";
import showInfoModal from "../global/modals/InfoModal";
import { SummaryCardValuesInterface } from "interfaces";
import { CurrencyPairDetailsContext } from "services";
import { SubTitle2, H6 } from "../Typography";

export interface SummaryDetailsCardInterface {
	summaryCardValues: SummaryCardValuesInterface;
	Currency: string;
	infoCallbackOverride?: () => void;
	showUpdatedAtBanner?: boolean;
	totalAverageRate?:any
}

const SummaryDetailsCard: React.FC<SummaryDetailsCardInterface> = ({
	summaryCardValues,
	infoCallbackOverride,
	showUpdatedAtBanner = true,
	totalAverageRate,
	Currency
}) => {
	const context = useContext(CurrencyPairDetailsContext);
	const { handleUpdate } = context;
	const baseCurrency = Currency.includes("/")
		? Currency.split("/")[0]
		: Currency.split("-")[0];
	const quote_currency = Currency.includes("/")
		? Currency.split("/")[1]
		: Currency.split("-")[1];
	const handleInfoIconClick = () => {
		if (infoCallbackOverride) {
			infoCallbackOverride();
		} else {
			showInfoModal({
				fillContent: [
					{
						title: "Total volume",
						description: `TBD`,
					},
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
				],
			});
		}
	};
	return (
		<div className="w-full h-fit pt-4 border border-mine-shaft-2 rounded-xl flex flex-col gap-y-3">
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
					{`${getCurrencySymbol(baseCurrency)} 
					${formatNumberWithCommas(summaryCardValues.totalAmount)}`}
				</label>
				<MTMTag
					showInfoIcon
					margin="mt-3"
					currency={summaryCardValues.currency}
					amount={summaryCardValues.mtm}
					state={getStateValue(summaryCardValues.mtm)}
					infoIconCallback={handleInfoIconClick}
					endLabel={summaryCardValues.mtm.includes("-") ? "Loss" : "Gain"}
					className="rounded-lg"
				/>

				{totalAverageRate &&
					totalAverageRate !== "-" && (
						<div className="flex flex-col justify-between mt-4 mb-3">
							<SubTitle2>Weighted average rate</SubTitle2>
							<H6>
							{`${getCurrencySymbol(quote_currency)} 
								${parseFloat(totalAverageRate).toFixed(2)}
							`}
							</H6>
						</div>
					)}
				{summaryCardValues.weighted_average_rate &&
					summaryCardValues.weighted_average_rate !== "-" && (
						<div className="flex flex-col justify-between mt-4 mb-3">
							<SubTitle2>Weighted average rate</SubTitle2>
							<H6>{`${getCurrencySymbol(quote_currency)} 
								${summaryCardValues.weighted_average_rate}`}
							</H6>
						</div>
					)}
			</div>
			{showUpdatedAtBanner && (
				<UpdatedPrompt
					showClock={false}
					className="mt-0 mb-0 rounded-b-xl"
					text={`Last Updated : ${moment().format(
						"DD MMM 'YY",
					)} at ${moment().format("h:mma")}`}
					updateAction={handleUpdate}
				/>
			)}
		</div>
	);
};

export default SummaryDetailsCard;
