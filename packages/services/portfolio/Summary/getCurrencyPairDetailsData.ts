import axiosObject from "../../config";
import { VolumeDataInterface } from "interfaces";

interface SummaryCurrencyPairDetailsResponseInterface {
	success: boolean;
	currency_pair?: string;
	data?: VolumeDataInterface[];
}

function getCurrencyPairDetailsData(
	currency_pair: string,
): Promise<SummaryCurrencyPairDetailsResponseInterface> {
	return new Promise((resolve, reject) => {
		const formatted_currency_pair = currency_pair.split("/").join("-");
		let uri = `/backend-fx/api/summary/currency-pair/${formatted_currency_pair}`;

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

export { getCurrencyPairDetailsData };
