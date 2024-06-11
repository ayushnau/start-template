import React from "react";
import { twMerge } from "tailwind-merge";
import { SubTitle2 } from "../../../Typography";
import { getCurrencySymbol } from "services/fx/getCurrencySymbol";
import { formatNumberWithCommas } from "utils";
import { TradeRingPieIcon } from "icons";

export interface EEFCUsedCounterInterface {
	wrapperClasses?: string;
	remaining_amount: string;
	currency: string;
	percentage: number;
}

const EEFCUsedCounter: React.FC<EEFCUsedCounterInterface> = ({
	wrapperClasses,
	remaining_amount,
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
			<SubTitle2 classes="font-semibold text-spanish-yellow-dark">
				{`Remaining EEFC amount: ${getCurrencySymbol(
					currency,
				)}${formatNumberWithCommas(remaining_amount)}`}
			</SubTitle2>
		</div>
	);
};

export default EEFCUsedCounter;
