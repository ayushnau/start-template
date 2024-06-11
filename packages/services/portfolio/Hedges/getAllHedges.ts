import axiosObject from "../../config";

function getAllHedges({
	currency_pairs,
	hedge_type,
	status,
	sort_by,
	risk_or_gain,
	order_by,
	group_by,
}: any) {
	return new Promise((resolve, reject) => {
		let uri = `/backend-fx/api/hedges`;

		const payload = {
			currency_pair: currency_pairs,
			eefc_type: hedge_type,
			risk_or_gain: risk_or_gain,
			status: status,
			sort_by: sort_by,
			order_by: order_by,
			group_by: group_by,
		};

		axiosObject
			.get(uri, {
				params: {
					...payload,
				},
			})
			.then((response) => {
				resolve(response.data);
			})
			.catch((errors) => {
				reject(errors);
			});
	});
}

export { getAllHedges };
