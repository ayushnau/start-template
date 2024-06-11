import axiosObject from "../../config";

function createTransactions(payload: any) {
	const payloadFinal = [structuredClone(payload)];
	delete payloadFinal[0]["display_date"];
	return new Promise((resolve, reject) => {
		var jsValidationErrors = true;
		if (jsValidationErrors === true) {
			let uri = `backend-fx/api/transactions`;

			axiosObject
				.post(uri, payloadFinal)
				.then((response) => {
					resolve(response.data);
				})
				.catch((errors) => {
					reject(errors);
				});
		} else {
			reject(jsValidationErrors);
		}
	});
}

export { createTransactions };
