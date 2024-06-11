import React from "react";
import { getUserSubscriptionData } from "services";
import { useSelector, useDispatch } from "react-redux";
import { setUserSubscriptionData, setUserSubscriptionStatus } from "store";
import { convertUnixTimestampToDate } from "services";
import { Loader } from "components";
import { MobileShimmerLoader } from "components";

export interface SubscriptionHandlerInterface {
	children?: any;
	showSubscriptionsModal?: any;
}

const SubscriptionHandler: React.FC<SubscriptionHandlerInterface> = ({
	children,
	showSubscriptionsModal,
}) => {
	const user_uuid = useSelector((state: any) => state?.user?.userDetails?.id);
	const [isLoading, setIsLoading] = React.useState(true);
	const dispatch = useDispatch();

	const generateAndSaveUserSubscriptionInformation = (data: any) => {
		const subscription_data = {
			uuid: data.uuid,
			user_uuid: data.user_uuid,
			start_date: convertUnixTimestampToDate(data.starts_at),
			end_date: convertUnixTimestampToDate(data.ends_at),
			plan_duration: data?.data?.plan_duration || "NA",
			plan_cost: data?.data?.plan_cost || "NA",
			discount: data?.data?.discount || "NA",
			gst: data?.data?.gst || "NA",
			total: data?.data?.total || "NA",
			full: data?.data,
		};
		dispatch(setUserSubscriptionData(subscription_data));
	};

	const fetchUserSubscriptionData = async () => {
		try {
			const response: any = await getUserSubscriptionData(user_uuid);
			// For testing inactive state
			// const response: any = null;
			// For testing expired state
			// const response: any = { status: "inactive" };
			if (response) {
				dispatch(
					setUserSubscriptionStatus(
						response?.status === "active" ? "active" : "expired",
					),
				);
				generateAndSaveUserSubscriptionInformation(response);
			} else {
				dispatch(setUserSubscriptionStatus("inactive"));
			}
			if (response && response.status !== "active") {
				showSubscriptionsModal &&
					showSubscriptionsModal(response.status === "inactive" ? true : null);
			}
			setIsLoading(false);
		} catch (error) {
			throw error;
		}
	};

	React.useEffect(() => {
		fetchUserSubscriptionData();
	}, []);

	return isLoading ? <MobileShimmerLoader /> : children;
};

export default SubscriptionHandler;
