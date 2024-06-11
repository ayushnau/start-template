import { createSlice } from "@reduxjs/toolkit";

export const webUserProfileSlice = createSlice({
	name: "webUser",
	initialState: {
		form: {
			userid: "",
			username: "",
			access_token: "",
			userType: "",
		},
	},

	reducers: {
		setWebUserProfile: (state, action) => {
			state.form = { ...state.form, ...action.payload };
		},
		clearWebUserProfile: (state) => {
			state.form = {
				userid: "",
				username: "",
				access_token: "",
				userType: "",
			};
		},
	},
});

export const { setWebUserProfile, clearWebUserProfile } =
	webUserProfileSlice.actions;

export default webUserProfileSlice.reducer;
