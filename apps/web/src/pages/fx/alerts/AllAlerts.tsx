import React, { useState, useEffect } from "react";
import { deleteAlert } from "services";
import { useSelector, useDispatch } from "react-redux";
import Sliderup from "../Components/Sliderup";
import NoAlerts from "./NoAlerts";
import { getCurrencySymbol } from "services/fx/getCurrencySymbol";
import { StoreState, setToastMessage } from "store";
import { Confirmation, HeadingWithButton, EditCurrencyPair } from "components";

const getTextBySymbol = (symbol: string) => {
	switch (symbol) {
		case "=":
			return "Equal to";
		case ">":
			return "Greater than";
		case "<":
			return "Less than";
		default:
			break;
	}
};

interface AllAlertsProps {
	onClickAddAlert: () => void;
	closeShowAlerts?: () => void;
	onSaveAlert?: () => void;
	alerts: any;
	getAllAlerts: any;
}

const AllAlerts: React.FC<AllAlertsProps> = (props) => {
	const [translateY, setTranslateY] = useState(100);
	const [deleteId, setDeleteId] = useState<number>();
	const [confirmDelete, setConfirmDelete] = useState(false);
	const dispatch = useDispatch();
	const { alerts, getAllAlerts } = props;
	const userUuid: any = useSelector(
		(state: StoreState) => state.user.form.userid,
	);

	const handleDeleteAlert = (alertId: number) => {
		(async () => {
			setDeleteId(alertId);
			setConfirmDelete(true);
		})();
	};

	return (
		<div className="px-5">
			{alerts.length > 0 ? (
				<HeadingWithButton
					heading="All Alerts"
					buttonText="+ Add alert"
					onButtonClick={() => {
						props.onClickAddAlert();
					}}
				/>
			) : null}
			{confirmDelete ? (
				<>
					<Sliderup
						ChildComponent={
							<Confirmation
								heading="Confirm delete?"
								subHeading="This alert will be permanently deleted, and you won’t be able to receive updates"
								leftButtonText="No"
								rightButtonText="Yes"
								onClickLeftButton={() => {
									setConfirmDelete(false);
								}}
								onClickRightButton={async () => {
									await deleteAlert(deleteId);
									await getAllAlerts();
									setConfirmDelete(false);
									dispatch(
										setToastMessage({
											message: "Alert deleted! ",
											type: "neutral",
											className: "mb-10",
										}),
									);
								}}
							/>
						}
						translateY={translateY}
						setTranslateY={setTranslateY}
						showScreen={confirmDelete}
						handleSlideShowChange={setConfirmDelete}
					/>
				</>
			) : null}
			<div className="pb-20 h-[70vh] overflow-scroll">
				{alerts.length > 0 ? (
					alerts.map((item: any, index: any) => (
						<div key={index}>
							<EditCurrencyPair
								key={index}
								pair={item.pair.pair}
								pairSubheading={
									item.type === "live-rate-bid"
										? `Bid · ${getTextBySymbol(
												item.operation,
										  )} ${getCurrencySymbol(item.pair.base_currency)}${
												item.trigger_value
										  }`
										: `Ask · ${getTextBySymbol(
												item.operation,
										  )} ${getCurrencySymbol(item.pair.base_currency)}${
												item.trigger_value
										  }`
								}
								handleItemClick={() => {}}
								dragIndicatorIcon=""
								deleteIconImagixUrl="https://wiredup-staging.imgix.net/611ee67e-e843-40d7-9f89-d9c5c85b6141?auto=compress,format"
								onClickDelete={() => handleDeleteAlert(item.id)}
								tickIcon={""}
								additionalProp={index === alerts.length - 1 ? true : false}
							/>
						</div>
					))
				) : (
					<NoAlerts />
				)}
			</div>
		</div>
	);
};

export default AllAlerts;
