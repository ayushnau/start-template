import axiosObject from "../config";

function bulkDeleteHedges(uuids: any) {
	return new Promise((resolve, reject) => {
		const payload = {
			uuidList: uuids,
		};
		let uri = `/backend-fx/api/hedges/delete-bulk-hedges`;
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

function bulkDeleteTrades(uuids: string[]) {
	return new Promise((resolve, reject) => {
		const payload = {
			uuidList: uuids,
		};
		let uri = `/backend-fx/api/trades/delete-bulk-trades`;
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

function bulkDeleteEEFCs(uuids: string[]) {
	return new Promise((resolve, reject) => {
		const payload = {
			uuidList: uuids,
		};
		let uri = `/backend-fx/api/eefcs/delete-bulk-eefcs`;
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

export { bulkDeleteHedges, bulkDeleteTrades, bulkDeleteEEFCs };
