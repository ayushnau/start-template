import React from "react";
import { ArrowIcon } from "icons";
import { CurrencyPairFlags } from "../../..";
import FilterBadge, { FilterBadgeInterface } from "./FilterBadge";

export interface CurrencyPairBadgeInterface
	extends Omit<FilterBadgeInterface, "children"> {
	pair: string;
}

const CurrencyPairBadge: React.FC<CurrencyPairBadgeInterface> = ({
	pair,
	...rest
}) => {
	return (
		<FilterBadge {...rest}>
			{<CurrencyPairFlags flagpair={pair} />}
			<div className="flex items-center">
				<div>{pair.split("/")[0]}</div>
				<ArrowIcon className="mx-1" />
				<div className="mr-2">{pair.split("/")[1]}</div>
			</div>
		</FilterBadge>
	);
};

export default CurrencyPairBadge;
