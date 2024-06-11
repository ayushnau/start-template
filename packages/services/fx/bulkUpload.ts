import axiosObject from "../config";
import baseValidator from "../baseValidator";

const bulkUpload = (payload: any) => {
	return new Promise((resolve, reject) => {
		let uri = "backend-fx/api/trades/save-bulk-trades";

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

export { bulkUpload };
