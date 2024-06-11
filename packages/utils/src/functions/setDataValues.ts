import { ExportImportDataInterface, VolumeDataInterface } from "interfaces";

const setDataValues = (
	data: ExportImportDataInterface,
	data_set: VolumeDataInterface,
	from?: string,
) => {
	let weighted_average_rate = "-";
	if (from === "ledgers" || from === "hedges") {
		if (+data.unhedged_amount + +data.hedged_amount > 0) {
			weighted_average_rate = (
				(+data.unhedged_amount * +data.weighted_unhedged_average_rate +
					+data.hedged_amount * +data.weighted_hedged_average_rate) /
				(+data.unhedged_amount + +data.hedged_amount)
			).toFixed(2);
		}
	}

	return {
		summaryCardValues: {
			totalAmount: data.total_volume.toString(),
			currency: data_set.quote_currency,
			mtm: data.total_mtm.toString(),
			weighted_average_rate: weighted_average_rate,
		},
		volumeData: {
			hedgedAmount: data.hedged_amount.toString(),
			unhedgedAmount: data.unhedged_amount.toString(),
			currency: data_set.base_currency,
		},
		averageData: {
			weightedHedgedAverageRates: data.weighted_hedged_average_rate.toString(),
			weightedUnHedgedAverageRates:
				data.weighted_unhedged_average_rate.toString(),
			weightedTotalAverageRates: data.weighted_total_average_rate?.toString(),
			currency: data_set.quote_currency,
		},
		gainriskData: {
			hedgedMTM: data.hedged_mtm.toString(),
			unhedgedMTM: data.unhedged_mtm.toString(),
			currency: data_set.quote_currency,
		},
	};
};

export { setDataValues };
