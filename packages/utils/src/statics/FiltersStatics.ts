const TRANSACTIONFILTERSTATICS = {
	all: { label: "All", value: "" },
	hedgeUsed: { label: "Hedge Used", value: "transaction_via_hedge_trade" },
	cash: { label: "Cash", value: "transaction_via_cash_trade" },
	used: {
		label: "Used",
		value: "transaction_via_hedge_trade,transaction_via_use_hedge",
	},
	cancelled: { label: "Cancelled", value: "transaction_via_cancel_hedge" },
	eefcTransfer: { label: "EEFC Transfer", value: "transfer_to_eefc" },
	eefcPaid: {
		label: "Via EEFC account",
		value: "transaction_via_eefc_trade_payment",
	},
	bankCharges: { label: "Bank Charges", value: "transaction_via_bank_charges" },
	pcfcRepayment: {
		label: "PCFC repayment",
		value: "transaction_via_pcfc_trade",
	},
};

const TRANSACTIONEEFCFILTERSTATICS = {
	all: { label: "All", value: "" },
	hedgeUsed: {
		label: "Hedge Used",
		value: "transaction_via_eefc_use_hedge_payment",
	},
	cash: { label: "Cash", value: "transaction_via_cash_eefc" },
	import_net_off: {
		label: "Import Net Off",
		value: "transaction_via_eefc_trade_payment",
	},
};

const TRANSACTIONPCFCFILTERSTATICS = {
	all: { label: "All", value: "" },
	repayTrade: {
		label: "Repay by Trade:",
		value: "transaction_via_pcfc_trade",
	},
	repayEefc: { label: "Repay by EEFC:", value: "transaction_via_pcfc_eefc" },
};

const TRADE_SORT_OPTIONS = [
	{
		label: { main: "Invoice value", sub: ": Low to High" },
		value: 1,
		sort_by: "trade_amount",
		order_by: "asc",
	},
	{
		label: { main: "Invoice value", sub: ": High to Low" },
		value: 2,
		sort_by: "trade_amount",
		order_by: "desc",
	},
	{
		label: { main: "Maturity date", sub: ": Ascending" },
		value: 3,
		sort_by: "maturity_date",
		order_by: "asc",
	},
	{
		label: { main: "Maturity date", sub: ": Descending" },
		value: 4,
		sort_by: "maturity_date",
		order_by: "desc",
	},
];

const ACTIVE_OPTIONS = [
	{ label: { main: "Active" }, value: 1 },
	{ label: { main: "Completed" }, value: 2 },
];

const TRANSACTION_OPTIONS = [
	{ label: { main: "Bank Charges" }, value: 1 },
	{ label: { main: "PCFC repayment" }, value: 2 },
];

const HEDGE_SORT_OPTIONS = [
	{
		label: { main: "Hedge balance", sub: ": Low to High" },
		value: 1,
		sort_by: "remaining_amount",
		order_by: "asc",
	},
	{
		label: { main: "Hedge balance", sub: ": High to Low" },
		value: 2,
		sort_by: "remaining_amount",
		order_by: "desc",
	},
	{
		label: { main: "Maturity date", sub: ": Ascending" },
		value: 3,
		sort_by: "maturity_date",
		order_by: "asc",
	},
	{
		label: { main: "Maturity date", sub: ": Descending" },
		value: 4,
		sort_by: "maturity_date",
		order_by: "desc",
	},
];

const LOAN_PCFC_SORT_OPTIONS = [
	{
		label: { main: "Maturity date", sub: ": Ascending" },
		value: 1,
		sort_by: "maturity_date",
		order_by: "asc",
	},
	{
		label: { main: "Maturity date", sub: ": Descending" },
		value: 2,
		sort_by: "maturity_date",
		order_by: "desc",
	},
	{
		label: { main: "Remaining balance", sub: ": Low to High" },
		value: 3,
		sort_by: "remaining_amount",
		order_by: "asc",
	},
	{
		label: { main: "Remaining balance", sub: ": High to Low" },
		value: 4,
		sort_by: "remaining_amount",
		order_by: "desc",
	},
];

const LINKEDLIST_HEDGE_SORT_OPTIONS = [
	{
		label: { main: "Hedge balance", sub: ": Low to High" },
		value: 1,
		sort_by: "remaining_amount",
		order_by: "asc",
	},
	{
		label: { main: "Invoice value", sub: ": High to Low" },
		value: 2,
		sort_by: "remaining_amount",
		order_by: "desc",
	},
	{
		label: { main: "Maturity date", sub: ": Ascending" },
		value: 3,
		sort_by: "maturity_date",
		order_by: "asc",
	},
	{
		label: { main: "Maturity date", sub: ": Descending" },
		value: 4,
		sort_by: "maturity_date",
		order_by: "desc",
	},
];

const LEDGER_SORT_OPTIONS = [
	{
		label: { main: "Name (A-Z)", sub: ": Ascending" },
		value: 1,
		sort_by: "name",
		order_by: "asc",
	},
	{
		label: { main: "Name (A-Z)", sub: ": Descending" },
		value: 2,
		sort_by: "name",
		order_by: "desc",
	},
	{
		label: { main: "Modified date", sub: ": Ascending" },
		value: 3,
		sort_by: "updated_at",
		order_by: "asc",
	},
	{
		label: { main: "Modified date", sub: ": Descending" },
		value: 4,
		sort_by: "updated_at",
		order_by: "desc",
	},
	{
		label: { main: "Creation date", sub: ": Ascending" },
		value: 5,
		sort_by: "created_at",
		order_by: "asc",
	},
	{
		label: { main: "Creation date", sub: ": Descending" },
		value: 6,
		sort_by: "created_at",
		order_by: "desc",
	},
];

const EEFC_SORT_OPTIONS = [
	{
		label: { main: "Credit Date", sub: ": Ascending" },
		value: 1,
		sort_by: "credit_date",
		order_by: "asc",
	},
	{
		label: { main: "Credit Date", sub: ": Descending" },
		value: 2,
		sort_by: "credit_date",
		order_by: "desc",
	},
	{
		label: { main: "Maturity Date", sub: ": Ascending" },
		value: 3,
		sort_by: "maturity_date",
		order_by: "asc",
	},
	{
		label: { main: "Maturity Date", sub: ": Descending" },
		value: 4,
		sort_by: "maturity_date",
		order_by: "desc",
	},
	{
		label: { main: "Amount", sub: ": Low to High" },
		value: 5,
		sort_by: "amount",
		order_by: "asc",
	},
	{
		label: { main: "Amount", sub: ": High to Low" },
		value: 6,
		sort_by: "amount",
		order_by: "desc",
	},
];

export {
	TRANSACTIONFILTERSTATICS,
	TRADE_SORT_OPTIONS,
	ACTIVE_OPTIONS,
	HEDGE_SORT_OPTIONS,
	LEDGER_SORT_OPTIONS,
	EEFC_SORT_OPTIONS,
	LINKEDLIST_HEDGE_SORT_OPTIONS,
	TRANSACTIONEEFCFILTERSTATICS,
	LOAN_PCFC_SORT_OPTIONS,
	TRANSACTION_OPTIONS,
	TRANSACTIONPCFCFILTERSTATICS,
};
