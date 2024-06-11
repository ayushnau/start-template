import axiosObject from "../../config";

function getEEFCDetails(id: any) {
	return new Promise((resolve, reject) => {
		let uri = `/backend-fx/api/eefcs/${id}`;
		// let uri = `http://127.0.0.1:8000/api/eefcs/${id}`;

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

export { getEEFCDetails };
