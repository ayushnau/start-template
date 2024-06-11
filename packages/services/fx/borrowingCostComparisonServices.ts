import axiosObject from "../config";

function getBorrowingRates(payload: any) {
	try {
		return new Promise((resolve, reject) => {
			let uri = `/backend-rates/borrowing-cost-comparison-rates/get-rates`;
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

export { getBorrowingRates };
