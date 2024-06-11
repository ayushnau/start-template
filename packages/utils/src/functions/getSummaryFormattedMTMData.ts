const getSummaryFormattedMTMData = (mtmArray: any[]) => {
	return mtmArray.map((ele) => {
		return { currency: ele.currency, mtm: ele.mtm, mtm_inr: ele.mtm_inr };
	});
};

export { getSummaryFormattedMTMData };
