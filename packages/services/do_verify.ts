import axiosObject from "./config";

export interface doVerifyForm {
	mode: string;
	mobile_isd_code: string;
	username: string;
	otp: string;
}

function do_verify(form: doVerifyForm) {
	let payload = form;
	return new Promise((resolve, reject) => {
		let uri = "/backend-auth/do-verify";

		// console.log("Data to verify is>>", payload);
		axiosObject
			.post(uri, payload, { withCredentials: true })
			.then((response) => {
				resolve(response.data);
			})
			.catch((errors) => {
				console.log("Errors", errors);
				reject(errors.response.data.errors);
			});
	});
}

export { do_verify };
