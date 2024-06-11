import axiosObject from "../../config";

function useHedge(payload: any) {
	const pay = new Array(1);
	pay[0] = payload;
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

export { useHedge };
