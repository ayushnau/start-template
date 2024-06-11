import axiosObject from "../config";

const calculateFcnrValues = (payload: any) => {
	return new Promise((resolve, reject) => {
		let uri = "backend-rates/calculate-fcnr-fcdl-values";

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
export { calculateFcnrValues };
