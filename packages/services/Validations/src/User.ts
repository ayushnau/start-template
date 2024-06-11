import { z } from "zod";
import validator from "validator";

const UserValidation = z.object({
	full_name: z.string(),
	company_name: z.string(),
	email: z.string().email(),
	mobile_number: z.string().length(10).refine(validator.isMobilePhone),
});

export { UserValidation };
