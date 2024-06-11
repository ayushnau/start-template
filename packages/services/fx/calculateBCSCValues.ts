import axiosObject from "../config";

const calculateBCSCValues = (payload: any) => {
	return new Promise((resolve, reject) => {
		let uri = "backend-rates/calculate-bc-sc-values";

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
export { calculateBCSCValues };
