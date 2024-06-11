import React from "react";
import { twMerge } from "tailwind-merge";
import { SubTitle2 } from "./Typography";
import { getCurrencySymbol } from "services/fx/getCurrencySymbol";
import { formatNumberWithCommas } from "utils";
import { TradeRingPieIcon } from "icons";

export interface RemainingAmountIndicatorInterface {
	wrapperClasses?: string;
	remaining_amount: string;
	currency: string;
	percentage: number;
	subTitle?: string;
}

const RemainingAmountIndicatorCard: React.FC<
	RemainingAmountIndicatorInterface
> = ({ wrapperClasses, remaining_amount, currency, percentage, subTitle }) => {
	return (
		<div
			className={twMerge(
				"flex items-center px-2 py-1 rounded-lg bg-spanish-yellow-light gap-x-2",
				wrapperClasses,
			)}
		>
			<TradeRingPieIcon percentage={percentage} />
			<div className="flex flex-col">
				<SubTitle2 classes="font-semibold text-spanish-yellow-dark">
					{`Remaining loan amount: ${getCurrencySymbol(
						currency,
					)}${formatNumberWithCommas(remaining_amount)}`}
				</SubTitle2>
				{subTitle ? (
					<>
						<SubTitle2 classes="font-semibold text-black">{subTitle}</SubTitle2>
					</>
				) : (
					<></>
				)}
			</div>
		</div>
	);
};

export default RemainingAmountIndicatorCard;
