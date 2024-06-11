import React from "react";
import { IIcon, ArrowIcon, RightSideIcon } from "icons";
import { getCurrencySymbol } from "services/fx/getCurrencySymbol";
import moment from "moment";
import {
	showHedgeDetailsInfoModal,
	CompletedTags,
	CurrencyPairFlags,
	Tag,
	WarningTag,
} from "components";
import { formatNumberWithCommas, isThisPastMaturity } from "utils";

interface HedgeItemProps {
	detail?: any;
	index?: Number;
	onClick?: Function;
	details?: any;
	infoModalOverride?: () => void;
}

const HedgeItem: React.FC<HedgeItemProps> = ({
	detail,
	index,
	onClick = () => {},
	details,
	infoModalOverride,
}) => {
	const showInfoModal = async () => {
		if (infoModalOverride) {
			infoModalOverride();
		} else {
			await showHedgeDetailsInfoModal({ details });
		}
	};

	const flagPair = detail?.currency_pair;
	const formatedDate = (date: any) => {
		return moment(date, "YYYY-MM-DD").format("DD MMM 'YY");
	};

	const isCompleted = detail.remaining_amount == "0";

	return (
		<div
			onClick={() => onClick()}
			className="border border-mine-shaft-2 rounded-xl w-full p-4 mt-3"
		>
			<div className="flex justify-start">
				<div className="flex items-center  text-mine-shaft-3 text-xs font-bold leading-4">
					{`${index}. ${flagPair.split("/")[0]}`}

					<ArrowIcon color={"#717171"} className="mx-1" />

					{`${flagPair.split("/")[1]} `}
					{flagPair && (
						<CurrencyPairFlags flagpair={flagPair} className="ml-2" />
					)}
				</div>
				<div className="text-xs font-normal leading-4 ml-1">
					{`· `}
					<span className="inline-block first-letter:uppercase text-mine-shaft-3">
						{detail.hedge_type}
					</span>
				</div>
			</div>
			<div className="flex justify-between pt-2">
				<div className="text-base font-bold flex-wrap break-all">
					{` ${isCompleted ? "Amount" : "Balance"} : ${getCurrencySymbol(
						detail.base_currency,
					)}${
						isCompleted
							? formatNumberWithCommas(detail.hedge_amount)
							: formatNumberWithCommas(detail.remaining_amount)
					}`}
				</div>
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
				) : isThisPastMaturity(detail.maturity_date) ? (
					<WarningTag
						label={`Update hedge to view ${
							isCompleted ? "profit/loss" : "gaining/losing"
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
								: detail.quote_currency
						}
						className="py-1 px-3 my-0 text-mountain-meadow-dark font-inter font-bold text-sm leading-[22px]"
						onClick={() => showInfoModal()}
						value={detail.mtm}
						suffix={
							<span
								onClick={() => {
									showInfoModal();
								}}
								className="cursor-pointer"
							>
								<IIcon
									svgStyles="scale-[70%]"
									color={detail.mtm < 0 ? "#AB404A" : "#006C51"}
								/>
							</span>
						}
						tagText={parseInt(detail.mtm) < 0 ? "Losing" : "Gaining"}
					/>
				)}
			</div>
			<div className="flex items-center text-mine-shaft-3 text-xs font-normal leading-4 pt-2">
				<div className="w-full">
					<div>Hedge rate</div>
					<div className="text-blackDark text-sm font-normal leading-[22px]">
						{getCurrencySymbol(detail?.quote_currency)
							? getCurrencySymbol(detail?.quote_currency)
							: `${detail?.quote_currency}`}
						{formatNumberWithCommas(detail?.hedged_rates)}
					</div>
				</div>
				{detail.status !== "completed" && (
					<div className="w-full">
						<div>Market rate</div>
						<div className="text-blackDark text-sm font-normal leading-[22px]">
							{getCurrencySymbol(detail?.quote_currency)
								? getCurrencySymbol(detail?.quote_currency)
								: `${detail.quote_currency}`}
							{detail?.current_market_rates || 0}
						</div>
					</div>
				)}
				<div className="w-full">
					<div>Maturity date</div>
					<div className="text-blackDark text-sm font-normal leading-[22px]">
						{formatedDate(detail?.maturity_date)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default HedgeItem;
