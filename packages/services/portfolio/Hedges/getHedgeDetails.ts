import axiosObject from "../../config";

function getHedgeDetails(id: any) {
	return new Promise((resolve, reject) => {
		let uri = `/backend-fx/api/hedges/${id}`;

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

export { getHedgeDetails };
