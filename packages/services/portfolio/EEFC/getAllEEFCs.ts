import axiosObject from "../../config";

function getAllEEFCs({
	currency_pair,
	eefc_type,
	status,
	sort_by,
	order_by,
	group_by,
}: any) {
	return new Promise((resolve, reject) => {
		let uri = `/backend-fx/api/eefcs`;
		// let uri = `http://127.0.0.1:8000/api/eefcs`;

		const payload = {
			currency_pair: currency_pair,
			eefc_type: eefc_type,
			status: status,
			sort_by: sort_by,
			order_by: order_by,
			group_by: group_by,
		};

		console.log({
			...payload,
		});
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

export { getAllEEFCs };
