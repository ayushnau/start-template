import axiosObject from "../../config";

function getTradeDetails(id: any) {
	return new Promise((resolve, reject) => {
		let uri = `/backend-fx/api/trades/${id}`;
		axiosObject
			.get(uri)
			.then((response) => {
				resolve(response.data);
			})
			.catch((errors) => {
				reject(errors);
			});
	});
}

export { getTradeDetails };
