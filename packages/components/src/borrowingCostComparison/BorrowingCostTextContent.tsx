import React from "react";
import { CurrencyFlag } from "../..";

export interface BorrowingCostTextContentInterface {
	currency?: string;
	title: string;
	description: string;
}

const BorrowingCostTextContent: React.FC<BorrowingCostTextContentInterface> = ({
	title,
	description,
	currency,
}) => {
	return (
		<>
			<label className="flex gap-x-[9px] font-inter text-xl font-bold leading-[26px] -tracking-[0.35px] text-mine-shaft-4">
				{currency && <CurrencyFlag currency={currency} />}
				{title}
			</label>
			<label className="font-inter text-sm leading-[21px] text-color-black-5">
				{description}
			</label>
		</>
	);
};

export default BorrowingCostTextContent;
