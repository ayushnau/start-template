import React from "react";
import { HeadlessModal } from "@locoworks/reusejs-react-modal";
import AddAlerts from "../Tools/RateAlerts/AddAlerts";

const Modal = React.forwardRef((props: any, ref: any) => {
	return (
		<div
			ref={ref}
			className="w-[505px] h-fit min-h-[30vh] bg-white rounded-xl flex flex-col items-center pt-3 pb-6 gap-y-3 transition-all"
		>
			<AddAlerts
				closeShowAlerts={() => props.onAction(false)}
				getAllAlerts={props.getAllAlerts}
				displayAddToastCallback={props?.displayAddToastCallback}
			/>
		</div>
	);
});

export interface RateAlertsModalWrapperInterface {
	form?: any;
	setShowSelectCurrencyPair?: any;
	formKey?: any;
	getAllAlerts?: () => void;
	displayAddToastCallback?: () => void;
}

const showRateAlertsAddAlertsModal = async ({
	form,
	setShowSelectCurrencyPair,
	getAllAlerts,
	formKey,
	displayAddToastCallback,
}: RateAlertsModalWrapperInterface) => {
	const result = await HeadlessModal({
		component: Modal,
		backdropClasses: "bg-black bg-opacity-50",
		form: form,
		formKey: formKey || "currency_pair",
		getAllAlerts: getAllAlerts,
		displayAddToastCallback: displayAddToastCallback,
		setShowSelectCurrencyPair: setShowSelectCurrencyPair,
		animations: {
			modal: {
				initial: { opacity: 0, y: 400 },
				animate: { opacity: 1, y: 0 },
				exit: { opacity: 0, y: 400 },
				transition: { ease: "easeIn" },
			},
		},
	});
};

export default showRateAlertsAddAlertsModal;
