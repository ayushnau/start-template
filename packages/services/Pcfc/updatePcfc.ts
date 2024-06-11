import axiosObject from "../config";

const updatePcfc = (payload: any) => {
	return new Promise((resolve, reject) => {
		let uri = `/backend-rates/pcfc/${payload.uuid}`;
		delete payload.uuid;
		axiosObject
			.put(uri, payload)
			.then((response) => {
				resolve(response.data);
			})
			.catch((errors) => {
				reject(errors);
			});
	});
};

export { updatePcfc };
