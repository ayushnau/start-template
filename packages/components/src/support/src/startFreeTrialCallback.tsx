import { createUserSubscription } from "services";
import { showFreeTrialSelectedModal } from "../../..";

const startFreeTrailCallback = async (values: any, user_uuid: string) => {
	const payload = {
		user_uuid: user_uuid,
		plan_name: "trial",
		status: "active",
		data: {
			trial_period: "7 days",
			plan_duration: "7 days",
			plan_cost: "Free",
			...values,
		},
	};
	const response = await createUserSubscription(payload);
	if (response) {
		const closed = await showFreeTrialSelectedModal({});
		if (closed) {
			window.location.reload();
		}
	}
};

export default startFreeTrailCallback;
