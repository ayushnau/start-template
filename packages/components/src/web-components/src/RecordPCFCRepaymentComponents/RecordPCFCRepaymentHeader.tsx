import React from "react";
import { BackArrowIcon } from "icons";
import { H6 } from "../../../Typography";
import { TradeUsedCounter } from "../UseHedgesComponents/TradeUsedCounter";
import { twMerge } from "tailwind-merge";

export interface RecordPCFCRepaymentHeaderInterface {
	percentage: number;
	backArrowCallback: () => void;
	remaining_amount: string;
	hedged_amount: string;
	unhedged_amount: string;
	base_currency: string;
	headerWrapperClasses?: string;
}

const RecordPCFCRepaymentHeader: React.FC<
	RecordPCFCRepaymentHeaderInterface
> = ({
	percentage,
	backArrowCallback,
	remaining_amount,
	hedged_amount,
	unhedged_amount,
	base_currency,
	headerWrapperClasses = "",
}) => {
	return (
		<div
			className={twMerge(
				"px-5 w-full flex gap-x-2 py-2 items-center relative",
				headerWrapperClasses,
			)}
		>
			<div className="w-fit h-fit" onClick={backArrowCallback}>
				<BackArrowIcon className="cursor-pointer" />
			</div>
			<H6>Record PCFC repayment</H6>
			<TradeUsedCounter
				percentage={percentage}
				remaining_amount={remaining_amount}
				hedged_amount={hedged_amount}
				unhedged_amount={unhedged_amount}
				currency={base_currency}
				wrapperClasses="absolute right-5 top-[9px] flex"
			/>
		</div>
	);
};

export default RecordPCFCRepaymentHeader;
