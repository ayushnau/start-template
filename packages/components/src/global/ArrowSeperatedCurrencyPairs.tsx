import React from "react";
import { ArrowIcon } from "icons";

export interface ArrowSeperatedCurrencyPairsInterface {
	currencyPair: string;
	styles?: string;
}

const ArrowSeperatedCurrencyPairs: React.FC<
	ArrowSeperatedCurrencyPairsInterface
> = ({
	currencyPair,
	styles = "flex items-center font-bold font-inter leading-6 -tracking-[0.3px] text-mine-shaft-4",
}) => {
	return (
		<div className={styles}>
			{`${currencyPair.split("/")[0]}`}
			<ArrowIcon className="mx-1" color="#212121" strokeWidth={2} />
			{`${currencyPair.split("/")[1]} `}
		</div>
	);
};

export default ArrowSeperatedCurrencyPairs;
