import axiosObject from "../../config";
import baseValidator from "../baseValidator";

const calculateEdcTools = (payload: any) => {
	return new Promise((resolve, reject) => {
		let uri = "/backend-rates/calculate-edc";

		axiosObject
			.post(uri, payload)
			.then((response) => {
				resolve(response.data);
			})
			.catch((errors) => {
				console.log("Errors", JSON.stringify(errors));
				reject(errors);
			});
	});
};

export { calculateEdcTools };
