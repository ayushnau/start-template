import axiosObject from "../config";

const deletePcfc = (pcfcUuids: any) => {
	return new Promise((resolve, reject) => {
		let uri = `/backend-rates/pcfc/delete`;
		const payload: any = { uuidList: pcfcUuids };

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

export { deletePcfc };
