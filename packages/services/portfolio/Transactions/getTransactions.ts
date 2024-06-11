import axiosObject from "../../config";

function getTransactions({ tradeId, hedgeId, eefcId, pcfcId }: any) {
	return new Promise((resolve, reject) => {
		let uri = `/backend-fx/api/transactions`;
		// let uri = `http://127.0.0.1:8000/api/transactions`;

		let params = {};

		if (eefcId) {
			params = {
				eefc_id: eefcId,
			};
		} else if (pcfcId) {
			params = {
				pcfc_id: pcfcId,
			};
		} else {
			params = {
				trade_id: tradeId,
				hedge_id: hedgeId,
			};
		}

		axiosObject
			.get(uri, { params: params })
			.then((response) => {
				resolve(response.data);
			})
			.catch((errors) => {
				reject(errors);
			});
	});
}

export { getTransactions };
