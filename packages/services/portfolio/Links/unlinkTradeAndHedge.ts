import axiosObject from "../../config";

function unlinkTradeAndHedge(id: any, hedge_id: any) {
	return new Promise((resolve, reject) => {
		let uri = `/backend-fx/api/trades/${id}/unlink-hedge`;
		const payload = {
			hedge_uuid: hedge_id,
		};
		axiosObject
			.delete(uri, { data: payload })
			.then((response) => {
				resolve(response.data);
			})
			.catch((errors) => {
				reject(errors);
			});
	});
}

export { unlinkTradeAndHedge };
