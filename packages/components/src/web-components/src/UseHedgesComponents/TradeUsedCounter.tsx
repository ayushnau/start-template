import React from "react";
import { twMerge } from "tailwind-merge";
import { SubTitle2 } from "../../../Typography";
import { getCurrencySymbol } from "services/fx/getCurrencySymbol";
import { formatNumberWithCommas } from "utils";
import { TradeRingPieIcon } from "icons";

export interface TradeUsedCounterInterface {
	wrapperClasses?: string;
	remaining_amount: string;
	hedged_amount: string;
	unhedged_amount: string;
	currency: string;
	percentage: number;
}

export const TradeUsedCounter: React.FC<TradeUsedCounterInterface> = ({
	wrapperClasses = "",
	remaining_amount,
	hedged_amount,
	unhedged_amount,
	currency,
	percentage,
}) => {
	return (
		<div
			className={twMerge(
				"flex items-center px-2 py-1 rounded-lg bg-spanish-yellow-light gap-x-2",
				wrapperClasses,
			)}
		>
			<TradeRingPieIcon percentage={percentage} />
			<div className="flex items-start flex-col ">
				<SubTitle2 classes="text-[10px] font-bold text-normal  text-spanish-yellow-dark">
					{`Remaining amount (${getCurrencySymbol(
						currency,
					)}${formatNumberWithCommas(remaining_amount)})`}
				</SubTitle2>
				<SubTitle2 classes="text-mine-shaft-4 font-bold">
					{`Unhedged: ${getCurrencySymbol(currency)}${formatNumberWithCommas(
						unhedged_amount,
					)} ·
					Hedged: ${getCurrencySymbol(currency)}${formatNumberWithCommas(hedged_amount)}`}
				</SubTitle2>
			</div>
		</div>
	);
};
