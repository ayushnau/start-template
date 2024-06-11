import { createSlice } from "@reduxjs/toolkit";

export const registerSlice = createSlice({
	name: "register",
	initialState: {
		form: {
			mode: "mobile",
			username: "",
			mobile_isd_code: "+91",
			mobile_number: "",
			user_type: "",
			password: "",
		},
	},

	reducers: {
		setRegistrationForm: (state, action) => {
			state.form = { ...state.form, ...action.payload };
		},
		clearRegistrationForm: (state) => {
			state.form = {
				mode: "mobile",
				username: "",
				mobile_isd_code: "+91",
				mobile_number: "",
				user_type: "",
				password: "",
			};
		},
	},
});

export const { setRegistrationForm, clearRegistrationForm } =
	registerSlice.actions;

export default registerSlice.reducer;
