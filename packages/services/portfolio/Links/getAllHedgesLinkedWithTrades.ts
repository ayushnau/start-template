import axiosObject from "../../config";

function getAllHedgesLinkedWithTrades(id: any) {
	return new Promise((resolve, reject) => {
		let uri = `/backend-fx/api/trades/${id}/view-all-links`;
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

export { getAllHedgesLinkedWithTrades };
