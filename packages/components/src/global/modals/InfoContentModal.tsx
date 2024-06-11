import React, { useState, useEffect } from "react";
import { HeadlessModal } from "@locoworks/reusejs-react-modal";
import BottomWrapper from "./BottomWrapper";
import { InfoContent } from "components";

const Modal = React.forwardRef((props: any, ref: any) => {
	const [isAskExpanded, setIsAskExpanded] = useState(false);
	const [isBidExpanded, setIsBidExpanded] = useState(false);
	return (
		<>
			<BottomWrapper
				onAction={(value: boolean) => {
					props.onAction(value);
				}}
				wrapperClass="pb-0"
				children={
					<InfoContent
						isBidExpanded={isBidExpanded}
						setIsBidExpanded={setIsBidExpanded}
						isAskExpanded={isAskExpanded}
						setIsAskExpanded={setIsAskExpanded}
					/>
				}
				ref={ref}
			/>
		</>
	);
});

interface InfoContentModalProps {
	closeModal: any;
}

const InfoContentModal = async ({ closeModal }: InfoContentModalProps) => {
	const result = await HeadlessModal({
		component: Modal,
		backdropClasses: "bg-black bg-opacity-50",
		modalWrapperClasses: "self-end sm:self-auto w-full sm:w-fit",
		closeModal: closeModal,
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
		closeModal(false);
	}
};

export default InfoContentModal;
