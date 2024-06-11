import axiosObject from "../config";
import baseValidator from "../baseValidator";

const checkIsDateHoliday = (payload: any) => {
	return new Promise((resolve, reject) => {
		let uri = "backend-rates/holiday-check";

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

export { checkIsDateHoliday };
