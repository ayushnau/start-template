import axiosObject from "../../config";

function getAllPCFCs({ currency_pairs, sort_by, order_by, group_by }: any) {
	return new Promise((resolve, reject) => {
		let uri = `/backend-rates/pcfc`;
		// let uri = `http://127.0.0.1:8000/api/pcfc`;

		const payload = {
			currency_pair: currency_pairs,
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

export { getAllPCFCs };
