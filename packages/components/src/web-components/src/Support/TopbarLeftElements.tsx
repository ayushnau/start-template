import React from "react";
import { UserCircleIcon } from "icons";
import showAccountsModal from "../../../global/modals/showAccountsModal";
import { useSelector } from "react-redux";
import showContactUsDetailsModal from "../../../global/modals/showContactUsModal";
import showMySubscriptionModal from "../../../global/modals/showMySubscriptionModal";
import {
	useSubscriptionFlowHook,
	useSubscriptionStatusHook,
	createUserSubscription,
} from "services";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { webPersistor } from "store";
import showFreeTrialSelectedModal from "../Modals/FreeTrialSelectedModal";
import { UserSubscriptionType } from "interfaces";

export interface TopbarLeftElementsInterface {}

const TopbarLeftElements: React.FC<TopbarLeftElementsInterface> = ({}) => {
	const userDetails = useSelector((state: any) => state?.user?.userDetails);
	const user_uuid = useSelector((state: any) => state?.user?.form?.userid);

	const subscription_details = useSelector(
		(state: any) => state.user?.subscriptionData,
	);

	const startFreeTrailCallback = async (values: any) => {
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
		const closed = await showFreeTrialSelectedModal({
			mobile: false,
		});
		if (closed) {
			setTimeout(() => {
				window.location.reload();
			}, 1000);
		}
	};

	const { subscriptionStatus } = useSubscriptionStatusHook();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [isMenuOpen, setIsMenuOpen] = React.useState(false);

	const contactUsCallback = async () => {
		await showContactUsDetailsModal({
			web: true,
		});
	};

	const subscriptionCallback = async () => {
		await showMySubscriptionModal({
			web: true,
			subscription_details: subscription_details,
		});
	};

	const { startSubscriptionFlow } = useSubscriptionFlowHook({ mobile: false });

	const handleStartSubscriptionsFlow = () => {
		startSubscriptionFlow((values) => {
			startFreeTrailCallback(values);
		});
	};

	const logoutCallback = async () => {
		webPersistor.purge();
		navigate("/home");
	};

	return (
		<div className="flex ml-5">
			<div
				className="rounded-full flex items-center justify-center"
				onClick={() => {
					setIsMenuOpen(true);
					showAccountsModal({
						closeMenu: () => setIsMenuOpen(false),
						userDetails: userDetails,
						contactUsCallback: contactUsCallback,
						subscriptionCallback: subscriptionCallback,
						subscriptionStatus:
							subscriptionStatus as unknown as UserSubscriptionType,
						subscription_details: subscription_details,
						handleStartSubscriptionsFlow: handleStartSubscriptionsFlow,
						logoutCallback: logoutCallback,
					});
				}}
			>
				<UserCircleIcon isFilled={isMenuOpen} />
			</div>
		</div>
	);
};

export default TopbarLeftElements;
