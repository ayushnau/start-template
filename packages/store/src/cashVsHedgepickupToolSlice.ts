import { createSlice } from "@reduxjs/toolkit";

export const cashVsHedgepickupToolSlice = createSlice({
	name: "cashVsHedgepickupTool",
	initialState: {
		type: "",
		pair: "",
		receivable_amount: "",
		additional_receivable_amount: "",
		hedge_data: {},
		no_months_hedge: false,
		response_data: {},
	},

	reducers: {
		setCashVsHedgepickupFormData: (state, action) => {
			state.type = action.payload.type;
			state.pair = action.payload.pair;
		},
		setCashVsHedgepickupAmountsData: (state, action) => {
			state.receivable_amount = action.payload.receivable_amount;
			state.additional_receivable_amount =
				action.payload.additional_receivable_amount;
		},
		setCashVsHedgepickupHedgeData: (state, action) => {
			state.hedge_data = action.payload;
		},
		setCashVsHedgepickupResponseData: (state, action) => {
			state.response_data = action.payload;
		},
		setCashVsHedgepickupNoMonthValue: (state, action) => {
			state.no_months_hedge = action.payload;
		},

		clearCashVsHedgepickupFormData: (state) => {
			state.type = "";
			state.pair = "";
		},
		clearCashVsHedgepickupAmountsData: (state) => {
			state.receivable_amount = "";
			state.additional_receivable_amount = "";
		},
		clearCashVsHedgepickupHedgeData: (state) => {
			state.hedge_data = {};
		},
		clearCashVsHedgepickupResponseData: (state) => {
			state.response_data = {};
		},
		clearCashVsHedgepickupNoMonthValue: (state) => {
			state.no_months_hedge = false;
		},
		clearAllCashVsHedgepickupFormData: (state) => {
			state.type = "";
			state.pair = "";
			state.receivable_amount = "";
			state.additional_receivable_amount = "";
			state.hedge_data = {};
			state.response_data = {};
			state.no_months_hedge = false;
		},
	},
});

export const {
	setCashVsHedgepickupFormData,
	setCashVsHedgepickupHedgeData,
	setCashVsHedgepickupAmountsData,
	setCashVsHedgepickupResponseData,
	setCashVsHedgepickupNoMonthValue,
	clearCashVsHedgepickupFormData,
	clearCashVsHedgepickupAmountsData,
	clearCashVsHedgepickupHedgeData,
	clearCashVsHedgepickupResponseData,
	clearCashVsHedgepickupNoMonthValue,
	clearAllCashVsHedgepickupFormData,
} = cashVsHedgepickupToolSlice.actions;

export default cashVsHedgepickupToolSlice.reducer;
