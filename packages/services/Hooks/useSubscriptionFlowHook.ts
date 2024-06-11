import {
	showFreeTrailModal,
	showStartFreeTrailModal,
	showFreeTrialSelectedModal,
	TalkToUsModal as showTalkToUsModal,
} from "components";
import { useSubscriptionStatusHook } from "./useSubscriptionStatusHook";
import { useSelector } from "react-redux";

export interface UseSubscriptionFlowHookInterface {
	mobile?: boolean;
}

const useSubscriptionFlowHook = ({
	mobile = false,
}: UseSubscriptionFlowHookInterface) => {
	const { subscriptionStatus, isFreeTrialOver } = useSubscriptionStatusHook();
	const { id: user_uuid, mobile_full } = useSelector(
		(state: any) => state?.user?.userDetails,
	) || { id: "", mobile_full: "" };

	const startSubscriptionFlow = async (
		subscribeCallback: (formValues: any) => void,
		buyNowCallback?: (formValues: any) => void,
	) => {
		if (subscriptionStatus !== "active") {
			const response1 = await showFreeTrailModal({
				isFreeTrialOver: isFreeTrialOver,
				mobile: mobile,
			});
			if (response1 === "free-trail") {
				const response2 = await showStartFreeTrailModal({
					callback: subscribeCallback,
					mobile: mobile,
				});
			}
			if (response1 === "pricing_inquiry") {
				await showTalkToUsModal({
					user_uuid: user_uuid,
					mobile_number: mobile_full?.mobile_number,
					buyNowCallback: (values) => {
						buyNowCallback && buyNowCallback(values);
					},
				});
			}
		} else {
			return subscriptionStatus;
		}
	};
	return { subscriptionStatus, startSubscriptionFlow };
};

export { useSubscriptionFlowHook };
