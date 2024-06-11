import axiosObject from "../config";

function user_details() {
	return new Promise((resolve, reject) => {
		let uri = "/backend-auth/user";

		axiosObject
			.get(uri, { withCredentials: true })
			.then((response) => {
				resolve(response.data);
			})
			.catch((errors) => {
				console.log("Errors", errors);
				reject(errors.response.data.errors);
			});
	});
}

export { user_details };
