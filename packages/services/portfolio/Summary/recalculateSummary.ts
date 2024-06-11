import axiosObject from "../../config";

export interface ResponseObject {
	success: boolean;
	currency_pairs?: unknown;
}

function recalculateSummary(): Promise<ResponseObject> {
	return new Promise((resolve, reject) => {
		let uri = `/backend-fx/api/summary/calculate-quote-currency-summary`;

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

export { recalculateSummary };
