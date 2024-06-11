import React from "react";
import { HeadlessModal } from "@locoworks/reusejs-react-modal";
import MonthSelectionForm from "../Tools/ImportExportTools/MonthSelectionForm";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter } from "react-router-dom";
import { webStore, webPersistor } from "store";

const MonthSelectionModal = React.forwardRef(
	({ callback, ...props }: any, ref: any) => {
		const closeModal = () => {
			props.onAction(false);
		};
		const openAmountModalCallback = () => {
			callback && callback();
		};
		return (
			<BrowserRouter>
				<Provider store={webStore}>
					<PersistGate loading={null} persistor={webPersistor}>
						<MonthSelectionForm
							closeModal={closeModal}
							callback={openAmountModalCallback}
						/>
					</PersistGate>
				</Provider>
			</BrowserRouter>
		);
	},
);

const showMonthSelectionModal = async ({ callback }: any) => {
	let classes = "w-[505px] h-[600px] bg-white rounded-xl overflow-y-scroll";
	const result = await HeadlessModal({
		component: MonthSelectionModal,
		modalWrapperClasses: classes,
		backdropClasses: "bg-black bg-opacity-50",
		callback: callback,
		animations: {
			modal: {
				initial: { opacity: 0, y: 400 },
				animate: { opacity: 1, y: 0 },
				exit: { opacity: 0, y: 400 },
				transition: { ease: "easeIn" },
			},
		},
	});
	return result;
};

export default showMonthSelectionModal;
