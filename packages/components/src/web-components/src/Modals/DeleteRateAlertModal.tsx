import React from "react";
import { HeadlessModal } from "@locoworks/reusejs-react-modal";
import { SecondaryButton } from "components";
import { BackArrowIcon } from "icons";

const Modal = React.forwardRef((props: any, ref: any) => {
	return (
		<div
			ref={ref}
			className="w-[505px] h-fit bg-white rounded-xl flex flex-col gap-y-3 transition-all pb-5"
		>
			<div className="px-6 py-5 border-b">
				<div
					className="w-fit h-fit"
					onClick={() => {
						props.onAction(false);
					}}
				>
					<BackArrowIcon />
				</div>
			</div>
			<div className="flex flex-col gap-y-3 transition-all px-7 py-5">
				<div className="font-bold tracking--0.5 leading-34 font-inter text-25 text-blackDark">
					{"Confirm delete?"}
				</div>
				<label className="font-inter text-sm leading-[22px] text-red-core">
					This alert will be permanently deleted, and you won’t be able to
					receive updates
				</label>

				<div className="flex space-x-4 mt-4 mb-4">
					<SecondaryButton
						className="w-6/12 border-black bg-white text-black font-semibold text-base leading-6 font-inter hover:bg-black hover:text-white"
						onClick={() => props.onAction(false)}
						buttonText={`No`}
					/>
					<SecondaryButton
						className="w-6/12 border-black bg-white text-black font-semibold text-base leading-6 font-inter hover:bg-black hover:text-white"
						onClick={() => props.onAction(true)}
						buttonText={`Yes`}
					/>
				</div>
			</div>
		</div>
	);
});

const showDeleteRateAlertModal = async ({ deleteCallback, alertId }: any) => {
	const result = await HeadlessModal({
		component: Modal,
		backdropClasses: "bg-black bg-opacity-50",
		animations: {
			modal: {
				initial: { opacity: 0, y: 400 },
				animate: { opacity: 1, y: 0 },
				exit: { opacity: 0, y: 400 },
				transition: { ease: "easeIn" },
			},
		},
	});
	if (result) {
		deleteCallback && deleteCallback(alertId);
		return result;
	}
};

export default showDeleteRateAlertModal;
