import React from "react";
import { HeadlessModal } from "@locoworks/reusejs-react-modal";
import { CrossIcon, HandleIcon } from "icons";
import { PrimaryButton, SecondaryButton } from "../../..";
import { twMerge } from "tailwind-merge";

interface DeleteModalInterface {
	title: string;
	description: string;
	callbackYes?: () => void;
	callbackNo?: () => void;
	makeModalFull?: boolean;
	web?: boolean;
}

const Modal = React.forwardRef((props: any, ref: any) => {
	return (
		<div
			ref={ref}
			className={twMerge(
				"w-screen bottom-0 bg-white rounded-t-xl flex flex-col items-center pt-3 pb-6 gap-y-3 transition-all max-h-[90vh] h-fit ",
				props.web ? "w-full rounded-xl" : "",
			)}
		>
			{props.web ? (
				<div
					className="cursor-pointer w-fit h-fit ml-6 mt-2 "
					style={{ alignSelf: "normal" }}
					onClick={() => {
						props.onAction(false);
					}}
				>
					<CrossIcon className="scale-150" />
				</div>
			) : (
				<div
					className={"w-fit h-fit cursor-pointer "}
					onClick={() => {
						if (!props.fillValues.makeModalFull) {
							props.onAction(false);
						}
					}}
				>
					<HandleIcon />
				</div>
			)}
			<div className="w-full flex flex-col items-start justify-start px-5 pt-1 gap-y-1">
				<label className="font-bold -tracking-[0.5px] leading-[34px] font-inter text-25 text-blackDark">
					{props.fillValues.title}
				</label>
				<label className="font-inter text-sm font-normal leading-[22px] text-color-black-6">
					{props.fillValues.description}
				</label>
			</div>
			<div className="flex flex-col gap-y-4 w-full px-5">
				<PrimaryButton
					buttonText={"Yes, leave"}
					onClick={() => {
						props.onAction(true);
					}}
				/>
				<SecondaryButton
					buttonText={"Continue editing"}
					onClick={() => {
						props.onAction(false);
					}}
				/>
			</div>
		</div>
	);
});

const showBackConfirmationModal = async ({
	title,
	description,
	makeModalFull,
	callbackYes,
	callbackNo,
	web = false,
}: DeleteModalInterface) => {
	let wrapperClasses = "absolute bottom-0";
	if (web) {
		wrapperClasses = "w-[505px] h-fit";
	}
	const result = await HeadlessModal({
		component: Modal,
		backdropClasses: "bg-black bg-opacity-50",
		fillValues: {
			title: title,
			description: description,
			makeModalFull: makeModalFull,
		},
		modalWrapperClasses: wrapperClasses,
		web: web,
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
};

export default showBackConfirmationModal;
