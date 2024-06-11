import React, { useState, useEffect } from "react";
import { HeadlessModal } from "@locoworks/reusejs-react-modal";
import { useBetaForm } from "@locoworks/reusejs-toolkit-react-hooks";
import validator from "validator";
import { contactUs, overrideCalendarStyles } from "services";
import moment from "moment";
import { twMerge } from "tailwind-merge";
import { CrossIcon, HandleIcon } from "icons";

const Modal = React.forwardRef((props: any, ref: any) => {
	const {
		handleRunOnMount,
		showDownArrow,
		closeOnStateChange,
		closeModalState,
	} = props;
	useEffect(() => {
		handleRunOnMount();
	}, []);
	useEffect(() => {
		if (closeOnStateChange && !closeModalState) {
			props.onAction(false);
		}
	}, [closeModalState]);
	return showDownArrow ? (
		<>
			{" "}
			<div
				className={twMerge(
					`w-full rounded-t-2xl bg-white opacity-100 z-20 pt-4 max-h-[97vh]`,
				)}
			>
				<div
					onClick={() => {
						props.onAction(false);
					}}
					className={twMerge(
						"w-full h-fit cursor-pointer pb-4 text-center mx-auto",
					)}
				>
					{props.web ? (
						<CrossIcon className="ml-5 mt-1 scale-150" />
					) : (
						<HandleIcon className="mx-auto" />
					)}
				</div>

				{props.child}
			</div>
		</>
	) : (
		props.child
	);
});

interface ComponentModalProps {
	child: React.ReactNode | React.ReactNode[];
	closeModal: React.Dispatch<React.SetStateAction<boolean>>;
	handleRunOnMount?: any;
	showDownArrow?: boolean;
	closeModalState?: boolean;
	closeOnStateChange?: boolean;
}

const ComponentModal = async ({
	child,
	closeModal,
	handleRunOnMount = () => null,
	showDownArrow = true,
	closeModalState = true,
	closeOnStateChange = false,
}: ComponentModalProps) => {
	console.log(handleRunOnMount);
	const result = await HeadlessModal({
		component: Modal,
		backdropClasses: "bg-black bg-opacity-50",
		child: child,
		handleRunOnMount: handleRunOnMount,
		showDownArrow: showDownArrow,
		closeModalState: closeModalState,
		closeOnStateChange: closeOnStateChange,
		modalWrapperClasses: "self-end sm:self-auto w-full sm:w-fit",
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
	return result;
};

export default ComponentModal;
