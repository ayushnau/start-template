import axiosObject from "../config";

const createRepayLoan = (payload: any) => {
	return new Promise((resolve, reject) => {
		let uri = "/backend-rates/pcfc/repay";
		axiosObject
			.post(uri, payload)
			.then((response) => {
				resolve(response.data);
			})
			.catch((errors) => {
				reject(errors);
			});
	});
};

export { createRepayLoan };
