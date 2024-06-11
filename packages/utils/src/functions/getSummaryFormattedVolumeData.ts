const getSummaryFormattedVolumeData = (volumeArray: any[]) => {
	return volumeArray.map((ele) => {
		return {
			currencyPair: ele.currency_pair,
			export: ele.export_data.total_volume,
			import: ele.import_data.total_volume,
		};
	});
};

export { getSummaryFormattedVolumeData };
