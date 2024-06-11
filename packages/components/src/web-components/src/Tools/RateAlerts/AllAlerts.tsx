import React from "react";
import { deleteAlert } from "services";
import { useDispatch } from "react-redux";
import NoAlerts from "../../../../../../../apps/wiredup/src/pages/fx/alerts/NoAlerts";
import { getCurrencySymbol } from "services/fx/getCurrencySymbol";
import { setToastMessage } from "store";
import { HeadingWithButton, EditCurrencyPair } from "components";
import showDeleteRateAlertModal from "../../Modals/DeleteRateAlertModal";

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
	web?: boolean;
}

const AllAlerts: React.FC<AllAlertsProps> = (props) => {
	const dispatch = useDispatch();
	const { alerts, getAllAlerts } = props;

	const handleDeleteAlert = async (alertId: number) => {
		try {
			const response: any = await showDeleteRateAlertModal({ alertId });
			if (response) {
				const deleteResponse: any = await deleteAlert(alertId);
				if (deleteResponse) {
					await getAllAlerts();
					dispatch(
						setToastMessage({
							message: "Alert deleted! ",
							type: "neutral",
							className: "mb-10",
						}),
					);
				}
			}
		} catch (error) {
			console.log("Error while deleting Alert");
		}
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
