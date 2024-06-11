import React, { useState, useEffect } from "react";
import { getAlerts } from "services";
import AllAlerts from "./AllAlerts";
import { useSelector, useDispatch } from "react-redux";
import { Loader, AddItemPrompt, Header } from "components";
import { useNavigate } from "react-router-dom";
import showRateAlertsAddAlertsModal from "../../Modals/RateAlertsAddAlertsModal";
import { StoreState, setToastMessage } from "store";

const RateAlerts: React.FC<{}> = ({}) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const userUuid: any = useSelector(
		(state: StoreState) => state.user.form.userid,
	);
	const [alerts, setAlerts] = useState([]);
	const [isLoading, setLoader] = useState<boolean>(false);

	const getAllAlerts = async () => {
		try {
			setLoader(true);
			let allAlerts: any = await getAlerts(userUuid);
			setAlerts(allAlerts);
		} catch (error) {
			console.log("Error while fetching all alerts");
		} finally {
			setLoader(false);
		}
	};

	const displayAddToastCallback = () => {
		dispatch(
			setToastMessage({
				message: "Alert Added! ",
				type: "neutral",
				className: "mb-10",
			}),
		);
	};

	const setShowAlerts = (value: any) => {
		showRateAlertsAddAlertsModal({
			getAllAlerts: getAllAlerts,
			displayAddToastCallback: displayAddToastCallback,
		});
	};

	useEffect(() => {
		getAllAlerts();
	}, []);

	return (
		<>
			<Header
				className="h-14 flex items-center p-4 gap-x-4 border-b border-mine-shaft-2"
				displayTitleStyles="font-inter leading-6 font-bold text-base text-mine-shaft-4"
				displayTitle={"Rate Alerts"}
				showEditIcon={false}
				subtitleWrapper="ml-0"
				backAction={() => {
					navigate(-1);
				}}
			/>

			<Loader
				isLoading={isLoading}
				successComponent={
					<>
						{alerts.length === 0 ? (
							<div className="mt-20 flex flex-col items-center sha">
								<AddItemPrompt
									iconImageUrl="https://wiredup-staging.imgix.net/46e3a197-cc73-468b-a06c-2b64e8f1fc6c?auto=compress,format"
									heading="No alert"
									subHeading=" Don’t miss out on important breakthroughs!"
									buttonText="+ Add alert"
									onButtonClick={() => {
										setShowAlerts(true);
									}}
								/>
							</div>
						) : (
							<AllAlerts
								onClickAddAlert={() => setShowAlerts(true)}
								alerts={alerts}
								getAllAlerts={getAllAlerts}
							/>
						)}
					</>
				}
			/>
		</>
	);
};
export default RateAlerts;
