import React, { useState } from "react";
import { HeadlessModal } from "@locoworks/reusejs-react-modal";
import { HandleIcon } from "icons";
import { twMerge } from "tailwind-merge";
// import { SecondaryButton } from "../../..";
import { SecondaryButton } from "../..";

interface UnlinkModalInterface {
	title: string;
	description: string;
	callbackYes?: () => void;
	callbackNo?: () => void;
	makeModalFull?: boolean;
	web?: boolean;
}

const Modal = React.forwardRef((props: any, ref: any) => {
	// const [full, setFull] = useState(false);
	const web = props?.web || false;
	return (
		<div
			ref={ref}
			className={twMerge(
				"bottom-0 bg-white flex flex-col items-center pt-3 pb-6 gap-y-3 transition-all h-fit",
				web ? "rounded-xl w-full" : "rounded-t-xl w-screen",
			)}
		>
			{!web && (
				<div
					className={"w-fit h-fit cursor-pointer "}
					onClick={() => {
						props.onAction(false);
					}}
				>
					<HandleIcon />
				</div>
			)}
			<div className="w-full flex flex-col items-start justify-start px-5 pt-3 pb-5 gap-y-1">
				<label className="font-bold tracking--0.5 leading-34 font-inter text-25 text-blackDark">
					{props.fillValues.title}
				</label>
				<label className="font-normal text-sm text-sunset-orange-2">
					{props.fillValues.description}
				</label>
			</div>
			<div className="flex gap-x-4 w-full px-5">
				<SecondaryButton
					buttonText={<>No</>}
					onClick={() => {
						props.onAction(false);
					}}
				/>
				<SecondaryButton
					buttonText={<>Yes</>}
					onClick={() => {
						props.onAction(true);
					}}
				/>
			</div>
		</div>
	);
});

const showUnlinkModal = async ({
	title,
	description,
	makeModalFull,
	callbackYes,
	callbackNo,
	web = false,
}: UnlinkModalInterface) => {
	let classes = "absolute bottom-0 w-full modalWrapperclasses";
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

export default showUnlinkModal;
