import { createSlice } from "@reduxjs/toolkit";

export const loginSlice = createSlice({
	name: "login",
	initialState: {
		form: {
			mode: "mobile",
			mobile_isd_code: "+91",
			mobile_number: "",
			password: "",
		},
	},

	reducers: {
		setLoginForm: (state, action) => {
			state.form = { ...state.form, ...action.payload };
		},
		clearLoginForm: (state) => {
			state.form = {
				mode: "mobile",
				mobile_isd_code: "+91",
				mobile_number: "",
				password: "",
			};
		},
	},
});

export const { setLoginForm, clearLoginForm } = loginSlice.actions;

export default loginSlice.reducer;
