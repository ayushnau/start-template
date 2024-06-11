import { createSlice } from "@reduxjs/toolkit";

export const pcfcFormSlice = createSlice({
	name: "pcfcFormSlice",
	initialState: {
		pcfc_amount: "",
		currency_pair: "",
		quote_currency: "",
		base_currency: "",
		maturity_date: "",
		loan_start_date: "",
		fixed_rates: "",
		fixing_frequency: "",
		spread: "",
		bank_name: "",
		loan_number: "",
		order_number: "",
		drawdown_rate: "",
	},

	reducers: {
		setPcfcAmount: (state, action) => {
			state.pcfc_amount = action.payload;
		},
		setCurrencyPair: (state, action) => {
			state.currency_pair = action.payload;
		},
		setQuoteCurrency: (state, action) => {
			state.quote_currency = action.payload;
		},
		setBaseCurrency: (state, action) => {
			state.base_currency = action.payload;
		},
		setMaturityDate: (state, action) => {
			state.maturity_date = action.payload;
		},
		setLoanStartDate: (state, action) => {
			state.loan_start_date = action.payload;
		},
		setFixedRates: (state, action) => {
			state.fixed_rates = action.payload;
		},
		setFixingFrequency: (state, action) => {
			state.fixing_frequency = action.payload;
		},
		setSpread: (state, action) => {
			state.spread = action.payload;
		},
		setBankName: (state, action) => {
			state.bank_name = action.payload;
		},
		setLoanNumber: (state, action) => {
			state.loan_number = action.payload;
		},
		setOrderNumber: (state, action) => {
			state.order_number = action.payload;
		},
		setDrawdownRate: (state, action) => {
			state.drawdown_rate = action.payload;
		},

		setPcfcFormWithPayload: (state, action) => {
			return { ...state, ...action.payload };
		},
		clearPcfcAmount: (state) => {
			state.pcfc_amount = "";
		},
		clearCurrencyPair: (state) => {
			state.currency_pair = "";
		},
		clearQuoteCurrency: (state) => {
			state.quote_currency = "";
		},
		clearBaseCurrency: (state) => {
			state.base_currency = "";
		},
		clearMaturityDate: (state) => {
			state.maturity_date = "";
		},
		clearLoanStartDate: (state) => {
			state.loan_start_date = "";
		},
		clearFixedRates: (state) => {
			state.fixed_rates = "";
		},
		clearFixingFrequency: (state) => {
			state.fixing_frequency = "";
		},
		clearSpread: (state) => {
			state.spread = "";
		},
		clearBankName: (state) => {
			state.bank_name = "";
		},
		clearLoanNumber: (state) => {
			state.loan_number = "";
		},
		clearOrderNumber: (state) => {
			state.order_number = "";
		},
		clearDrawdownRate: (state) => {
			state.drawdown_rate = "";
		},
		clearPcfcForm: (state) => {
			return {
				pcfc_amount: "",
				currency_pair: "",
				quote_currency: "",
				base_currency: "",
				maturity_date: "",
				loan_start_date: "",
				fixed_rates: "",
				fixing_frequency: "",
				spread: "",
				bank_name: "",
				loan_number: "",
				order_number: "",
				drawdown_rate: "",
			};
		},
	},
});

export const {
	setPcfcAmount,
	setCurrencyPair,
	setQuoteCurrency,
	setBaseCurrency,
	setMaturityDate,
	setLoanStartDate,
	setFixedRates,
	setFixingFrequency,
	setSpread,
	setBankName,
	setLoanNumber,
	setOrderNumber,
	setDrawdownRate,
	clearPcfcAmount,
	clearCurrencyPair,
	clearQuoteCurrency,
	clearBaseCurrency,
	clearMaturityDate,
	clearLoanStartDate,
	clearFixedRates,
	clearFixingFrequency,
	clearSpread,
	clearBankName,
	clearLoanNumber,
	clearOrderNumber,
	clearDrawdownRate,
	setPcfcFormWithPayload,
	clearPcfcForm,
} = pcfcFormSlice.actions;

export default pcfcFormSlice.reducer;
