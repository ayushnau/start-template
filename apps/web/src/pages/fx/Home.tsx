import {
	HomeHeading,
	HomeLiveRates,
	PortfolioSection,
	ToolsSection,
	BillDiscountingSection,
	AcademySection,
	DashboardCurrencyCalculator,
	MobileTrialBanner,
	showFreeTrailModal,
	showStartFreeTrailModal,
	showFreeTrialSelectedModal,
} from "components";
import ScheduleCallSection from "components/src/Home/ScheduleCallSection";
import React from "react";
import Socketio from "socket.io-client";
import { useSelector } from "react-redux";
import {
	createUserSubscription,
	updateUserSubscription,
	useSubscriptionStatusHook,
} from "services";
import { TalkToUsModal as showTalkToUsModal } from "components";
import SubscriptionHandler from "../../SubscriptionHandler";
import { isObjectEmpty } from "utils";
import DownloadAppSection from "components/src/Home/DownloadAppSection";
export interface HomeInterface {
	setTabCallback: React.Dispatch<React.SetStateAction<string>>;
}

const URL =
	import.meta.env.VITE_PUBLIC_API_URL || process.env.VITE_PUBLIC_API_URL;

const socketConnection = Socketio(URL, {
	path: "/backend-socket",
	transports: ["websocket"],
	autoConnect: false,
});

const Home: React.FC<HomeInterface> = ({ setTabCallback }) => {
	const { subscriptionStatus, isFreeTrialOver } = useSubscriptionStatusHook();
	const ref = React.useRef<boolean | null>(null);
	const { id: user_uuid, mobile_full } = useSelector(
		(state: any) => state.user?.userDetails,
	);
	const subscriptionDetails = useSelector(
		(state: any) => state?.user?.subscriptionData,
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

	const showSubscriptionsModal = async (expired?: any) => {
		const response1 = await showFreeTrailModal({
			isFreeTrialOver: expired || isFreeTrialOver,
			mobile: true,
		});
		if (response1 === "free-trail") {
			const response2 = await showStartFreeTrailModal({
				callback: startFreeTrailCallback,
				mobile: true,
			});
			if (response2) {
				//TODO: Add api call here to start free trial for user
				await showFreeTrialSelectedModal({ mobile: true });
			}
		}
		if (response1 === "pricing_inquiry") {
			await showTalkToUsModal({
				user_uuid: user_uuid,
				mobile_number: mobile_full.mobile_number,
				buyNowCallback: buyNowUpdateOrCreateSubscriptionCallback,
			});
		}
	};

	// React.useEffect(() => {
	//   setTimeout(() => {
	//     if (subscriptionStatus === "inactive") {
	//       showSubscriptionsModal();
	//     }
	//   }, 1000);
	// }, [subscriptionStatus]);

	const handleBillDiscountingClick = (user_type: string) => {
		if (window?.ReactNativeWebView) {
			window?.ReactNativeWebView?.postMessage?.(
				JSON.stringify({
					type: "bill_discounting_navigtaion",
					user_type: user_type,
				}),
			);
		}
	};

	const handleConnectAndConsultClick = () => {
		if (window?.ReactNativeWebView) {
			window?.ReactNativeWebView?.postMessage?.(
				JSON.stringify({
					type: "connect_and_consult",
				}),
			);
		}
	};

	return (
		<SubscriptionHandler showSubscriptionsModal={showSubscriptionsModal}>
			<div id="home-page" className="scrollbar-hide bg-mine-shaft-1">
				<HomeHeading expireyDate={new Date()} />
				<div className="flex flex-col gap-y-4 pt-[72px] pb-[150px] px-5 overflow-y-scroll scrollbar-hide">
					<MobileTrialBanner
						showTopSection={subscriptionStatus !== "active"}
						isFreeTrialOver={subscriptionStatus === "expired"}
						openModalCallback={showSubscriptionsModal}
					/>
					<HomeLiveRates
						socketConnection={socketConnection}
						setTabCallback={setTabCallback}
						showSubscriptionsModal={showSubscriptionsModal}
					/>
					<PortfolioSection
						setTabCallback={setTabCallback}
						showSubscriptionsModal={showSubscriptionsModal}
					/>
					<DashboardCurrencyCalculator mobile={true} />

					<ToolsSection showSubscriptionsModal={showSubscriptionsModal} />
					<ScheduleCallSection
						handleConnectAndConsultClick={handleConnectAndConsultClick}
					/>
					{/* <BillDiscountingSection
						handleBillDiscountingClick={handleBillDiscountingClick}
					/> */}
					<AcademySection />
					<DownloadAppSection />
				</div>
			</div>
		</SubscriptionHandler>
	);
};

export default Home;
