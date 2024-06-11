import React, { useState, useEffect } from "react";
import { HeadlessModal } from "@locoworks/reusejs-react-modal";
import { Confirmation } from "components";
import BottomWrapper from "./BottomWrapper";

const Modal = React.forwardRef((props: any, ref: any) => {
	return (
		<>
			<BottomWrapper
				onAction={(value: boolean) => {
					props.onAction(value);
				}}
				wrapperClass="pb-0"
				children={
					<div className="pb-4 bg-white">
						<Confirmation
							heading="Discard ledger?"
							leftButtonText="No"
							rightButtonText="Yes"
							onClickLeftButton={() => {
								props.onAction(false);
							}}
							onClickRightButton={async () => {
								props.navigate(-1);
								props.onAction(false);
							}}
						/>
					</div>
				}
				ref={ref}
			/>
		</>
	);
});

interface ConfirmationModalProps {
	navigate?: any;
	setShowConfirm?: any;
}

const ConfirmationModal = async ({
	navigate,
	setShowConfirm,
}: ConfirmationModalProps) => {
	const result = await HeadlessModal({
		component: Modal,
		backdropClasses: "bg-black bg-opacity-50",
		modalWrapperClasses: "self-end sm:self-auto w-full sm:w-fit",
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

	if (!result) {
		setShowConfirm(false);
	}
};

export default ConfirmationModal;
