import React from "react";
import HeadingDescriptionPair from "../HeadingDescriptionPair";
import { formatDate2 } from "utils";
import CancelUseHedgeButtonPair from "./CancelUseHedgeButtonPair";
import { formatNumberWithCommas } from "utils";
import { getCurrencySymbol } from "services/fx/getCurrencySymbol";

interface HedgeLinkedTradeCardProps {
	value?: any;
	index: number;
	useHedge: Function;
	unlinkAndCancelhedge: Function;
}

const HedgeLinkedTradeCard: React.FC<HedgeLinkedTradeCardProps> = ({
	value,
	index,
	useHedge,
	unlinkAndCancelhedge,
}) => {
	let details: any;
	if (value && value.trade) details = value.trade;

	return (
		<div
			className="mt-3 p-4 rounded-xl border border-semiLightGray"
			key={details.uuid}
		>
			<div className="mb-1 text-blackDark text-base font-bold leading-6 -tracking-[.3px]">
				<span>{index + 1}.</span>
				Hedged amount:
				<span className="ml-1">
					{getCurrencySymbol(details.base_currency)}
					{value ? formatNumberWithCommas(value?.link_amount) : null}
				</span>
			</div>
			<p className="mb-1 text-xs font-normal leading-4 text-mine-shaft-3">
				{`(Invoice value: ${getCurrencySymbol(details.base_currency)}${
					value ? formatNumberWithCommas(details?.trade_amount) : null
				})`}
			</p>
			<div className="flex justify-between items-center py-2">
				<HeadingDescriptionPair
					headingText={
						<div className="text-xs font-normal leading-4 text-mine">
							Benchmark rate
						</div>
					}
					descriptionTextClasses="mt-1"
					descriptionText={
						details?.benchmark_rate
							? `${getCurrencySymbol(details.quote_currency)}${
									details?.benchmark_rate
							  }`
							: "N/A"
					}
				/>
				<HeadingDescriptionPair
					headingText={
						<div className="text-xs font-normal leading-4 text-mine">
							Maturity date
						</div>
					}
					descriptionTextClasses="text-sm font-normal leading-[22px] text-mine-shaft-4 mt-1"
					descriptionText={
						details?.benchmark_rate
							? `${formatDate2(details.maturity_date.split(" ")[0])}`
							: "N/A"
					}
				/>
			</div>
			<CancelUseHedgeButtonPair
				onHedgeCancel={() => unlinkAndCancelhedge(details.uuid)}
				onHedgeUse={() => useHedge()}
				className=""
			/>{" "}
		</div>
	);
};

export default HedgeLinkedTradeCard;
