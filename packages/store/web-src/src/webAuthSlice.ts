import { createSlice } from "@reduxjs/toolkit";

export const webAuthSlice = createSlice({
	name: "webAuth",
	initialState: {
		web_auth_form: {
			mode: "mobile",
			mobile_isd_code: "+91",
			mobile_number: "",
			username: "",
			password: "",
			user_type: "none",
		},
	},

	reducers: {
		setWebAuthForm: (state, action) => {
			state.web_auth_form = { ...state.web_auth_form, ...action.payload };
		},
		clearWebAuthForm: (state) => {
			state.web_auth_form = {
				mode: "mobile",
				mobile_isd_code: "+91",
				mobile_number: "",
				username: "",
				password: "",
				user_type: "none",
			};
		},
	},
});

export const { setWebAuthForm, clearWebAuthForm } = webAuthSlice.actions;

export default webAuthSlice.reducer;
