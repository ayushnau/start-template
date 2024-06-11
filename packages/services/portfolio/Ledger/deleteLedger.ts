import axiosObject from "../../config";

function deleteLedger(id: any) {
	return new Promise((resolve, reject) => {
		let uri = `/backend-fx/api/work-books/${id}`;

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

export { deleteLedger };
