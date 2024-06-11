import axiosObject from "../../config";

const createCashPayment = (payload: any) => {
	return new Promise((resolve, reject) => {
		let uri = "backend-fx/api/transactions";
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
export { createCashPayment };
