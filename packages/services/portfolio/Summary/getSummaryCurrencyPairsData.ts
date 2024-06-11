import axiosObject from "../../config";
import { VolumeDataInterface } from "interfaces";

interface SummaryCurrencyPairResponseInterface {
	success: boolean;
	currency?: string;
	currency_pairs?: VolumeDataInterface[];
}

function getSummaryCurrencyPairsData(
	currency: string,
): Promise<SummaryCurrencyPairResponseInterface> {
	return new Promise((resolve, reject) => {
		let uri = `/backend-fx/api/summary/currency/${currency}`;

		axiosObject
			.get(uri)
			.then((response) => {
				resolve(response.data);
			})
			.catch((errors) => {
				reject(errors);
			});
	});
}

export { getSummaryCurrencyPairsData };
