import React from "react";
import TransactionTag from "./TransactionTag";
import { BankIcon, SwapIcon, TimerIconV2 } from "icons";
import { getCurrencySymbol } from "services/fx/getCurrencySymbol";
import { twMerge } from "tailwind-merge";
import moment from "moment";
import { IIcon } from "icons";
import { formatNumberWithCommas } from "utils";

interface AmountInterface {
	value: string;
	currency: string;
}

type Type =
	| "transaction_via_cash_trade"
	| "transaction_via_hedge_trade"
	| "transaction_via_use_hedge"
	| "transaction_via_cancel_hedge"
	| "transaction_via_eefc_trade_payment"
	| "transfer_to_eefc"
	| "transaction_via_bank_charges"
	| "transaction_via_eefc_use_hedge_payment"
	| "transaction_via_pcfc_trade";

export interface TransactionCardProps {
	amount?: AmountInterface;
	pnl?: string;
	transaction_data: {
		[key: string]: string;
	};
	created_at: string;
	type: Type;
	showInfoModal: () => void;
}

const capFirst = (str: string) => {
	switch (str) {
		case "benchmark_rates":
			str = "benchmark_rate";
			break;
		case "market_rates":
			str = "market_rate";
			break;
		default:
			break;
	}
	return str
		.split("_")
		.map((str) => str.charAt(0).toUpperCase() + str.slice(1))
		.join(" ");
};
const capFirstV2 = (str: string) => {
	switch (str) {
		case "benchmark_rates":
			str = "invoice_benchmark_rate";
			break;
		case "cash_rate":
			str = "drawdown_rate";
			break;
		default:
			break;
	}
	return str
		.split("_")
		.map((str) => str.charAt(0).toUpperCase() + str.slice(1))
		.join(" ");
};

const BADGE_TEXT = {
	transaction_via_cash_trade: "Cash recorded:",
	transaction_via_hedge_trade: "Hedge used:",
	transaction_via_use_hedge: "Hedge used:",
	transaction_via_cancel_hedge: "Hedge cancelled:",
	transaction_via_eefc_trade_payment: "Via EEFC",
	transaction_via_bank_charges: "Bank Charges:",
	transfer_to_eefc: "EEFC Transfer:",
	transaction_via_eefc_use_hedge_payment: "Via Used Hedge",
	transaction_via_pcfc_trade: "PCFC repayment:",
};

const COLOR_CLASSES = {
	red: "text-bean-red-light bg-bean-red-dark",
	green: "text-mountain-meadow-1 bg-mountain-meadow-dark",
};

const TransactionCard: React.FC<TransactionCardProps> = ({
	amount,
	type,
	pnl = 0,
	transaction_data,
	created_at,
	showInfoModal,
}) => {
	const formatString = (string: string, key: string) => {
		if (key === "current_market_rates") {
			return parseFloat(string).toPrecision(4);
		}
		return string;
	};
	return (
		<div id="TransactionCard" className="pb-4">
			<div className="flex gap-x-4">
				{BADGE_TEXT[type] === "Bank Charges:" ? (
					<div className="mt-6">
						<BankIcon />
					</div>
				) : BADGE_TEXT[type] === "PCFC repayment:" ? (
					<div className="mt-6">
						<TimerIconV2 />
					</div>
				) : (
					<div className="mt-6">
						<SwapIcon />
					</div>
				)}
				<div className="flex flex-col w-full gap-y-1">
					<TransactionTag
						label={`${BADGE_TEXT[type]} ${moment(created_at).format(
							"DD MMM 'YY",
						)}`}
					/>
					<label className="font-inter font-bold leading-6 -tracking-[0.3px]">
						{amount &&
							`${getCurrencySymbol(amount?.currency)} ${formatNumberWithCommas(
								amount.value,
							)}`}
					</label>

					{BADGE_TEXT[type] !== "Bank Charges:" &&
					BADGE_TEXT[type as Type] !== "EEFC Transfer:" ? (
						<div
							className={twMerge(
								"inline-flex w-fit items-center rounded-md px-2 py-1 text-xs font-bold leading-4",
								COLOR_CLASSES[+pnl > 0 ? "green" : "red"],
							)}
						>
							<label>
								{`${
									typeof pnl === "string"
										? getCurrencySymbol(
												transaction_data?.benchmark_rate_currency ||
													transaction_data?.market_rates_currency ||
													transaction_data?.hedge_rate_currency,
										  )
											? getCurrencySymbol(
													transaction_data?.benchmark_rate_currency ||
														transaction_data?.benchmark_rates_currency ||
														transaction_data?.market_rates_currency ||
														transaction_data?.hedge_rate_currency,
											  ) + formatNumberWithCommas(pnl)
											: formatNumberWithCommas(pnl)
										: +pnl.toFixed(2)
								} ${+pnl > 0 ? "Profit" : "Loss"}`}
							</label>
							<span
								onClick={(e) => {
									showInfoModal();
								}}
							>
								<IIcon
									color={+pnl < 0 ? "#FFDADA" : "#D1F0E1"}
									svgStyles={"scale-[70%] ml-[2px]"}
								/>
							</span>
						</div>
					) : (
						""
					)}

					{BADGE_TEXT[type] === "PCFC repayment:" ? (
						<div id="DataSection" className="w-full flex gap-x-2 py-1">
							{transaction_data &&
								Object.keys(transaction_data)
									.filter((key: string) => !key.includes("_currency"))
									.filter((key: string) => !key.includes("hedged_rate"))
									.map((key: string) => {
										return (
											<div key={key} className="flex flex-col w-full gap-y-1">
												<div className="font-inter text-xs leading-4 text-mine-shaft-3">
													{capFirstV2(key)}
												</div>
												<div className="text-blackDark text-sm font-normal leading-[22px]">
													{transaction_data[key] &&
														getCurrencySymbol(
															transaction_data[`${key}_currency`]
																? transaction_data[`${key}_currency`]
																: "",
														)}
													{transaction_data[key] &&
														formatString(transaction_data[key], key)}
												</div>
											</div>
										);
									})}
						</div>
					) : (
						<div id="DataSection" className="w-full flex gap-x-2 py-1">
							{transaction_data &&
								Object.keys(transaction_data)
									.filter((key: string) => !key.includes("_currency"))
									.filter((key: string) => !key.includes("hedged_rate"))
									.map((key: string) => {
										return (
											<div key={key} className="flex flex-col w-full gap-y-1">
												<div className="font-inter text-xs leading-4 text-mine-shaft-3">
													{capFirst(key)}
												</div>
												<div className="text-blackDark text-sm font-normal leading-[22px]">
													{transaction_data[key] &&
														getCurrencySymbol(
															transaction_data[`${key}_currency`]
																? transaction_data[`${key}_currency`]
																: "",
														)}
													{transaction_data[key] &&
														formatString(transaction_data[key], key)}
												</div>
											</div>
										);
									})}
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default TransactionCard;
