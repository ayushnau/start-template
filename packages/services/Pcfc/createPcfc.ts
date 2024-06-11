import axiosObject from "../config";

const createPcfc = (payload: any) => {
	return new Promise((resolve, reject) => {
		let uri = "/backend-rates/pcfc";

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

export { createPcfc };
