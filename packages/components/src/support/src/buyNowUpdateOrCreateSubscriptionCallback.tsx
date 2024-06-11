import { isObjectEmpty } from "utils";
import { createUserSubscription, updateUserSubscription } from "services";

const buyNowUpdateOrCreateSubscriptionCallback = async (
	form_values: any,
	subscriptionDetails: any,
	user_uuid: string,
) => {
	if (isObjectEmpty(subscriptionDetails)) {
		const create_new_payload: any = {
			user_uuid: user_uuid,
			plan_name: "trial",
			status: "inactive",
			data: {
				trial_period: "0 days",
			},
		};
		if (form_values?.email) {
			create_new_payload["data"]["email_id"] = form_values.email;
		}
		if (form_values?.company_name) {
			create_new_payload["data"]["company_name"] = form_values.company_name;
		}
		if (form_values?.mobile_number) {
			create_new_payload["data"]["mobile_number"] = form_values.mobile_number;
		}
		const create_new_response = await createUserSubscription(
			create_new_payload,
		);
	} else {
		const subscription_uuid = subscriptionDetails?.uuid;
		const update_payload: any = {
			user_uuid: user_uuid,
			plan_name: "trial",
			status: "inactive",
			data: {
				trial_period: "0 days",
			},
		};
		if (form_values?.email) {
			update_payload["data"]["email_id"] = form_values.email;
		}
		if (form_values?.company_name) {
			update_payload["data"]["company_name"] = form_values.company_name;
		}
		if (form_values?.mobile_number) {
			update_payload["data"]["mobile_number"] = form_values.mobile_number;
		}
		const update_response = await updateUserSubscription(
			subscription_uuid,
			update_payload,
		);
	}
};

export default buyNowUpdateOrCreateSubscriptionCallback;
