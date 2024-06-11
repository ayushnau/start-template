import React, { useState } from "react";
import { HeadlessModal } from "@locoworks/reusejs-react-modal";
import { BackArrowIcon, HandleIcon } from "icons";
import { SecondaryButton } from "../../..";
import { twMerge } from "tailwind-merge";

interface DeleteModalInterface {
	title: string;
	description?: string;
	descriptionComponent?: React.ReactNode | React.ReactNode[];
	callbackYes?: () => void;
	callbackNo?: () => void;
	makeModalFull?: boolean;
	cancelButtonText?: string;
	approveButtonText?: string;
	approveButtonClasses?: string;
	web?: boolean;
}

const Modal = React.forwardRef((props: any, ref: any) => {
	const [full, setFull] = useState(false);
	return (
		<div
			ref={ref}
			className={twMerge(
				"w-screen bottom-0 bg-white rounded-t-xl flex flex-col items-center pt-3 pb-6 gap-y-3 transition-all ",
				full ? " h-screen" : " max-h-[90vh] h-fit ",
				props.web ? "w-full rounded-xl pt-0" : "",
			)}
		>
			{props.web ? (
				<div className="py-5 px-6 flex w-full border-b border-b-mine-shaft-2">
					<div
						className="w-fit h-fit cursor-pointer"
						onClick={() => props.onAction(false)}
					>
						<BackArrowIcon />
					</div>
				</div>
			) : (
				<div
					className={
						"w-fit h-fit cursor-pointer " +
						(full ? "" : !props.fillValues.makeModalFull ? "" : "rotate-180")
					}
					onClick={() => {
						if (props.fillValues.makeModalFull) {
							setFull(!full);
						}

						if (!props.fillValues.makeModalFull) {
							props.onAction(false);
						}
					}}
				>
					<HandleIcon />
				</div>
			)}

			<div className="w-full flex flex-col items-start justify-start px-5 pt-2 pb-4 gap-y-1">
				<label className="font-bold tracking--0.5 leading-34 font-inter text-25 text-blackDark">
					{props.fillValues.title}
				</label>
				<label className="font-normal text-sm text-sunset-orange-2">
					{props?.fillValues?.description}
				</label>
				{props?.descriptionComponent && props?.descriptionComponent}
			</div>
			<div className="flex gap-x-4 w-full px-5">
				<SecondaryButton
					buttonText={props.cancelButtonText ? props.cancelButtonText : "No"}
					onClick={() => {
						props.onAction(false);
					}}
				/>
				<SecondaryButton
					className={props.approveButtonClasses}
					buttonText={props.approveButtonText ? props.approveButtonText : "Yes"}
					onClick={() => {
						props.onAction(true);
					}}
				/>
			</div>
		</div>
	);
});

const showDeleteConfirmationModal = async ({
	title,
	description,
	descriptionComponent,
	makeModalFull,
	callbackYes,
	callbackNo,
	cancelButtonText,
	approveButtonText,
	approveButtonClasses,
	web = false,
}: DeleteModalInterface) => {
	let classes = "absolute bottom-0";
	if (web) {
		classes = "w-[505px] h-fit";
	}
	const result = await HeadlessModal({
		component: Modal,
		backdropClasses: "bg-black bg-opacity-50 z-[999]",
		fillValues: {
			title: title,
			description: description,
			makeModalFull: makeModalFull,
		},
		modalWrapperClasses: classes,
		web: web,
		descriptionComponent: descriptionComponent,
		cancelButtonText: cancelButtonText,
		approveButtonText: approveButtonText,
		approveButtonClasses: approveButtonClasses,
		animations: {
			modal: {
				initial: { opacity: 0, y: 400 },
				animate: { opacity: 1, y: 0 },
				exit: { opacity: 0, y: 400 },
				transition: { ease: "easeIn" },
			},
		},
	});
	if (result && callbackYes) {
		callbackYes();
	} else {
		callbackNo && callbackNo();
	}
	return result;
};

export default showDeleteConfirmationModal;
