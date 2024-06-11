import axiosObject from "../config";
import baseValidator from "../baseValidator";

const contactUs = (payload: any) => {
	return new Promise((resolve, reject) => {
		let uri = "/backend-onboarding/contact-us";

		axiosObject
			.post(uri, payload)
			.then((response) => {
				resolve(response.data);
			})
			.catch((errors) => {
				console.log("Errors", JSON.stringify(errors));
				reject(errors);
			});
	});
};

export { contactUs };
