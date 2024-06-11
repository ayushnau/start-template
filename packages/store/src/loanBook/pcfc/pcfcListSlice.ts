import { createSlice } from "@reduxjs/toolkit";

export const pcfcListSlice = createSlice({
	name: "pcfcListSlice",
	initialState: {
		pcfcList: {},
		currentSelectedPcfcRecord: {},
		refresh: new Date(),
	},

	reducers: {
		setPcfcList: (state: any, action) => {
			state.pcfcList = action.payload;
		},
		currentSelectedPcfcRecord: (state: any, action) => {
			state.currentSelectedPcfcRecord = action.payload;
		},

		updatePcfcSpecificRecord: (state: any, action: any) => {
			const data = action.payload;
			state.pcfcList[data.uuid] = data;
		},

		clearAllPcfcList: (state: any) => {
			state.pcfcList = {};
		},
		refreshPcfc: (state: any) => {
			state.refresh = new Date();
		},
	},
});

export const {
	setPcfcList,
	clearAllPcfcList,
	updatePcfcSpecificRecord,
	refreshPcfc,
	currentSelectedPcfcRecord,
} = pcfcListSlice.actions;

export default pcfcListSlice.reducer;
