import { useSelector } from "react-redux";
import { StoreState } from "store";

const useSubscriptionStatusHook = () => {
	const subscriptionStatus =
		useSelector((state: StoreState) => state.user?.subscriptionStatus) ||
		"inactive";

	const isFreeTrialOver = subscriptionStatus === "expired";
	const showBanner = subscriptionStatus !== "active";

	return { subscriptionStatus, isFreeTrialOver, showBanner };
};

export { useSubscriptionStatusHook };
