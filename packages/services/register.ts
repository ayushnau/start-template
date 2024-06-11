import axiosObject from "./config";

function register(form: {
	mode: string;
	username: string;
	mobile_isd_code: string;
	mobile_number: string;
	user_type: string;
	password: string;
}): Promise<any> {
	let payload = form;
	return new Promise((resolve, reject) => {
		let uri = "/backend-auth/register";

		axiosObject
			.post(uri, payload, { withCredentials: true })
			.then((response) => {
				console.log("data message", response.data.message);
				response.data.message === "success"
					? registrationOTP(payload)
					: console.log("nothing");
				resolve(payload);
			})
			.catch((errors) => {
				console.log("errors.response.status", errors.response.status);
				if (errors.response.status === 422) {
					reject(errors.response.data.errors);
				}
				if (errors.response.status === 401) {
					reject({
						password: "Incorrect Username or Password",
					});
				}
				reject(errors);
			});
	});
}

function registrationOTP(form: {
	mode: string;
	username: string;
	mobile_isd_code: string;
	mobile_number: string;
	user_type: string;
	password: string;
}) {
	const payload = form;
	return new Promise((resolve, reject) => {
		let uri = "/backend-auth/request-verify";

		axiosObject
			.post(uri, payload, { withCredentials: true })
			.then((response) => {
				resolve(response.data);
			})
			.catch((errors) => {
				console.log("Errors", JSON.stringify(errors));
				if (errors.response.status === 422) {
					reject(errors.response.data.errors);
				}
				if (errors.response.status === 401) {
					reject({
						password: "Incorrect Username or Password",
					});
				}
				reject(errors);
			});
	});
}

function setPassword(form: {
	mode: string;
	username: string;
	password: string;
}) {
	const payload = form;
	return new Promise((resolve, reject) => {
		let uri = "/backend-auth/set-password";

		axiosObject
			.post(uri, payload, { withCredentials: true })
			.then((response) => {
				resolve(response.data);
			})
			.catch((errors) => {
				console.log("Errors", JSON.stringify(errors));
				if (errors.response.status === 422) {
					reject(errors.response.data.errors);
				}
				reject(errors);
			});
	});
}

function getUserDetails(form: {
	mode: string;
	username: string;
}): Promise<any> {
	let payload = form;
	return new Promise((resolve, reject) => {
		let uri = "/backend-auth/user-details";

		axiosObject
			.post(uri, payload, { withCredentials: true })
			.then((response) => {
				resolve(response.data);
			})
			.catch((errors) => {
				console.log(
					"error while fetching the user details",
					JSON.stringify(errors),
				);
				if (errors && errors?.response?.status === 422) {
					reject(errors?.response?.data?.errors);
				}
				reject(errors);
			});
	});
}

export { register, registrationOTP, setPassword, getUserDetails };
