import React from "react";
import { HeadlessModal } from "@locoworks/reusejs-react-modal";
import { HandleIcon, CrossIcon } from "icons";
import { PrimaryButton, SecondaryButton } from "../../..";
import { twMerge } from "tailwind-merge";

interface ShowLinkModalInterface {
	callbackLink?: () => void;
	callbackCreate?: () => void;
	web?: boolean;
}

const Modal = React.forwardRef((props: any, ref: any) => {
	return (
		<div
			ref={ref}
			className={twMerge(
				"w-screen bottom-0 bg-white rounded-t-xl flex flex-col items-center pt-3 pb-6 gap-y-3  h-fit",
				props.web ? "w-full rounded-xl" : "",
			)}
		>
			{props.web ? (
				<div className="pt-5 px-6 flex w-full border-b-mine-shaft-2">
					<div
						className="w-fit h-fit cursor-pointer scale-150"
						onClick={() => props.onAction(false)}
					>
						<CrossIcon />
					</div>
				</div>
			) : (
				<div
					className={"w-fit h-fit cursor-pointer "}
					onClick={() => {
						props.onAction(false);
					}}
				>
					<HandleIcon />
				</div>
			)}
			<div className="w-full flex flex-col items-start justify-start px-5 gap-y-1">
				<label className="font-bold tracking--0.5 leading-34 font-inter text-25 text-blackDark">
					{"Link hedge"}
				</label>
			</div>
			<div className="flex flex-col gap-y-4 w-full px-5">
				<PrimaryButton
					buttonText={"Select from existing hedges"}
					onClick={() => {
						props.onAction("link");
					}}
				/>
				<SecondaryButton
					buttonText={"+ Create new hedge"}
					onClick={() => {
						props.onAction("create");
					}}
				/>
			</div>
		</div>
	);
});

const showLinkModal = async ({
	callbackLink,
	callbackCreate,
	web = false,
}: ShowLinkModalInterface) => {
	let classes = "absolute bottom-0";
	if (web) {
		classes = "w-[505px] h-fit";
	}

	const result = await HeadlessModal({
		component: Modal,
		backdropClasses: "bg-black bg-opacity-50 z-[999]",
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
	if (result) {
		if (result === "create" && callbackCreate) {
			callbackCreate();
		} else if (result === "link" && callbackLink) {
			callbackLink();
		}
	}
};

export default showLinkModal;
