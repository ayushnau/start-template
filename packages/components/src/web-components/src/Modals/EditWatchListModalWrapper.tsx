import React from "react";
import { HeadlessModal } from "@locoworks/reusejs-react-modal";
import { HandleIcon } from "icons";
import EditWatchList from "../WatchListContent/EditWatchList";

const Modal = React.forwardRef((props: any, ref: any) => {
	const closeModal = () => {
		props.onAction(false);
	};

	return (
		<div
			ref={ref}
			className="w-fit h-[75vh] bg-white rounded-xl flex flex-col items-center pt-3 pb-6 gap-y-3 transition-all"
		>
			<EditWatchList
				closeModal={closeModal}
				addOrRemoveFav={props.addOrRemoveFav}
			/>
		</div>
	);
});

const showEditWatchListModalWrapper = async ({ addOrRemoveFav }: any) => {
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
	// if (result && callbackYes) {
	//   callbackYes();
	// } else {
	//   callbackNo && callbackNo();
	// }
};

export default showEditWatchListModalWrapper;
