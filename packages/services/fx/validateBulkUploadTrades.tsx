import axiosObject from "../config";

function validateBulkUploadTrades(payload: any) {
	return new Promise((resolve, reject) => {
		let uri = `backend-fx/api/trades/bulk-verify`;

		payload.trades_list.forEach((trade: any) => {
			trade["ledger_id"] = payload.ledger_id.toString();
		});

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

export { validateBulkUploadTrades };
