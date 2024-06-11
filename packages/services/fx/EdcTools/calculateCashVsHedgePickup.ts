import axiosObject from "../../config";

const calculateCashVsHedgePickup = (payload: any) => {
	return new Promise((resolve, reject) => {
		let uri = "/backend-rates/calculate-cash-vs-hedge-pickup";

		axiosObject
			.post(uri, payload)
			.then((response) => {
				resolve(response.data);
			})
			.catch((errors) => {
				reject(errors);
			});
	});
};

export { calculateCashVsHedgePickup };
