import React from "react";
import { HeadlessModal } from "@locoworks/reusejs-react-modal";
import BorrowingResults from "../Tools/BorrowingCostComparison/BorrowingResults";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter } from "react-router-dom";
import { webStore, webPersistor } from "store";

const Modal = React.forwardRef(({ ledgerId, ...props }: any, ref: any) => {
	const closeModalCallback = (navLink?: string) => {
		props?.navigate(navLink);
		props.onAction(false);
	};

	return (
		<BrowserRouter>
			<Provider store={webStore}>
				<PersistGate loading={null} persistor={webPersistor}>
					<div
						ref={ref}
						className="w-[75vw] h-fit bg-white rounded-xl flex flex-col gap-y-3 transition-all pb-5"
					>
						<BorrowingResults closeModal={closeModalCallback} />
					</div>
				</PersistGate>
			</Provider>
		</BrowserRouter>
	);
});

const showBorrowingResults = async ({ navigate }: any) => {
	const result = await HeadlessModal({
		component: Modal,
		backdropClasses: "bg-black bg-opacity-50",
		navigate: navigate,
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

export default showBorrowingResults;
