import React from "react";
import IECardWrapper from "./IECardWrapper";
import { GreenRoundedCheckIcon } from "icons";
import { twMerge } from "tailwind-merge";
import QuoteInfo from "./QuoteInfo";
import { UnderlineButton } from "../../..";
import showQuoteAnalysisModal from "./QuoteAnalysisModal";
import { getCurrencySymbol } from "services/fx/getCurrencySymbol";
import BreakEvenRateSection from "./BreakEvenRateSection";

export interface QuoteResultsInterface {
	base_currency: string;
	quote_currency: string;
	selectedMonths: any[];
	success?: boolean;
	weighted_avg_rate: string;
	total_pnl?: string;
	rate?: string;
	web?: boolean;
}

const QuoteResults: React.FC<QuoteResultsInterface> = ({
	success = true,
	selectedMonths,
	base_currency,
	quote_currency,
	weighted_avg_rate,
	total_pnl,
	rate,
	web = false,
}) => {
	const label1 = (+weighted_avg_rate).toFixed(4);
	const pnl_string = !success
		? "You are at a risk of"
		: "You are expected to make a gain of";

	const BreakEvenTag = () => (
		<div className="mt-2 font-inter px-3 py-1 bg-color-black-1 text-color-black-6 w-fit text-sm font-bold rounded-lg ">{`Break-even rate: ${getCurrencySymbol(
			quote_currency,
		)}${(+label1).toFixed(2)}`}</div>
	);

	const handleViewDetailsClick = async () => {
		await showQuoteAnalysisModal({
			content: selectedMonths,
			base_currency: base_currency,
			quote_currency: quote_currency,
			web: web,
		});
	};

	return (
		<IECardWrapper className="gap-y-3">
			<div className="flex flex-col gap-y-1 ">
				{total_pnl && rate && (
					<>
						<label className="font-inter text-sm leading-[22px] text-mine-shaft-4">
							{pnl_string}
						</label>
						<div className="flex items-center gap-x-2">
							<label
								className={twMerge(
									"text-xl font-bold leading-[26px] -tracking[0.35px]",
									!total_pnl.includes("-")
										? "text-mountain-meadow-2"
										: "text-sunset-orange-2",
								)}
							>
								{`${getCurrencySymbol(quote_currency)}${(+total_pnl)
									.toFixed(2)
									.replaceAll("-", "")}`}
							</label>
						</div>
						<label className="font-inter text-sm leading-[22px] text-mine-shaft-4">
							At the quotation rate of
						</label>
						<div className="flex items-center gap-x-2">
							<label
								className={twMerge(
									"text-xl font-bold leading-[26px] -tracking[0.35px]",
									!total_pnl.includes("-")
										? "text-mountain-meadow-2"
										: "text-sunset-orange-2",
								)}
							>
								{`${getCurrencySymbol(quote_currency)}${(+rate).toFixed(2)}`}
							</label>
							{!total_pnl.includes("-") && (
								<GreenRoundedCheckIcon className="h-5 w-5" />
							)}
						</div>
					</>
				)}

				{!rate ? (
					<BreakEvenRateSection
						label1={label1}
						quote_currency={quote_currency}
						showCheck={!rate ? true : false}
						rate={rate}
					/>
				) : total_pnl?.includes("-") ? (
					<BreakEvenRateSection
						label1={label1}
						quote_currency={quote_currency}
						showCheck={true}
						rate={rate}
					/>
				) : (
					<BreakEvenTag />
				)}
			</div>
			{rate && (
				<UnderlineButton
					className="w-fit px-0 py-1 h-8"
					buttonText="View Details"
					onClick={() => {
						handleViewDetailsClick();
					}}
				/>
			)}
			<div className="border-b border-mine-shaft-2 w-full" />
			<QuoteInfo />
		</IECardWrapper>
	);
};

export default QuoteResults;
