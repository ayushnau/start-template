import { createSlice } from "@reduxjs/toolkit";

export const bcCostCalculatorSlice = createSlice({
	name: "bcCostCalculator",
	initialState: {
		base_currency: "",
		loan_start_date: "",
		loan_due_date: "",
		num_of_days: "",
		spread: "",
		interest_type: "",
		fixing_frequency: "",
		loan_amount: "",
		fixed_interest: "",
		is_hedge_rate: true,
		principal_cost: "",
		interest_cost: "",
		total_cost: "",
		borrowing_rate_used: "",
		repayment_rate:"",
		due_rate_used:"",
	},
	reducers: {
		setbcCostCalculatorBaseCurrency: (state, action) => {
			state.base_currency = action.payload;
		},
		clearbcCostCalculatorBaseCurrency: (state) => {
			state.base_currency = "";
		},
		setbcCostCalculatorLoanStartDate: (state, action) => {
			state.loan_start_date = action.payload;
		},
		clearbcCostCalculatorLoanStartDate: (state) => {
			state.loan_start_date = "";
		},
		setbcCostCalculatorLoanAmt: (state, action) => {
			state.loan_amount = action.payload;
		},
		clearbcCostCalculatorLoanAmt: (state) => {
			state.loan_amount = "";
		},
		setbcCostCalculatorNumOfDays: (state, action) => {
			state.num_of_days = action.payload;
		},
		clearbcCostcalculatorNumOfDays: (state) => {
			state.num_of_days = "";
		},
		setbcCostCalculatorLoanDueDate: (state, action) => {
			state.loan_due_date = action.payload;
		},
		clearbcCostCalculatorLoanDueDate: (state) => {
			state.loan_due_date = "";
		},
		setbcCostCalculatorInterestType: (state, action) => {
			state.interest_type = action.payload;
		},
		clearbcCostCalculatorInterestType: (state) => {
			state.interest_type = "";
		},
		setbcCostCalculatorFixedInterest: (state, action) => {
			state.fixed_interest = action.payload;
		},
		clearbcCostCalculatorFixedInterest: (state) => {
			state.fixed_interest = "";
		},
		setbcCostCalculatorFrequency: (state, action) => {
			state.fixing_frequency = action.payload;
		},
		clearbcCostCalculatorFrequency: (state) => {
			state.fixing_frequency = "";
		},
		setbcCostCalculatorSpread: (state, action) => {
			state.spread = action.payload;
		},
		clearbcCostCalculatorSpread: (state) => {
			state.spread = "";
		},
		setbcCostCalculatorBorrowingRate: (state, action) => {
			state.borrowing_rate_used = action.payload;
		},
		clearbcCostCalculatorBorrowingRate: (state) => {
			state.borrowing_rate_used = "";
		},
		setbcCostCalculatorTotalCost: (state, action) => {
			state.total_cost = action.payload;
		},
		clearbcCostCalculatorTotalCost: (state) => {
			state.total_cost = "";
		},
		setbcCostCalculatorPrincipalCost:(state,action)=>{
			state.principal_cost=action.payload;
		},
		clearbcCostCalculatorPrincipalCost: (state) => {
			state.principal_cost = "";
		},
		setbcCostCalculatorInterestCost:(state,action)=>{
			state.interest_cost=action.payload;
		},
		clearbcCostCalculatorInterestCost:(state)=>{
			state.interest_cost="";
		},
		setbcCostCalculatorIsHedgeRate:(state,action)=>{
			state.is_hedge_rate=action.payload;
		},
		clearbcCostCalculatorIsHedgeRate:(state)=>{
			state.is_hedge_rate=true;
		},
		setbcCostCalculatorDueRateUsed:(state,action)=>{
			state.due_rate_used=action.payload;
		},
		clearbcCostCalculatorDueRateUsed:(state)=>{
			state.due_rate_used="";
		},
		setbcCostCalculatorRepaymentRate:(state,action)=>{
			state.repayment_rate=action.payload;
		},
		clearbcCostCalculatorRepaymentRate:(state)=>{
			state.repayment_rate="";
		},
		clearbcCostCalculatorAll: (state) => {
			state.base_currency = "";
			state.loan_start_date = "";
			state.loan_amount = "";
			state.num_of_days = "";
			state.loan_due_date = "";
			state.interest_type = "";
			state.fixed_interest = "";
			state.fixing_frequency = "";
			state.spread = "";
			state.borrowing_rate_used = "";
			state.total_cost="";
			state.principal_cost="";
			state.interest_cost="";
			state.is_hedge_rate=true;
			state.due_rate_used="";
			state.repayment_rate="";
		},
	},
});
export const { 
    setbcCostCalculatorBaseCurrency, 
    clearbcCostCalculatorBaseCurrency,
	setbcCostCalculatorLoanStartDate,
	clearbcCostCalculatorLoanStartDate,
	setbcCostCalculatorLoanAmt,
	clearbcCostCalculatorLoanAmt,
	setbcCostCalculatorNumOfDays,
	clearbcCostcalculatorNumOfDays,
	setbcCostCalculatorLoanDueDate,
	clearbcCostCalculatorLoanDueDate,
	setbcCostCalculatorInterestType,
	clearbcCostCalculatorInterestType,
	setbcCostCalculatorFixedInterest,
	clearbcCostCalculatorFixedInterest,
	setbcCostCalculatorFrequency,
	clearbcCostCalculatorFrequency,
	setbcCostCalculatorSpread,
	clearbcCostCalculatorSpread,
	setbcCostCalculatorBorrowingRate,
	clearbcCostCalculatorBorrowingRate,
	setbcCostCalculatorTotalCost,
	clearbcCostCalculatorTotalCost,
	setbcCostCalculatorPrincipalCost,
	clearbcCostCalculatorPrincipalCost,
	setbcCostCalculatorInterestCost,
	clearbcCostCalculatorInterestCost,
	setbcCostCalculatorIsHedgeRate,
	clearbcCostCalculatorIsHedgeRate,
	setbcCostCalculatorDueRateUsed,
	clearbcCostCalculatorDueRateUsed,
	setbcCostCalculatorRepaymentRate,
	clearbcCostCalculatorRepaymentRate,
	clearbcCostCalculatorAll,
} = bcCostCalculatorSlice.actions;

export default bcCostCalculatorSlice.reducer;
