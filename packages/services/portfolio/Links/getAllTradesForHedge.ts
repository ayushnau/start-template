import axiosObject from "../../config";

function getAllTradesForHedge({ hedge_uuid }: any) {
	return new Promise((resolve, reject) => {
		let uri = `/backend-fx/api/hedges/${hedge_uuid}/view-all-links`;

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

export { getAllTradesForHedge };
