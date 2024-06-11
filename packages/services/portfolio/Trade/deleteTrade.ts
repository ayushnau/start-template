import axiosObject from "../../config";

function deleteTrade(id: any) {
	return new Promise((resolve, reject) => {
		let uri = `/backend-fx/api/trades/${id}`;
		axiosObject
			.delete(uri)
			.then((response) => {
				resolve(response.data);
			})
			.catch((errors) => {
				reject(errors);
			});
	});
}

export { deleteTrade };
