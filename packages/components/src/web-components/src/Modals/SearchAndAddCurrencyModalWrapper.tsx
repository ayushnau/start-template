import React from "react";
import { HeadlessModal } from "@locoworks/reusejs-react-modal";
import SearchAndAddCurrencyPairs from "../WatchListContent/SearchAndAddCurrencyPairs";

const Modal = React.forwardRef((props: any, ref: any) => {
	const closeModal = () => {
		props.onAction(false);
	};

	return (
		<div
			ref={ref}
			className="w-[505px] h-[75vh] bg-white rounded-xl flex flex-col items-center pt-3 pb-6 gap-y-3 transition-all"
		>
			<SearchAndAddCurrencyPairs
				addOrRemoveFav={props.addOrRemoveFav}
				closeModal={closeModal}
			/>
		</div>
	);
});

const showSearchAndAddCurrencyModalWrapper = async ({
	addOrRemoveFav,
}: any) => {
	const result = await HeadlessModal({
		component: Modal,
		backdropClasses: "bg-black bg-opacity-50",
		addOrRemoveFav: addOrRemoveFav,
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

export default showSearchAndAddCurrencyModalWrapper;
