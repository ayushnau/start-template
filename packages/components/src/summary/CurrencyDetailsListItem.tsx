import React from "react";
import {
	CurrencyPairFlags,
	ArrowSeperatedCurrencyPairs,
	MTMLabel,
	MTMTag,
	GrayLabel,
} from "../..";
import { RightSideIcon } from "icons";
import { getEndLabel, getStateValue } from "utils";
import { useNavigate } from "react-router-dom";
import { CurrencyPairData } from "interfaces";

export interface CurrencyDetailsListItemInterface {
	currencyPairData: CurrencyPairData;
}

const CurrencyDetailsListItem: React.FC<CurrencyDetailsListItemInterface> = ({
	currencyPairData,
}) => {
	const navigate = useNavigate();
	return (
		<div
			id="currency-pair-data"
			className="py-2 flex flex-col gap-y-[10px]"
			onClick={() => {
				navigate(currencyPairData.currencyPair.split("/").join("-"));
			}}
		>
			<div className="flex flex-col gap-y-1">
				<div className="flex justify-between">
					<div className="flex gap-x-2">
						<CurrencyPairFlags flagpair={currencyPairData.currencyPair} />
						<ArrowSeperatedCurrencyPairs
							currencyPair={currencyPairData.currencyPair}
						/>
					</div>
					<div>
						<RightSideIcon />
					</div>
				</div>
				<div className="ml-[38px]">
					<MTMTag
						amount={currencyPairData.totalMTM}
						currency={currencyPairData.currencyPair.split("/")[1]}
						state={getStateValue(currencyPairData.totalMTM)}
						endLabel={getEndLabel(currencyPairData.totalMTM)}
					/>
				</div>
			</div>
			<div className="ml-[38px] flex justify-between">
				<div className="w-full flex flex-col gap-y-1">
					<GrayLabel labelText="Hedged Gain/Risk" />
					<MTMLabel
						amount={currencyPairData.hedgedMTM}
						currency={currencyPairData.currencyPair.split("/")[1]}
						state={getStateValue(currencyPairData.hedgedMTM)}
					/>
				</div>
				<div className="w-full flex flex-col gap-y-1">
					<GrayLabel labelText="Unhedged Gain/Risk" />
					<MTMLabel
						amount={currencyPairData.unhedgedMTM}
						currency={currencyPairData.currencyPair.split("/")[1]}
						state={getStateValue(currencyPairData.unhedgedMTM)}
					/>
				</div>
			</div>
		</div>
	);
};

export default CurrencyDetailsListItem;
