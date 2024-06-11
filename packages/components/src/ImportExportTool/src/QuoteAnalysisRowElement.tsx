import React from "react";
import { getCurrencySymbol } from "services/fx/getCurrencySymbol";
import { Tag2 } from "../../..";
import { formatNumberWithCommas } from "utils";
import { IIcon } from "icons";

export interface QuoteAnalysisRowElementInterface {
	month: string;
	amount: string;
	amount_currency: string;
	pnl: string;
	pnl_currency: string;
}

const QuoteAnalysisRowElement: React.FC<QuoteAnalysisRowElementInterface> = ({
	month,
	amount,
	amount_currency,
	pnl,
	pnl_currency,
}) => {
	const label1 =
		getCurrencySymbol(amount_currency) + formatNumberWithCommas(amount);

	return (
		<div className="grid grid-cols-5 border-b border-mine-shaft-2 py-4 border-dotted">
			<label className="">{month}</label>
			<label className="col-span-2">{label1}</label>
			<div className="col-span-2">
				<Tag2
					currencyCode={getCurrencySymbol(pnl_currency)}
					value={pnl}
					color={pnl.includes("-") ? "Red" : "Green"}
				/>
			</div>
		</div>
	);
};

export default QuoteAnalysisRowElement;
