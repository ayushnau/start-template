import axiosObject from "./config";

export function login(form: {
	mode: string;
	mobile_isd_code: string;
	mobile_number: string;
	password: string;
}) {
	let payload = {
		mode: form.mode,
		username: form.mobile_isd_code + form.mobile_number,
		password: form.password,
	};
	return new Promise((resolve, reject) => {
		let uri = "/backend-auth/login";

		axiosObject
			.post(uri, payload, { withCredentials: true })
			.then((response) => {
				return resolve(response);
			})
			.catch((errors) => {
				console.log("Errors", JSON.stringify(errors));
				if (errors && errors?.response?.status === 422) {
					reject(errors.response.data.errors);
				}
				if (errors && errors?.response?.status === 401) {
					reject({
						password: "Incorrect Username or Password",
					});
				}
				reject(errors);
			});
	});
}
