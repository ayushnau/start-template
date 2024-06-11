import axiosObject from "../config";

function bulkDeletePcfcs(uuids: string[]) {
	return new Promise((resolve, reject) => {
		const payload = {
			uuidList: uuids,
		};
		let uri = `/backend-fx/api/trades/delete-bulk-pcfcs`;
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

export { bulkDeletePcfcs };
