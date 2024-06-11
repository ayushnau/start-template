import React from "react";
import {
	showFreeTrailModal,
	showStartFreeTrailModal,
	showFreeTrialSelectedModal,
	FXHomeLeftSection,
	FXHomeRightSection,
	FXHomeWrapper,
	FXThirdSection,
	TalkToUsModal as showTalkToUsModal,
} from "components";
import { FXWrapper } from "components";
import { twMerge } from "tailwind-merge";
import {
	useSubscriptionStatusHook,
	createUserSubscription,
	updateUserSubscription,
} from "services";
import { useSelector } from "react-redux";
import { isObjectEmpty } from "utils";
import { UserSubscriptionType } from "interfaces";

const Home = () => {
	const { subscriptionStatus, isFreeTrialOver, showBanner } =
		useSubscriptionStatusHook();
	const user_uuid = useSelector((state: any) => state?.user?.form?.userid);
	const subscriptionDetails = useSelector(
		(state: any) => state?.user?.subscriptionData,
	);

	const user_data = useSelector((state: any) => state?.user?.userDetails);
	const mobile_number = user_data?.mobile_full?.mobile_number || "";

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
		if (response) {
			const closed = await showFreeTrialSelectedModal({});
			if (closed) {
				window.location.reload();
			}
		}
	};

	const buyNowUpdateOrCreateSubscriptionCallback = async (form_values: any) => {
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

	const showSubscriptionsModal = async () => {
		const response1 = await showFreeTrailModal({
			isFreeTrialOver: isFreeTrialOver,
		});
		if (response1 === "free-trail") {
			const response2 = await showStartFreeTrailModal({
				callback: startFreeTrailCallback,
			});
		}
		if (response1 === "pricing_inquiry") {
			await showTalkToUsModal({
				user_uuid: user_uuid,
				mobile_number: mobile_number,
				buyNowCallback: buyNowUpdateOrCreateSubscriptionCallback,
			});
		}
	};

	React.useEffect(() => {
		if (subscriptionStatus === "inactive") {
			showSubscriptionsModal();
		}
	}, [subscriptionStatus]);

	return (
		<FXHomeWrapper
			showTopSection={showBanner}
			openModalCallback={showSubscriptionsModal}
			isFreeTrialOver={isFreeTrialOver}
		>
			<FXWrapper
				showBanner={showBanner}
				firstSection={
					<div
						className={twMerge(
							"w-full scrollbar-hide",
							showBanner ? "h-[calc(100vh-168px)]" : "h-[calc(100vh-50px)]",
						)}
					>
						<FXHomeLeftSection
							showSubscriptionsModal={showSubscriptionsModal}
						/>
					</div>
				}
				secondSection={
					<div className="w-full h-full scrollbar-hide">
						<FXHomeRightSection
							showSubscriptionsModal={showSubscriptionsModal}
						/>
					</div>
				}
				thirdSection={
					<div className="w-full h-full scrollbar-hide">
						<FXThirdSection
							subscriptionStatus={
								subscriptionStatus as unknown as UserSubscriptionType
							}
						/>
					</div>
				}
			/>
		</FXHomeWrapper>
	);
};

export default Home;
