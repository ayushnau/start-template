import axiosObject from "../../config";

function deleteHedge(id: any) {
	return new Promise((resolve, reject) => {
		let uri = `/backend-fx/api/hedges/${id}`;
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

export { deleteHedge };
