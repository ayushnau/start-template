import axiosObject from "../config";

function getPortfolioCount() {
	return new Promise((resolve, reject) => {
		let uri = `backend-fx/api/portfolio/count`;

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

export { getPortfolioCount };
