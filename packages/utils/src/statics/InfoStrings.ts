const UPDATETRADEINFO = [
	{
		title: "Invoice value",
		description: [
			"Invoice value is the total amount of money owed by customers for goods or services delivered, representing the potential risk of non-payment or delayed payment. ",
		],
	},
	{
		title: "Benchmark rate",
		description: [
			"Benchmark rate is the reference interest rate used to determine the cost of borrowing and the potential financial impact of interest rate fluctuations on payments, loans, investments, and other financial instruments.",
		],
	},
	{
		title: "Invoice number",
		description: [
			"Invoice number is a unique identifier assigned to each invoice issued to customers. It helps track and manage outstanding payments, reducing the risk of errors or disputes related to transactions.",
		],
	},
	{
		title: "Counterparty name",
		description: [
			"Counterparty name refers to the name of the other party involved in a financial transaction or contractual agreement. It helps identify the entity with whom the business has financial relationships.",
		],
	},
];

const TRANSACTIONSINFO = [
	{
		title: "Profit",
		description:
			"Profit on a transaction or a trade refers to the actual profit that arises when converting foreign currency payments received or made during international trade into or from the domestic currency at a more favourable exchange rate than the rate at which the transaction was initially recorded in the account books.",
	},
	{
		title: "Loss",
		description:
			"Loss on a transaction or a trade refers to the actual loss that occurs when converting foreign currency payments received or made during international trade into or from the domestic currency at a less favourable exchange rate than the rate at which the transaction was initially recorded in the account books.",
	},
];

const TRADEDETAILSINFO = [
	{
		title: "Remaining amount",
		description: `The "Remaining Amount" on the Original Invoice refers to the outstanding balance that needs to be received or paid after accounting for any partial payments or receivables that have been adjusted against the specific invoice.`,
	},
	{
		title: "Gain",
		description: `When an open position(both hedged and unhedged combined) of a trade is marked-to-market, its value is refreshed to reflect the current market price.`,
		subDescription: `For an export, if the market price has increased for an unhedged position or if the market price has decreased for a hedged position, since the position was opened, the unrealised gain is displayed.
    For an import, if the market price has decreased for an unhedged position or if the market price has increased for a hedged position, since the position was opened, the unrealised gain is displayed..`,
		moreDescription: `This gain represents the potential profit that could be realised if the position were to be closed or completed at that moment.`,
	},

	{
		title: "Risk",
		description: `When an open position(both hedged and unhedged combined) of a trade is marked-to-market, its value is refreshed to reflect the current market price.`,
		subDescription: `For an export, if the market price has decreased for an unhedged position or if the market price has increased for a hedged position, since the position was opened, the unrealised loss is displayed.
    For an import, if the market price has increased for an unhedged position or if the market price has decreased for a hedged position, since the position was opened, the unrealised loss is displayed.`,
		moreDescription: `This loss represents the risk of a potential loss that could be incurred if the position were to be closed or completed at that moment.`,
	},
	{
		title: "Hedged amount",
		description: `This loss represents the risk of a potential loss that could be incurred if the position were to be closed or completed at that moment.`,
	},
	{
		title: "Unhedged amount",
		description: `An unhedged amount is the portion of exchange rate risk on an outstanding invoice that remains unprotected from currency movements. It represents the amount of the business's exposure vulnerable to potential losses or adverse currency movements.`,
	},
	{
		title: "Benchmark rate",
		description: `Benchmark rate is the rate at which a receivable or payable is booked in the books of accounts. It could be either RBI’s customs rate, Bill of Entry rate, any internally decided benchmark rate, or simple forward rate for the respective maturity period of the invoice.`,
	},
	{
		title: "Current market rate",
		description: `The current market rate refers to the prevailing or current exchange rate corresponding to the exposure’s maturity period. It serves as a benchmark for calculating the moneyness of outstanding receivables, payables, and hedges undertaken for their set benchmark rate/ hedged rate.`,
	},
	{
		title: "Maturity date",
		description: `Maturity date represents the timeframe by which the receivable on an invoice should be realised or the payment on an invoice should be settled.`,
	},
	{
		title: "Trade type",
		description: `Trade type, such as import or export, refers to the specific category of international trade activity to which an invoice belongs.`,
	},
	{
		title: "Invoice number",
		description: `Invoice number is a unique identifier assigned to each invoice issued to customers. It helps track and manage outstanding payments, reducing the risk of errors, or disputes related to transactions.`,
	},
	{
		title: "Counterparty name",
		description: `Counterparty name refers to the name of the other party involved in a trade transaction or contractual agreement. It helps identify the entity with whom the business has financial relationships.`,
	},
];

const TRADECASHPAYMENTINFO = [
	{
		title: "Cash rate",
		description: `add this info: When you receive a payment in a foreign currency for an export or make a payment in a foreign currency for an import, you need to convert or pay that foreign currency into or from your own domestic currency. The rate at which this conversion/payment occurs is known as the "cash rate" or "market rate" .`,
	},
];

const HEDGESTABINFO = [
	{
		title: "Gaining",
		description: `When an open position is marked-to-market, its value is adjusted to reflect the current market price. If the market price has increased since the position was opened, the unrealised gain is displayed. This gain represents the potential profit that could be realised if the position were to be closed or completed at that moment.`,
		subDescription: `Until the position is closed, the gain is only a paper profit.`,
	},
	{
		title: "Losing",
		description: `When an open position is marked-to-market, its value is adjusted to reflect the current market price. If the market price decreases, the open position will reflect an unrealised loss. This represents the potential loss that would be incurred if the position were to be closed at that moment.`,
		subDescription: `Like gains, these losses remain unrealised until the position is closed.`,
	},
];

const HEDGEDETAILSINFO = [
	{
		title: "Balance amount",
		description: `Remaining amount in a hedge refers to the hedge position that is available to be used for managing potential risks due to changes in market conditions, such as fluctuations in exchange rates.`,
	},
	{
		title: "Linked amount",
		description: `Linked amount is the part of a hedged position that corresponds to a single or multiple trades added on WiredUp.`,
	},
	{
		title: "Unlinked amount",
		description: `Unlinked amount is the remaining portion of the hedged position that has not been assigned to any specific trade(s) added on WiredUp. This portion might be used for future trades for managing general risk exposure or for other strategic purposes.`,
	},
	{
		title: "Hedge rate",
		description: `Hedge rate refers to the predetermined exchange rate in a hedging transaction to secure a future value for a receivable or a payable.`,
	},
	{
		title: "Current market rate",
		description: `The current market rate refers to the prevailing or current exchange rate corresponding to the exposure’s maturity period. It serves as a benchmark for calculating the moneyness of outstanding receivables, payables, and hedges undertaken for their set benchmark rate/ hedged rate.`,
	},
	{
		title: "Maturity date",
		description: `The maturity date for a hedge refers to the date on which the hedging contract expires or comes to an end.`,
	},
	{
		title: "Trade type",
		description: `Trade type, such as import or export, refers to the specific category of international trade activity to which an invoice belongs.`,
	},
	{
		title: "Gaining",
		description: `When an open position is marked-to-market, its value is adjusted to reflect the current market price. If the market price has increased since the position was opened, the unrealised gain is displayed. This gain represents the potential profit that could be realised if the position were to be closed or completed at that moment.`,
		subDescription: `Until the position is closed, the gain is only a paper profit.`,
	},
	{
		title: "Losing",
		description: `When an open position is marked-to-market,\n\n its value is adjusted to reflect the current market price. If the market price decreases, the open position will reflect an unrealised loss. This represents the potential loss that would be incurred if the position were to be closed at that moment.`,
		subDescription: `Like gains, these losses remain unrealised until the position is closed.`,
	},

	{
		title: "Hedge basis",
		description: "TBD",
	},
];

const CANCELHEDGEINFO = [
	{
		title: "Cancellation amount",
		description:
			"The amount to be cancelled from a hedge booked with a bank/exchange refers to the portion of the original hedging contract that you wish to terminate or cancel before the hedge’s maturity date. ",
	},
	{
		title: "Cancellation rate",
		description:
			"The cancellation rate refers to the foreign exchange rate that was used for canceling or unwinding a foreign exchange (FX) hedging transaction.",
	},
];

const UPDATEHEDGEINFO = [
	{
		title: "Hedge amount",
		description:
			"Hedge amount refers to the portion of a financial transaction or investment that is protected or mitigated against potential losses through the use of a financial instrument known as a hedge. Hedging is a risk management strategy that involves taking offsetting positions to reduce or eliminate the impact of potential adverse price movements.",
	},
	{
		title: "Hedge rate",
		description:
			"Hedge rate refers to the predetermined exchange rate in a hedging transaction to secure a future value for a receivable or a payable.",
	},
];

const UPDATEHEDGEINFO_WEB = [
	{
		title: "Hedge amount",
		description: [
			"Hedge amount refers to the portion of a financial transaction or investment that is protected or mitigated against potential losses through the use of a financial instrument known as a hedge. Hedging is a risk management strategy that involves taking offsetting positions to reduce or eliminate the impact of potential adverse price movements.",
		],
	},
	{
		title: "Hedge rate",
		description: [
			"Hedge rate refers to the predetermined exchange rate in a hedging transaction to secure a future value for a receivable or a payable.",
		],
	},
];

const USEHEDGEINFO = [
	{
		title: "Utilisation Amount",
		description:
			"The amount to be utilised from a hedge booked with a bank refers to the portion of the original hedging contract that you wish to utilise for incoming or an outgoing payment.",
	},
];

const TRADEDETAILSINFO_WEB = [
	{
		title: "Remaining amount",
		description: [
			`The "Remaining Amount" on the Original Invoice refers to the outstanding balance that needs to be received or paid after accounting for any partial payments or receivables that have been adjusted against the specific invoice.`,
		],
	},
	{
		title: "Gain",
		description: [
			`When an open position(both hedged and unhedged combined) of a trade is marked-to-market, its value is refreshed to reflect the current market price.`,
			`For an export, if the market price has increased for an unhedged position or if the market price has decreased for a hedged position, since the position was opened, the unrealised gain is displayed.
      For an import, if the market price has decreased for an unhedged position or if the market price has increased for a hedged position, since the position was opened, the unrealised gain is displayed..`,
			`This gain represents the potential profit that could be realised if the position were to be closed or completed at that moment.`,
		],
	},
	{
		title: "Risk",
		description: [
			`When an open position(both hedged and unhedged combined) of a trade is marked-to-market, its value is refreshed to reflect the current market price.`,
			`For an export, if the market price has decreased for an unhedged position or if the market price has increased for a hedged position, since the position was opened, the unrealised loss is displayed.
    For an import, if the market price has increased for an unhedged position or if the market price has decreased for a hedged position, since the position was opened, the unrealised loss is displayed.`,
			`This loss represents the risk of a potential loss that could be incurred if the position were to be closed or completed at that moment.`,
		],
	},
	{
		title: "Hedged amount",
		description: [
			`This loss represents the risk of a potential loss that could be incurred if the position were to be closed or completed at that moment.`,
		],
	},
	{
		title: "Unhedged amount",
		description: [
			`An unhedged amount is the portion of exchange rate risk on an outstanding invoice that remains unprotected from currency movements. It represents the amount of the business's exposure vulnerable to potential losses or adverse currency movements.`,
		],
	},
	{
		title: "Benchmark rate",
		description: [
			`Benchmark rate is the rate at which a receivable or payable is booked in the books of accounts. It could be either RBI’s customs rate, Bill of Entry rate, any internally decided benchmark rate, or simple forward rate for the respective maturity period of the invoice.`,
		],
	},
	{
		title: "Current market rate",
		description: [
			`The current market rate refers to the prevailing or current exchange rate corresponding to the exposure’s maturity period. It serves as a benchmark for calculating the moneyness of outstanding receivables, payables, and hedges undertaken for their set benchmark rate/ hedged rate.`,
		],
	},
	{
		title: "Maturity date",
		description: [
			`Maturity date represents the timeframe by which the receivable on an invoice should be realised or the payment on an invoice should be settled.`,
		],
	},
	{
		title: "Trade type",
		description: [
			`Trade type, such as import or export, refers to the specific category of international trade activity to which an invoice belongs.`,
		],
	},
	{
		title: "Invoice number",
		description: [
			`Invoice number is a unique identifier assigned to each invoice issued to customers. It helps track and manage outstanding payments, reducing the risk of errors, or disputes related to transactions.`,
		],
	},
	{
		title: "Counterparty name",
		description: [
			`Counterparty name refers to the name of the other party involved in a trade transaction or contractual agreement. It helps identify the entity with whom the business has financial relationships.`,
		],
	},
];

const TRADEDETAILSINFO_MOBILE = [
	{
		title: "Remaining amount",
		description: `The "Remaining Amount" on the Original Invoice refers to the outstanding balance that needs to be received or paid after accounting for any partial payments or receivables that have been adjusted against the specific invoice.`,
	},
	{
		title: "Gain",
		description: `When an open position(both hedged and unhedged combined) of a trade is marked-to-market, its value is refreshed to reflect the current market price.`,
		subDescription: `For an export, if the market price has increased for an unhedged position or if the market price has decreased for a hedged position, since the position was opened, the unrealised gain is displayed.
    For an import, if the market price has decreased for an unhedged position or if the market price has increased for a hedged position, since the position was opened, the unrealised gain is displayed..`,
		moreDescription: `This gain represents the potential profit that could be realised if the position were to be closed or completed at that moment.`,
	},

	{
		title: "Risk",
		description: `When an open position(both hedged and unhedged combined) of a trade is marked-to-market, its value is refreshed to reflect the current market price.`,
		subDescription: `For an export, if the market price has decreased for an unhedged position or if the market price has increased for a hedged position, since the position was opened, the unrealised loss is displayed.
    For an import, if the market price has increased for an unhedged position or if the market price has decreased for a hedged position, since the position was opened, the unrealised loss is displayed.`,
		moreDescription: `This loss represents the risk of a potential loss that could be incurred if the position were to be closed or completed at that moment.`,
	},
	{
		title: "Hedged amount",
		description: `This loss represents the risk of a potential loss that could be incurred if the position were to be closed or completed at that moment.`,
	},
	{
		title: "Unhedged amount",
		description: `An unhedged amount is the portion of exchange rate risk on an outstanding invoice that remains unprotected from currency movements. It represents the amount of the business's exposure vulnerable to potential losses or adverse currency movements.`,
	},
	{
		title: "Benchmark rate",
		description: `Benchmark rate is the rate at which a receivable or payable is booked in the books of accounts. It could be either RBI’s customs rate, Bill of Entry rate, any internally decided benchmark rate, or simple forward rate for the respective maturity period of the invoice.`,
	},
	{
		title: "Current market rate",
		description: `The current market rate refers to the prevailing or current exchange rate corresponding to the exposure’s maturity period. It serves as a benchmark for calculating the moneyness of outstanding receivables, payables, and hedges undertaken for their set benchmark rate/ hedged rate.`,
	},
	{
		title: "Maturity date",
		description: `Maturity date represents the timeframe by which the receivable on an invoice should be realised or the payment on an invoice should be settled.`,
	},
	{
		title: "Trade type",
		description: `Trade type, such as import or export, refers to the specific category of international trade activity to which an invoice belongs.`,
	},
	{
		title: "Invoice number",
		description: `Invoice number is a unique identifier assigned to each invoice issued to customers. It helps track and manage outstanding payments, reducing the risk of errors, or disputes related to transactions.`,
	},
	{
		title: "Counterparty name",
		description: `Counterparty name refers to the name of the other party involved in a trade transaction or contractual agreement. It helps identify the entity with whom the business has financial relationships.`,
	},
];

const RECORDPAYMENTSHOMEINFO = [
	{
		title: "Gaining",
		description: `When an open position is marked-to-market, its value is adjusted to reflect the current market price. If the market price has increased since the position was opened, the unrealised gain is displayed. This gain represents the potential profit that could be realised if the position were to be closed or completed at that moment.`,
		subDescription: `Until the position is closed, the gain is only a paper profit.`,
	},
	{
		title: "Losing",
		description: `When an open position is marked-to-market,\n\n its value is adjusted to reflect the current market price. If the market price decreases, the open position will reflect an unrealised loss. This represents the potential loss that would be incurred if the position were to be closed at that moment.`,
		subDescription: `Like gains, these losses remain unrealised until the position is closed.`,
	},
];

const PROFIT_LOSS_INFO = [
	{
		title: "Profit",
		description: [
			"Profit on a transaction or a trade refers to the actual profit that arises when converting foreign currency payments received or made during international trade into or from the domestic currency at a more favourable exchange rate than the rate at which the transaction was initially recorded in the account books.",
		],
	},
	{
		title: "Loss",
		description: [
			"Loss on a transaction or a trade refers to the actual loss that occurs when converting foreign currency payments received or made during international trade into or from the domestic currency at a less favourable exchange rate than the rate at which the transaction was initially recorded in the account books.",
		],
	},
];
const GAIN_RISK_INFO = [
	{
		title: "Gain",
		description: [
			`When an open position(both hedged and unhedged combined) of a trade is marked-to-market, its value is refreshed to reflect the current market price.`,
			`For an export, if the market price has increased for an unhedged position or if the market price has decreased for a hedged position, since the position was opened, the unrealised gain is displayed.
      For an import, if the market price has decreased for an unhedged position or if the market price has increased for a hedged position, since the position was opened, the unrealised gain is displayed..`,
			`This gain represents the potential profit that could be realised if the position were to be closed or completed at that moment.`,
		],
	},
	{
		title: "Risk",
		description: [
			`When an open position(both hedged and unhedged combined) of a trade is marked-to-market, its value is refreshed to reflect the current market price.`,
			`For an export, if the market price has decreased for an unhedged position or if the market price has increased for a hedged position, since the position was opened, the unrealised loss is displayed.
    For an import, if the market price has increased for an unhedged position or if the market price has decreased for a hedged position, since the position was opened, the unrealised loss is displayed.`,
			`This loss represents the risk of a potential loss that could be incurred if the position were to be closed or completed at that moment.`,
		],
	},
];

export {
	USEHEDGEINFO,
	HEDGESTABINFO,
	CANCELHEDGEINFO,
	UPDATETRADEINFO,
	UPDATEHEDGEINFO,
	TRANSACTIONSINFO,
	TRADEDETAILSINFO,
	HEDGEDETAILSINFO,
	TRADECASHPAYMENTINFO,
	TRADEDETAILSINFO_WEB,
	RECORDPAYMENTSHOMEINFO,
	UPDATEHEDGEINFO_WEB,
	TRADEDETAILSINFO_MOBILE,
	PROFIT_LOSS_INFO,
	GAIN_RISK_INFO,
};
