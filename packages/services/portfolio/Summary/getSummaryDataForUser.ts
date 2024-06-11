import axiosObject from "../../config";
import { MTMDataInteraface, VolumeDataInterface } from "interfaces";

interface SummaryResponseInterface {
	success: boolean;
	currency_data?: MTMDataInteraface[];
	currency_pairs?: VolumeDataInterface[];
	hedges_count?: number;
	trades_count?: number;
}

function getSummaryDataForUser(): Promise<SummaryResponseInterface> {
	return new Promise((resolve, reject) => {
		let uri = `/backend-fx/api/summary`;

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

export { getSummaryDataForUser };
