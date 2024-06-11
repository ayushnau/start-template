import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
	name: "login",
	initialState: {
		form: {
			userid: "",
			username: "",
			access_token: "",
			userType: "",
		},
		userDetails: {},
		subscriptionStatus: "",
		subscriptionData: {},
	},

	reducers: {
		setUserForm: (state, action) => {
			state.form = { ...state.form, ...action.payload };
		},
		setUserSubscriptionStatus: (state, action) => {
			state.subscriptionStatus = action.payload;
		},
		setUserSubscriptionData: (state, action) => {
			state.subscriptionData = action.payload;
		},
		setUserDetails: (state, action) => {
			state.userDetails = action.payload;
		},

		clearUserForm: (state) => {
			state.form = {
				userid: "",
				username: "",
				access_token: "",
				userType: "",
			};
		},
		clearUserDetails: (state) => {
			state.userDetails = {};
		},
		clearUserSubscriptionStatus: (state) => {
			state.subscriptionStatus = "";
		},
		clearUserSubscriptionData: (state) => {
			state.subscriptionData = {};
		},
		clearAllUserData: (state) => {
			state.form = {
				userid: "",
				username: "",
				access_token: "",
				userType: "",
			};
			state.userDetails = {};
			state.subscriptionStatus = "";
			state.subscriptionData = {};
		},
	},
});

export const {
	setUserForm,
	setUserDetails,
	setUserSubscriptionData,
	setUserSubscriptionStatus,
	clearUserForm,
	clearAllUserData,
	clearUserDetails,
	clearUserSubscriptionStatus,
	clearUserSubscriptionData,
} = userSlice.actions;

export default userSlice.reducer;
