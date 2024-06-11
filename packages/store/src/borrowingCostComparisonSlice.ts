import { createSlice } from "@reduxjs/toolkit";

export const borrowindCostComparisonSlice = createSlice({
	name: "login",
	initialState: {
		trade_type: "",
		base_currency: "",
		quote_currency: "INR",
		tenor: "",
		repayment: "",
		fixing: "",
		moratorium: "",
		spread: "",
		subvention: "",
		interest_rate: "",
	},

	reducers: {
		setBorrowingCostComparisonTradeType: (state, action) => {
			state.trade_type = action.payload;
		},
		setBorrowingCostComparisonBaseCurrency: (state, action) => {
			state.base_currency = action.payload;
		},
		setBorrowingCostComparisonTenor: (state, action) => {
			state.tenor = action.payload;
		},
		setBorrowingCostComparisonMoratorium: (state, action) => {
			state.moratorium = action.payload;
		},
		setBorrowingCostComparisonRepayment: (state, action) => {
			state.repayment = action.payload;
		},
		setBorrowingCostComparisonFixing: (state, action) => {
			state.fixing = action.payload;
		},
		setBorrowingCostComparisonSpread: (state, action) => {
			state.spread = action.payload;
		},
		setBorrowingCostComparisonSubvention: (state, action) => {
			state.subvention = action.payload;
		},
		setBorrowingCostComparisonInterestRate: (state, action) => {
			state.interest_rate = action.payload;
		},

		clearBorrowingCostComparisonTradeType: (state) => {
			state.trade_type = "";
		},
		clearBorrowingCostComparisonBaseCurrency: (state) => {
			state.base_currency = "";
		},
		clearBorrowingCostComparisonTenor: (state) => {
			state.tenor = "";
		},
		clearBorrowingCostComparisonMoratorium: (state) => {
			state.moratorium = "";
		},
		clearBorrowingCostComparisonRepayment: (state) => {
			state.repayment = "";
		},
		clearBorrowingCostComparisonFixing: (state) => {
			state.fixing = "";
		},
		clearBorrowingCostComparisonSpread: (state) => {
			state.spread = "";
		},
		clearBorrowingCostComparisonSubvention: (state) => {
			state.subvention = "";
		},
		clearBorrowingCostComparisonInterestRate: (state) => {
			state.interest_rate = "";
		},

		clearBorrowingCostComparisonDetails: (state) => {
			state.tenor = "";
			state.fixing = "";
			state.spread = "";
			state.subvention = "";
			state.moratorium = "";
			state.repayment = "";
			state.interest_rate = "";
			state.base_currency = "";
		},

		clearBorrowingCostComparisonAll: (state) => {
			state.trade_type = "";
			state.base_currency = "";
			state.quote_currency = "INR";
			state.tenor = "";
			state.repayment = "";
			state.fixing = "";
			state.moratorium = "";
			state.spread = "";
			state.subvention = "";
			state.interest_rate = "";
		},
	},
});

export const {
	setBorrowingCostComparisonTradeType,
	setBorrowingCostComparisonBaseCurrency,
	setBorrowingCostComparisonTenor,
	setBorrowingCostComparisonMoratorium,
	setBorrowingCostComparisonRepayment,
	setBorrowingCostComparisonFixing,
	setBorrowingCostComparisonSpread,
	setBorrowingCostComparisonSubvention,
	setBorrowingCostComparisonInterestRate,
	clearBorrowingCostComparisonTradeType,
	clearBorrowingCostComparisonBaseCurrency,
	clearBorrowingCostComparisonTenor,
	clearBorrowingCostComparisonMoratorium,
	clearBorrowingCostComparisonRepayment,
	clearBorrowingCostComparisonFixing,
	clearBorrowingCostComparisonSpread,
	clearBorrowingCostComparisonSubvention,
	clearBorrowingCostComparisonInterestRate,
	clearBorrowingCostComparisonDetails,
	clearBorrowingCostComparisonAll,
} = borrowindCostComparisonSlice.actions;

export default borrowindCostComparisonSlice.reducer;
