import React from "react";
import { HeadlessModal } from "@locoworks/reusejs-react-modal";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter } from "react-router-dom";
import { webStore, webPersistor } from "store";
import QuoteReview from "../Tools/ImportExportTools/QuoteReview";

const QuoteReviewModal = React.forwardRef(
	({ callback, mobile, ...props }: any, ref: any) => {
		const closeModalCallback = (navLink?: string) => {
			props?.navigate(navLink);
			props.onAction(false);
		};
		return (
			<BrowserRouter>
				<Provider store={webStore}>
					<PersistGate loading={null} persistor={webPersistor}>
						<QuoteReview closeModal={closeModalCallback} />
					</PersistGate>
				</Provider>
			</BrowserRouter>
		);
	},
);

const showQuoteReviewModal = async ({
	callback,
	mobile = false,
	navigate,
}: any) => {
	let classes =
		"w-[95vw] md:w-[80vw] xl:w-[70vw] h-fit bg-white rounded-xl overflow-y-scroll";
	const result = await HeadlessModal({
		component: QuoteReviewModal,
		navigate: navigate,
		modalWrapperClasses: classes,
		disableOutsideClick: true,
		backdropClasses: "bg-black bg-opacity-50",
		mobile: mobile,
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

export default showQuoteReviewModal;
