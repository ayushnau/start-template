import axiosObject from "../../config";

function getAllOpenTrade({
	ledger_id,
	trade_type,
	currency_pairs,
	sort_by,
	order_by,
	group_by,
	status,
	risk_or_gain,
}: any) {
	return new Promise((resolve, reject) => {
		let uri = `/backend-fx/api/trades`;

		let payload = {
			ledger_id: ledger_id,
			trade_type: trade_type,
			currency_pair: currency_pairs,
			sort_by: sort_by,
			order_by: order_by,
			status: status,
			group_by: group_by,
			risk_or_gain: risk_or_gain,
		};

		axiosObject
			.get(uri, { params: payload })
			.then((response) => {
				resolve(response.data);
			})
			.catch((errors) => {
				reject(errors);
			});
	});
}

export { getAllOpenTrade };
