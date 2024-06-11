import axiosObject from "../config";

function validateBulkUploadHedges(payload: any) {
	return new Promise((resolve, reject) => {
		let uri = `backend-fx/api/hedges/bulk-verify`;

		axiosObject
			.post(uri, payload)
			.then((response) => {
				resolve(response.data);
			})
			.catch((errors) => {
				reject(errors);
			});
	});
}

export { validateBulkUploadHedges };
