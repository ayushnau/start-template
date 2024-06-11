import axiosObject from "../config";

function deleteAlert(alert_id: any) {
	return new Promise((resolve, reject) => {
		let uri = `/backend-fx/api/alerts/${alert_id}`;

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

export { deleteAlert };
