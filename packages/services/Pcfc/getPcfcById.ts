import axiosObject from "../config";

const getPcfcById = (pcfcId: any) => {
	return new Promise((resolve, reject) => {
		let uri = `/backend-rates/pcfc/${pcfcId}`;

		axiosObject
			.get(uri)
			.then((response) => {
				resolve(response.data);
			})
			.catch((errors) => {
				reject(errors);
			});
	});
};

export { getPcfcById };
