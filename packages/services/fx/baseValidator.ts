import validate from "validate.js";

export default function validateData(data: any, constraints: any) {
	let jsValidationErrors;

	jsValidationErrors = validate(data, constraints, {
		format: "detailed",
	});

	if (jsValidationErrors === undefined) {
		return true;
	} else {
		let errors: any = {};

		jsValidationErrors.forEach((d: any) => {
			errors[d.attribute] = d.error;
		});

		return errors;
	}
}
