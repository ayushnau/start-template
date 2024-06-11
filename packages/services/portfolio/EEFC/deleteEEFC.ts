import axiosObject from "../../config";

function deleteEEFC(id: any) {
	return new Promise((resolve, reject) => {
		let uri = `/backend-fx/api/eefcs/${id}`;
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

export { deleteEEFC };
