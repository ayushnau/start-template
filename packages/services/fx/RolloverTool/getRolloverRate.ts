import axiosObject from "../../config";

function getRolloverRate(payload: any) {
	try {
		return new Promise((resolve, reject) => {
			let uri = `/backend-rates/calculate-rollover-charges`;
			axiosObject
				.post(uri, payload)
				.then((response) => {
					resolve(response.data);
				})
				.catch((errors) => {
					reject(errors);
				});
		});
	} catch (error) {
		console.log(
			"Error while fetching rates for Borrowing Cost Comparison Module",
		);
	}
}

export { getRolloverRate };
