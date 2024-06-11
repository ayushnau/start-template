import axiosObject from "../config";
import baseValidator from "../baseValidator";

const bulkUploadHedges = (payload: any) => {
	return new Promise((resolve, reject) => {
		let uri = "backend-fx/api/hedges/save-bulk-hedges";

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

export { bulkUploadHedges };
