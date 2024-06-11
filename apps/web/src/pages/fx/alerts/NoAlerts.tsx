import React, { useState, useEffect } from "react";
import { getAlerts } from "services";
import AllAlerts from "./AllAlerts";
import AddAlerts from "./AddAlerts";
import Sliderup from "../Components/Sliderup";
import { StoreState, setToastMessage } from "store";
import { useSelector, useDispatch } from "react-redux";
import { Loader, AddItemPrompt, Header } from "components";
import PermissionModal from "./PermissionModal";
import NotificationModal from "./NotificationModal";
import { useNavigate } from "react-router-dom";

const NoAlerts: React.FC<{}> = ({}) => {
	const [isLoading, setLoader] = useState<boolean>(false);
	const dispatch = useDispatch();
	const [alerts, setAlerts] = useState([]);
	const [showAlerts, setShowAlerts] = useState(false);
	const [translateY, setTranslateY] = useState(100);
	const [notificationModal, setNotificationModal] = useState(false);
	const [permissionModal, setPermissionModal] = useState(false);
	const navigate = useNavigate();

	const userUuid: any = useSelector(
		(state: StoreState) => state.user.form.userid,
	);
	const getAllAlerts = async () => {
		let allAlerts: any = await getAlerts(userUuid);
		setAlerts(allAlerts);
	};

	useEffect(() => {
		(async () => {
			setLoader(true);
			await getAllAlerts();
			setLoader(false);
		})();
	}, []);

	const handleSlideShowChange = async (value: boolean) => {
		setShowAlerts(value);
		if (!value) {
			await getAllAlerts();
			dispatch(
				setToastMessage({
					message: "Alert Added! ",
					type: "neutral",
					className: "mb-10",
				}),
			);
		}
	};

	const handleSlideShowClose = async (value: boolean) => {
		setShowAlerts(value);
		if (!value) {
			await getAllAlerts();
		}
	};
	const handleNotificationModal = (value: boolean) => {
		setShowAlerts(false);
		setPermissionModal(false);
		setNotificationModal(value);
	};

	const handlePermissionModal = (value: boolean) => {
		setShowAlerts(false);
		setNotificationModal(false);
		setPermissionModal(value);
	};
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
			{showAlerts && (
				<Sliderup
					ChildComponent={
						<AddAlerts
							closeShowAlerts={handleSlideShowChange}
							openPermissionModal={() => {
								setShowAlerts(false);
								setNotificationModal(false);
								setPermissionModal(true);
							}}
							getAllAlerts={getAllAlerts}
						/>
					}
					translateY={translateY}
					setTranslateY={setTranslateY}
					showScreen={showAlerts}
					handleSlideShowChange={handleSlideShowClose}
				/>
			)}

			{permissionModal && (
				<Sliderup
					ChildComponent={
						<PermissionModal
							closeModal={handlePermissionModal}
							openNotificationModal={() => {
								setShowAlerts(false);
								setPermissionModal(false);
								setNotificationModal(true);
							}}
						/>
					}
					translateY={translateY}
					setTranslateY={setTranslateY}
					showScreen={permissionModal}
					handleSlideShowChange={handlePermissionModal}
				/>
			)}

			{notificationModal && (
				<Sliderup
					ChildComponent={
						<NotificationModal closeModal={handleNotificationModal} />
					}
					translateY={translateY}
					setTranslateY={setTranslateY}
					showScreen={notificationModal}
					handleSlideShowChange={handleNotificationModal}
				/>
			)}

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
							<>
								<AllAlerts
									onClickAddAlert={() => setShowAlerts(true)}
									alerts={alerts}
									getAllAlerts={getAllAlerts}
								/>
							</>
						)}
					</>
				}
			/>
		</>
	);
};
export default NoAlerts;
