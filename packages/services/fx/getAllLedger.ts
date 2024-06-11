import axiosObject from "../config";
import baseValidator from "../baseValidator";

function getAllLedger() {
	return new Promise((resolve, reject) => {
		let uri = `backend-fx/api/work-books/`;

		axiosObject
			.get(uri)
			.then((response) => {
				resolve(response.data);
			})
			.catch((errors) => {
				reject(errors);
			});
	});
}

export { getAllLedger };
