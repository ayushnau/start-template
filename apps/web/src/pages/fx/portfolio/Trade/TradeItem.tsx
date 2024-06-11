import React from "react";
import { CurrencyPairFlags, CompletedTags, WarningTag } from "components";
import { RightSideIcon, ArrowIcon, IIcon } from "icons";
import { Tag } from "components";
import { getCurrencySymbol } from "services/fx/getCurrencySymbol";
import moment from "moment";
import { formatNumberWithCommas, isThisPastMaturity } from "utils";

interface TradeItemProps {
	detail: any;
	index: Number;
	onClick: Function;
}

const TradeItem: React.FC<TradeItemProps> = ({ detail, index, onClick }) => {
	const flagPair = detail.currency_pair;
	const { trade_type, remaining_amount, hedged_amount } = detail;
	const formatedDate = (date: any) => {
		return moment(date, "YYYY-MM-DD").format("DD MMM 'YY");
	};

	const calculatePercentage = (totalAmount: number, totalExposure: number) => {
		return ` (${((totalExposure / totalAmount) * 100).toFixed(1)}%)`;
	};

	const isCompleted = detail.remaining_amount === "0";

	return (
		<div
			onClick={() => onClick()}
			className="border border-mine-shaft-2 rounded-xl w-full p-4 mt-3"
		>
			<div className="flex justify-start">
				<div className="flex items-center text-mine-shaft-3 text-xs font-bold leading-4">
					{`${index}. ${flagPair.split("/")[0]}`}

					<ArrowIcon color={"#717171"} className="mx-1" />

					{`${flagPair.split("/")[1]} `}
					{flagPair && (
						<CurrencyPairFlags flagpair={flagPair} className="ml-2" />
					)}
				</div>
				<div className="text-xs font-normal font-inter leading-4 ml-1">
					{`· `}
					<span className="inline-block first-letter:uppercase text-mine-shaft-3">
						{trade_type}
					</span>
				</div>
			</div>
			<div className="flex justify-between pt-2">
				<div className="text-base font-bold font-inter flex-wrap break-all">{`${
					isCompleted ? "Amount: " : ""
				}${getCurrencySymbol(detail.base_currency)}${formatNumberWithCommas(
					isCompleted ? detail.trade_amount : detail.remaining_amount,
				)}`}</div>
				<div>
					<RightSideIcon />
				</div>
			</div>

			<div>
				{isCompleted ? (
					<CompletedTags
						fit
						amount={detail.pnl}
						amount_currency={detail.quote_currency}
					/>
				) : isThisPastMaturity(detail.maturity_date) ||
				  detail.is_hedge_matured ? (
					<WarningTag
						label={`Update trade to view ${
							isCompleted ? "profit/loss" : "gain/risk"
						}`}
					/>
				) : !detail?.current_market_rates ||
				  detail.current_market_rates === 0 ? (
					<div className="text-[#7E5700] bg-[#FFDEAC] inline-block px-2 py-1 rounded-lg mt-1 text-sm font-semibold leading-[22px]">
						<span className="">Rate Unavailable</span>
					</div>
				) : (
					<Tag
						color={detail.mtm < 0 ? "Red" : "Green"}
						currencyCode={
							getCurrencySymbol(detail.quote_currency)
								? getCurrencySymbol(detail.quote_currency)
								: `${detail.quote_currency}`
						}
						className="py-1 px-[6px] my-0 font-inter font-bold text-xs"
						value={detail.mtm}
						tagText={parseInt(detail.mtm) < 0 ? "Risk" : "Gain"}
					/>
				)}
			</div>
			<div className="flex items-center justify-between text-mine-shaft-3 text-xs font-normal font-inter pt-2">
				<div>
					<div>Benchmark rate</div>
					<div className="text-blackDark text-sm font-normal leading-[22px]">
						{getCurrencySymbol(detail.quote_currency)
							? getCurrencySymbol(detail.quote_currency)
							: `${detail.quote_currency}`}
						{formatNumberWithCommas(detail.benchmark_rate)}
					</div>
				</div>
				<div>
					<div>{`Hedged ${calculatePercentage(
						isCompleted ? detail.trade_amount : remaining_amount,
						hedged_amount,
					)}`}</div>
					<div className="text-blackDark text-sm font-normal leading-[22px]">
						{getCurrencySymbol(detail.base_currency)
							? getCurrencySymbol(detail.base_currency)
							: `${detail.base_currency}`}
						{formatNumberWithCommas(hedged_amount)}
					</div>
				</div>
				<div>
					<div>Maturity date</div>
					<div className="text-blackDark text-sm font-normal leading-[22px]">
						{formatedDate(detail.maturity_date?.split(" ")[0])}
					</div>
				</div>
			</div>
		</div>
	);
};

export default TradeItem;
