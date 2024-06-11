import axiosObject from "../config";

const getAllPcfc = (payload: any) => {
	let queryParams: any = [];
	if (Object.keys(payload).length !== 0) {
		Object.keys(payload).map((value) =>
			queryParams.push(`${value}=${payload[value]}`),
		);
	}
	return new Promise((resolve, reject) => {
		let uri = `/backend-rates/pcfc`;
		if (queryParams.length !== 0) uri = uri + "?" + queryParams.join("&");

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

export { getAllPcfc };
