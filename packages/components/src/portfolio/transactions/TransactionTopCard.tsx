import React from "react";
import { getCurrencySymbol } from "services/fx/getCurrencySymbol";
import { CompletedTags } from "../../..";
import { formatNumberWithCommas } from "utils";

export interface TransactionTopCardInterface {
	id: string;
	title: string;
	percentage: number;
	amount_currency: string;
	amount: string;
	mtm: string;
	mtm_currency: string;
	showMtmTags?: boolean;
	eefcStatus?: boolean;
	Icon?: React.Component | any;
}

const TransactionTopCard: React.FC<TransactionTopCardInterface> = ({
	id,
	title,
	percentage,
	amount_currency,
	amount,
	mtm,
	mtm_currency,
	showMtmTags = true,
	eefcStatus = false,
	Icon,
}) => {
	const cardStyles =
		"flex flex-col w-full h-full items-center justify-center gap-y-1 px-6 py-4 border rounded-xl";
	return (
		<div id={id} className={"flex flex-col w-full justify-between gap-y-1"}>
			<div className="flex justify-between">
				<label className="font-inter text-base leading-6 text-mine-shaft-4 flex gap-x-2">
					{eefcStatus && <Icon />}
					{title}
				</label>
				<label className="font-inter leading-6 text-mine-shaft-4 font-bold -tracking-[0.3px]">{`${getCurrencySymbol(
					amount_currency,
				)}${formatNumberWithCommas(amount)}`}</label>
			</div>
			<div className="flex justify-between items-end">
				<label className="font-inter text-sm leading-[22px] text-mine-shaft-3">{`(${percentage}%)`}</label>
				{showMtmTags ? (
					<CompletedTags amount={mtm} amount_currency={mtm_currency} />
				) : null}
			</div>
		</div>
	);
};

export default TransactionTopCard;
