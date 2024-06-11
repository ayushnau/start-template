const HedgeColumnList = [
	"#",
	"Hedge type",
	"Currency pair",
	"Maturity date",
	"Bank Name",
	"Hedge Rate",
	"Market rate",
	"Balance Amount",
	"Linked amount",
	"Unlinked amount",
	"Gain/Risk",
	"",
];
const HedgeKeyList = [
	{ label: "#", class: "w-[30px] max-w-[30px]" },
	{ label: "hedge_type", class: "w-[82px]" },
	{ label: "currency_pair", class: "min-w-[120px] w-[120px]" },
	{ label: "maturity_date", class: "w-[80px]" },
	{
		label: "bank_name",
		class: "w-[80px] max-w-[200px] whitespace-normal",
	},
	{ label: "hedged_rates", class: "w-[80px]" },
	{ label: "current_market_rates", class: "w-[100px]" },
	{ label: "remaining_amount", class: "w-[130px]" },
	{ label: "linked_amount", class: "w-[100px]" },
	{ label: "unlinked_amount", class: "w-[100px]" },
	{ label: "mtm", class: "w-[150px]" },
	{
		label: "icon",
		class: " w-[40px] max-w-[40px]",
	},
];

const LoanColumnList = [
	"#",
	"Currency pair",
	"Amount",
	"Remaining Amount",
	"Maturity date",
	"Bank Name",
	"Loan number",
	"Order number",
	"Drawdown rate",
	"ROI",
	"",
];
const LoanKeyList = [
	{ label: "#", class: "w-[30px] max-w-[30px]" },
	{ label: "currency_pair", class: "w-[100px]" },
	{ label: "pcfc_amount", class: "min-w-[120px] w-[120px]" },
	{ label: "remaining_amount", class: "min-w-[120px] w-[120px]" },
	{ label: "maturity_date", class: "w-[80px]" },
	{
		label: "bank_name",
		class: "min-w-[120px] w-[120px]",
	},
	{ label: "loan_number", class: "min-w-[120px] w-[120px]" },
	{ label: "order_number", class: "min-w-[120px] w-[120px]" },
	{ label: "drawdown_rate", class: "min-w-[120px] w-[120px]" },
	{ label: "return_on_investment_rate", class: "w-[100px]" },
	{ label: "repay", class: "min-w-[100px] w-[100px]" },

	{
		label: "icon",
		class: " w-[120px] max-w-[120px]",
	},
];

const RepayLoanColumnList = [
	"",
	"#",
	"Ledger",
	"Maturity date",
	"Bank Name",
	"Benchmark",
	"Invoice number",
	"Remaining balance",
	"Unhedged amount",
	"Amount to be used",
];

const RepayLoanKeyList = [
	{ label: "#", class: "w-[30px] max-w-[30px]" },
	{ label: "ledger_name", class: "w-[120px]" },
	{ label: "maturity_date", class: "w-[80px]" },
	{
		label: "bank_name",
		class: "min-w-[120px] w-[120px]",
	},
	{ label: "benchmark_rate", class: "min-w-[120px] w-[120px]" },
	{ label: "cp_invoice_number", class: "min-w-[120px] w-[120px]" },
	{ label: "remaining_amount", class: "min-w-[120px] w-[120px]" },
	{ label: "unhedged_amount", class: "min-w-[120px] w-[120px]" },
	{ label: "amount_to_be_used", class: "w-[100px]" },
];
const RepayLoanEefcColumnList = [
	"",
	"#",
	"Remaining balance",
	"Benchmark",
	"Credit date",
	"Maturity date",
	"Bank Name",
	"Invoice number",
	"Counterparty name",
	"Gain/Risk",
	"Amount to be used",
];

const RepayLoanEefcKeyList = [
	{ label: "#", class: "w-[30px] max-w-[30px]" },
	{ label: "remaining_amount", class: "min-w-[120px] w-[120px]" },
	{ label: "benchmark_rate", class: "min-w-[120px] w-[120px]" },
	{ label: "credit_date", class: "w-[120px]" },
	{ label: "maturity_date", class: "w-[80px]" },
	{
		label: "bank_name",
		class: "min-w-[120px] w-[120px]",
	},
	{ label: "invoice_number", class: "min-w-[120px] w-[120px]" },
	{ label: "cp_name", class: "min-w-[120px] w-[120px]" },
	{ label: "mtm", class: "min-w-[120px] w-[120px]" },
	{ label: "amount_to_be_used", class: "w-[100px]" },
];

const HedgeColumnListCompleted = [
	"#",
	"Hedge type",
	"Currency pair",
	"Maturity date",
	"Bank Name",
	"Hedge Amount",
	"Hedge Rate",
	"Market Rate",
	"Completed on",
	"Profit/Loss",
	"",
];
const HegdeCompletedKeyList = [
	{ label: "#", class: "w-[30px] max-w-[30px]" },
	{ label: "hedge_type", class: "w-[82px]" },
	{ label: "currency_pair", class: "min-w-[120px] w-[120px]" },
	{ label: "maturity_date", class: "w-[80px]" },
	{
		label: "bank_name",
		class: "w-[80px] max-w-[200px] whitespace-normal",
	},
	{ label: "hedge_amount", class: "w-[130px]" },
	{ label: "hedged_rates", class: "w-[80px]" },
	{ label: "current_market_rates", class: "w-[100px]" },
	{ label: "last_transaction_date", class: "w-[150px]" },
	{ label: "pnl", class: "w-[150px]" },
	{
		label: "icon",
		class: " w-[40px] max-w-[40px]",
	},
];

const TradeColumnList = [
	"#",
	"Trade type",
	"Currency pair",
	"Maturity date",
	"Bank name",
	"Benchmark",
	"Invoice value",
	"Remaining balance",
	"Hedged",
	"Gain/Risk",
	"",
];

const TradeKeyList = [
	{ label: "#", class: "w-[30px] max-w-[30px]" },
	{ label: "trade_type", class: " w-[82px]" },
	{ label: "currency_pair", class: " min-w-[120px] w-[120px]" },
	{ label: "maturity_date", class: " w-[80px]" },
	{
		label: "bank_name",
		class: " min-w-[120px] w-[120px] max-w-[200px] whitespace-normal",
	},
	{ label: "benchmark_rate", class: " w-[80px]" },
	{ label: "trade_amount", class: " w-[130px]" },
	{ label: "remaining_amount", class: " w-[130px]" },
	{ label: "hedged_amount", class: " w-[100px]" },
	{ label: "mtm", class: " w-[150px]" },
	{
		label: "icon",
		class: "  w-[40px] max-w-[40px]",
	},
];

const TradeColumnListCompleted = [
	"#",
	"Trade type",
	"Currency pair",
	"Maturity date",
	"Bank name",
	"Invoice value",
	"Benchmark",
	"Hedged Amount",
	"Completed on",
	"Profit/Loss",
	"",
];

const TradeCompletedKeyList = [
	{ label: "#", class: "w-[30px] max-w-[30px]" },
	{ label: "trade_type", class: "w-[82px]" },
	{ label: "currency_pair", class: "min-w-[120px] w-[120px]" },
	{ label: "maturity_date", class: "w-[80px]" },
	{
		label: "bank_name",
		class: "w-[120px] max-w-[200px] whitespace-normal",
	},
	{ label: "trade_amount", class: "w-[130px]" },
	{ label: "benchmark_rate", class: "w-[80px]" },
	{ label: "completed_hedged_amount", class: "w-[80px]" },
	{ label: "last_transaction_date", class: "w-[80px]" },
	{ label: "pnl", class: " w-[150px]" },
	{
		label: "icon",
		class: "w-[40px] max-w-[40px]",
	},
];

const EEFCColumnList = [
	"#",
	"Currency pair",
	"Remaining amount",
	"Benchmark rate",
	"Credit date",
	"Maturity date",
	"Bank name",
	"Invoice number",
	"Counterparty name",
	"Gain/Risk",
	"",
];
const EEFCKeyList = [
	{ label: "#", class: "w-[30px] max-w-[30px]" },
	{ label: "currency_pair", class: " min-w-[240px] w-[240px]" },
	{ label: "remaining_amount", class: "w-[130px]" },
	{ label: "benchmark_rate", class: "w-[80px]" },
	{ label: "credit_date", class: "w-[80px]" },
	{ label: "maturity_date", class: "w-[80px]" },
	{
		label: "bank_name",
		class: "min-w-[120px] w-[120px] max-w-[200px] whitespace-normal",
	},
	{ label: "invoice_number", class: "w-[130px]" },
	{ label: "cp_name", class: " w-[130px]" },
	{ label: "mtm", class: " w-[130px]" },
	{
		label: "icon",
		class: "w-[40px] max-w-[40px]",
	},
];

const EEFCColumnListCompleted = [
	"#",
	"Currency pair",
	"Benchmark rate",
	"Credit date",
	"Maturity date",
	"Bank name",
	"Invoice number",
	"Counterparty name",
	"Completed on",
	"Profit/Loss",
	"",
];
const EEFCCompletedKeyList = [
	{ label: "#", class: "w-[30px] max-w-[30px]" },
	{ label: "currency_pair", class: "min-w-[120px] w-[120px]" },
	{ label: "benchmark_rate", class: "w-[80px]" },
	{ label: "credit_date", class: "w-[80px]" },
	{ label: "maturity_date", class: "w-[80px]" },
	{
		label: "bank_name",
		class: "w-[120px] max-w-[200px] whitespace-normal",
	},
	{ label: "invoice_number", class: "w-[130px]" },
	{ label: "cp_name", class: " w-[130px]" },

	{ label: "last_transaction_date", class: "w-[80px]" },
	{ label: "pnl", class: " w-[150px]" },
	{
		label: "icon",
		class: "w-[40px] max-w-[40px]",
	},
];

export {
	HedgeKeyList,
	HedgeColumnList,
	HegdeCompletedKeyList,
	TradeKeyList,
	TradeColumnList,
	TradeCompletedKeyList,
	TradeColumnListCompleted,
	HedgeColumnListCompleted,
	EEFCColumnList,
	EEFCKeyList,
	EEFCColumnListCompleted,
	EEFCCompletedKeyList,
	LoanColumnList,
	LoanKeyList,
	RepayLoanColumnList,
	RepayLoanKeyList,
	RepayLoanEefcColumnList,
	RepayLoanEefcKeyList,
};
