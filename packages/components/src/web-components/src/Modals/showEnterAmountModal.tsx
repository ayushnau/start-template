import React from "react";
import { HeadlessModal } from "@locoworks/reusejs-react-modal";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter } from "react-router-dom";
import { webStore, webPersistor } from "store";
import EnterAmountForm from "../Tools/ImportExportTools/EnterAmountForm";

const EnterAmountModal = React.forwardRef(
	({ callback, ...props }: any, ref: any) => {
		const closeModal = () => {
			props.onAction(false);
		};

		const openMonthsFormCallback = () => {
			callback && callback();
		};

		return (
			<BrowserRouter>
				<Provider store={webStore}>
					<PersistGate loading={null} persistor={webPersistor}>
						<EnterAmountForm
							closeModal={closeModal}
							openMonthsFormCallback={openMonthsFormCallback}
						/>
					</PersistGate>
				</Provider>
			</BrowserRouter>
		);
	},
);

const showEnterAmountModal = async ({ callback }: any) => {
	let classes =
		"w-[505px] h-[600px] bg-white rounded-xl overflow-y-scroll relative";
	const result = await HeadlessModal({
		component: EnterAmountModal,
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

export default showEnterAmountModal;
