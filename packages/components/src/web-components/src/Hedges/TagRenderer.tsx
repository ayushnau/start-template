import React from "react";
import { MTMTag, WarningTag } from "components";

export interface TagRendererInterface {
	is_hedge_matured?: boolean;
	isPastMaturityDate?: boolean;
	tableSrc: string;
	currentMarketRates: any;
	value: string;
	currency: string;
}

const TagRenderer: React.FC<TagRendererInterface> = ({
	is_hedge_matured,
	isPastMaturityDate,
	tableSrc,
	currentMarketRates,
	currency,
	value,
}) => {
	if (is_hedge_matured) {
		return (
			<WarningTag
				className="mt-0 rounded-md h-6 inline-flex items-center"
				label={`Hedge matured! Use or unlink Hedge`}
			/>
		);
	}
	if (isPastMaturityDate) {
		return (
			<WarningTag
				className="mt-0 rounded-md h-6 inline-flex items-center"
				label={`Update ${tableSrc} to view profit/loss`}
			/>
		);
	} else if (!currentMarketRates || currentMarketRates === 0) {
		return (
			<WarningTag
				className="mt-0 text-xs font-bold rounded-md text-[#7E5700] bg-[#FFDEAC] h-6 inline-flex items-center"
				label={`Rate Unavailable`}
			/>
		);
	}
	return (
		<MTMTag
			className="h-6"
			amount={value}
			currency={currency}
			state={value?.includes("-") ? "losing" : "gaining"}
			endLabel={value?.includes("-") ? "Losing" : "Gaining"}
		/>
	);
};

export default TagRenderer;
