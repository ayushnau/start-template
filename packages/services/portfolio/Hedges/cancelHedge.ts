import axiosObject from "../../config";

function cancelHedge(payload: any) {
	const pay = [payload];
	return new Promise((resolve, reject) => {
		let uri = `/backend-fx/api/transactions`;

		axiosObject
			.post(uri, pay)
			.then((response) => {
				resolve(response.data);
			})
			.catch((errors) => {
				reject(errors);
			});
	});
}

export { cancelHedge };
