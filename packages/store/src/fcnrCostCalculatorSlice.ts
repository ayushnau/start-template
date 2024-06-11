import { createSlice } from "@reduxjs/toolkit";

export const fcnrCostCalculatorSlice = createSlice({
	name: "fcnrCostCalculator",
	initialState: {
		base_currency: "",
		loan_start_date: "",
		loan_due_date: "",
		num_of_days: "",
		spread: "",
		interest_type: "",
		fixing_frequency: "",
		currency_type: "",
		amount_base_currency: "",
		drawdown_rate_base_currency: "",
		amount_inr: "",
		drawdown_rate_inr: "",
		fixed_interest: "",
		repay_rate: "",
		eq_usd_amount: "",
		eq_inr_amount: "",
		due_rate_used: "",
		principal_cost: "",
		interest_cost: "",
		total_cost: "",
		is_hedge_rate:true,
		
	},

	reducers: {
		setfcnrCostCalculatorBaseCurrency: (state, action) => {
			state.base_currency = action.payload;
		},

		clearfcnrCostCalculatorBaseCurrency: (state) => {
			state.base_currency = "";
		},

		clearfcnrCostCalculatorDetails: (state) => {
			state.base_currency = "";
		},
		setfcnrCostCalculatorLoanStartDate: (state, action) => {
			state.loan_start_date = action.payload;
		},
		clearfcnrCostCalculatorLoanStartDate: (state) => {
			state.loan_start_date = "";
		},
		setfcnrCostCalculatorNumOfDays: (state, action) => {
			state.num_of_days = action.payload;
		},
		clearfcnrCostCalculatorNumOfDays: (state) => {
			state.num_of_days = "";
		},
		setfcnrCostCalculatorLoanDueDate: (state, action) => {
			state.loan_due_date = action.payload;
		},
		clearfcnrCostCalculatorLoanDuetDate: (state) => {
			state.loan_due_date = "";
		},
		setfcnrCostCalculatorSpread: (state, action) => {
			state.spread = action.payload;
		},
		clearfcnrCostCalculatorSpread: (state) => {
			state.spread = "";
		},
		setfcnrCostCalculatorFrequency: (state, action) => {
			state.fixing_frequency = action.payload;
		},
		clearfcnrCostCalculatorFrequency: (state) => {
			state.fixing_frequency = "";
		},
		setfcnrCostCalculatorInterestType: (state, action) => {
			state.interest_type = action.payload;
		},
		clearfcnrCostCalculatorInterestType: (state) => {
			state.interest_type = "";
		},
		setfcnrCostCalculatorCurrencyType: (state, action) => {
			state.currency_type = action.payload;
		},
		clearfcnrCostCalculatorCurrencyType: (state) => {
			state.currency_type = "";
		},
		setfcnrCostCalculatorAmountBaseCurrency: (state, action) => {
			state.amount_base_currency = action.payload;
		},
		clearfcnrCostCalculatorAmountBaseCurrency: (state) => {
			state.amount_base_currency = "";
		},
		setfcnrCostCalculatorDrawdownRateBaseCurrency: (state, action) => {
			state.drawdown_rate_base_currency = action.payload;
		},
		clearfcnrCostCalculatorDrawdownRateBaseCurrency: (state) => {
			state.drawdown_rate_base_currency = "";
		},
		setfcnrCostCalculatorAmountInr: (state, action) => {
			state.amount_inr = action.payload;
		},
		clearfcnrCostCalculatorAmountInr: (state) => {
			state.amount_inr = "";
		},
		setfcnrCostCalculatorDrawdownRateInr: (state, action) => {
			state.drawdown_rate_inr = action.payload;
		},
		clearfcnrCostCalculatorDrawdownRateInr: (state) => {
			state.drawdown_rate_inr = "";
		},
		setfcnrCostCalculatorFixedInterest: (state, action) => {
			state.fixed_interest = action.payload;
		},
		clearfcnrCostCalculatorFixedInterest: (state) => {
			state.fixed_interest = "";
		},
		setfcnrCostCalculatorRepaymentRate: (state, action) => {
			state.repay_rate = action.payload;
		},
		clearfcnrCostCalculatorRepaymentRate: (state) => {
			state.repay_rate = "";
		},
		setfcnrCostCalculatorEquUSDamount: (state, action) => {
			state.eq_usd_amount = action.payload;
		},
		clearfcnrCostCalculatorEquUSDamount: (state, action) => {
			state.eq_usd_amount = "";
		},
		setfcnrCostCalculatorEquINRamount: (state, action) => {
			state.eq_inr_amount = action.payload;
		},
		clearfcnrCostCalculatorEquINRamount: (state) => {
			state.eq_inr_amount = "";
		},
		setfcnrCostCalculatorDueRateUsed: (state, action) => {
			state.due_rate_used = action.payload;
		},
		clearfcnrCostCalculatorDueRateUsed: (state) => {
			state.due_rate_used = "";
		},
		setfcnrCostCalculatorPrincipalCost: (state, action) => {
			state.principal_cost = action.payload;
		},
		clearfcnrCostCalculatorPrincipalCost: (state) => {
			state.principal_cost = "";
		},
		setfcnrCostCalculatorInterestCost: (state, action) => {
			state.interest_cost = action.payload;
		},
		clearfcnrCostCalculatorInterestCost: (state) => {
			state.interest_cost = "";
		},
		setfcnrCostCalculatorTotalCost: (state, action) => {
			state.total_cost = action.payload;
		},
		clearfcnrCostCalculatorTotalCost: (state, action) => {
			state.total_cost = "";
		},
		setfcnrCostCalculatorIsHedgeRate:(state,action)=>{
			state.is_hedge_rate=action.payload;
		},
		clearfcnrCostCalculatorIsHedgeRate:(state)=>{
			state.is_hedge_rate = true;
		},
		clearfcnrCostCalculatorAll: (state) => {
			state.base_currency = "";
			state.loan_start_date = "";
			state.loan_due_date = "";
			state.num_of_days = "";
			state.spread = "";
			state.fixing_frequency = "";
			state.interest_type = "";
			state.currency_type = "";
			state.amount_base_currency = "";
			state.drawdown_rate_base_currency = "";
			state.amount_inr = "";
			state.drawdown_rate_inr = "";
			state.fixed_interest = "";
			state.repay_rate = "";
			state.eq_inr_amount = "";
			state.eq_usd_amount = "";
			state.due_rate_used="";
			state.principal_cost="";
			state.interest_cost="";
			state.total_cost="";
			state.is_hedge_rate=true;
		},
	},
});

export const {
	setfcnrCostCalculatorBaseCurrency,
	clearfcnrCostCalculatorBaseCurrency,
	setfcnrCostCalculatorLoanStartDate,
	clearfcnrCostCalculatorLoanStartDate,
	setfcnrCostCalculatorNumOfDays,
	clearfcnrCostCalculatorNumOfDays,
	setfcnrCostCalculatorLoanDueDate,
	clearfcnrCostCalculatorLoanDuetDate,
	clearfcnrCostCalculatorDetails,
	setfcnrCostCalculatorSpread,
	clearfcnrCostCalculatorSpread,
	setfcnrCostCalculatorFrequency,
	clearfcnrCostCalculatorFrequency,
	setfcnrCostCalculatorInterestType,
	clearfcnrCostCalculatorInterestType,
	setfcnrCostCalculatorCurrencyType,
	clearfcnrCostCalculatorCurrencyType,
	setfcnrCostCalculatorAmountBaseCurrency,
	clearfcnrCostCalculatorAmountBaseCurrency,
	setfcnrCostCalculatorDrawdownRateBaseCurrency,
	clearfcnrCostCalculatorDrawdownRateBaseCurrency,
	setfcnrCostCalculatorAmountInr,
	clearfcnrCostCalculatorAmountInr,
	setfcnrCostCalculatorDrawdownRateInr,
	clearfcnrCostCalculatorDrawdownRateInr,
	setfcnrCostCalculatorFixedInterest,
	clearfcnrCostCalculatorFixedInterest,
	setfcnrCostCalculatorRepaymentRate,
	clearfcnrCostCalculatorRepaymentRate,
	setfcnrCostCalculatorEquUSDamount,
	clearfcnrCostCalculatorEquUSDamount,
	setfcnrCostCalculatorEquINRamount,
	clearfcnrCostCalculatorEquINRamount,
	setfcnrCostCalculatorDueRateUsed,
	clearfcnrCostCalculatorDueRateUsed,
	setfcnrCostCalculatorPrincipalCost,
	clearfcnrCostCalculatorPrincipalCost,
	setfcnrCostCalculatorInterestCost,
	clearfcnrCostCalculatorInterestCost,
	setfcnrCostCalculatorTotalCost,
	clearfcnrCostCalculatorTotalCost,
	setfcnrCostCalculatorIsHedgeRate,
	clearfcnrCostCalculatorIsHedgeRate,
	clearfcnrCostCalculatorAll,
} = fcnrCostCalculatorSlice.actions;

export default fcnrCostCalculatorSlice.reducer;
