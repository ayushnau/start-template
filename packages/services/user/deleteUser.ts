import axiosObject from "../config";

export function deleteUser() {
	return new Promise((resolve, reject) => {
		let uri = "/backend-auth/user";

		axiosObject
			.delete(uri)
			.then((response: any) => {
				return resolve(response);
			})
			.catch((errors: any) => {
				console.log("Errors", JSON.stringify(errors));
				if (errors.response.status === 422) {
					reject(errors.response.data.errors);
				}
				if (errors.response.status === 401) {
					reject({
						password: "Cant Delete Account",
					});
				}
				reject(errors);
			});
	});
}
