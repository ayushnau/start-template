import axiosObject from "../../config";

interface TradeRecalculationServiceInterface {
	trade_id?: string;
}

function recalculateTrade({ trade_id }: TradeRecalculationServiceInterface) {
	return new Promise((resolve, reject) => {
		let uri = "";
		if (trade_id) {
			uri = `/backend-fx/api/trades/${trade_id}/recalc`;
		} else {
			uri = `/backend-fx/api/trades/1/recalculateAll`;
		}
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

export { recalculateTrade };
