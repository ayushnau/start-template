import React from "react";
import TransactionTag from "./TransactionTag";
import { CashPaymentIcon, NetOff, UseHedgesIcon } from "icons";
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
	| "transaction_via_cash_eefc"
	| "transaction_via_eefc_trade_payment"
	| "transaction_via_eefc_use_hedge_payment";

export interface EEFCTransactionCardProps {
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

const BADGE_TEXT = {
	transaction_via_eefc_use_hedge_payment: "Hedge Used:",
	transaction_via_eefc_trade_payment: "Import net-off:",
	transaction_via_cash_eefc: "Cash recorded:",
};

const COLOR_CLASSES = {
	red: "text-bean-red-light bg-bean-red-dark",
	green: "text-mountain-meadow-1 bg-mountain-meadow-dark",
};

const EEFCTransactionCard: React.FC<EEFCTransactionCardProps> = ({
	amount,
	type,
	pnl = 0,
	transaction_data,
	created_at,
	showInfoModal,
}) => {
	const formatString = (string: string, key: string) => {
		if (key === "charges") {
			return parseFloat(string).toPrecision(3);
		} else if (
			key === "hedged_rates" ||
			key === "benchmark_rates" ||
			key === "cash_rate" ||
			key === "market_rates"
		) {
			return parseFloat(string).toFixed(2);
		}
		return string;
	};

	return (
		<div id="EEFCTransactionCard" className="pb-4">
			<div className="flex gap-x-4">
				{BADGE_TEXT[type] === "Hedge Used:" ? (
					<div className="mt-6">
						<UseHedgesIcon />
					</div>
				) : BADGE_TEXT[type] === "Import net-off:" ? (
					<div className="mt-6">
						<NetOff />
					</div>
				) : (
					<div className="mt-6">
						<CashPaymentIcon />
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
									: pnl
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
					<div id="DataSection" className="w-full flex gap-x-2 py-1">
						{transaction_data &&
							Object.keys(transaction_data)
								.filter((key: string) => !key.includes("_currency"))
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
				</div>
			</div>
		</div>
	);
};

export default EEFCTransactionCard;
