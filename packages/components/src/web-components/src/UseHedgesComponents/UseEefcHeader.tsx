import React from "react";
import { BackArrowIcon } from "icons";
import { H6 } from "../../../Typography";
import { twMerge } from "tailwind-merge";
import EEFCUsedCounter from "./EEFCUsedCounter";

export interface UseEefcHeaderInterface {
	percentage: number;
	backArrowCallback: () => void;
	remaining_amount: string;
	base_currency: string;
	headerWrapperClasses?: string;
	header: string;
}

const UseEefcHeader: React.FC<UseEefcHeaderInterface> = ({
	percentage,
	backArrowCallback,
	remaining_amount,
	base_currency,
	headerWrapperClasses = "",
	header = "useHedges",
}) => {
	return (
		<div
			className={twMerge(
				"px-5 w-full flex gap-x-2 py-2 items-center relative mt-2",
				headerWrapperClasses,
			)}
		>
			<div className="w-fit h-fit" onClick={backArrowCallback}>
				<BackArrowIcon className="cursor-pointer" />
			</div>
			<H6>
				{header === "useHedges"
					? `Use hedge(s)`
					: header === "importnetoff"
					? `Select import trade(s) for EEFC usage`
					: ""}
			</H6>
			<EEFCUsedCounter
				percentage={percentage}
				remaining_amount={remaining_amount}
				currency={base_currency}
				wrapperClasses="absolute right-5 top-[9px]"
			/>
		</div>
	);
};

export default UseEefcHeader;
